import { CreateReturnDto, ReturnResponseDto, toReturnResponse } from "./dto";
import { ReturnRepository } from "./return.repository";
import { Return } from "./return.model";
import { SaleDetail } from "../sale/sale-detail.model";
import { Sale } from "../sale/sale.model";
import { InventoryRepository } from "../inventory/inventory.repository";
import { AppError } from "../../../shared/errors/app-error";
import { withTransaction } from "../../../shared/database/with-transaction";

/**
 * Capa Service del feature Return.
 *
 * Reglas de negocio: validación de que `saleDetailId` exista y su venta no
 * esté cancelada, validación de que la cantidad acumulada devuelta no
 * supere lo vendido en esa línea, aprobación (repone Inventory
 * reutilizando InventoryRepository), rechazo, y borrado físico (bloqueado
 * si ya está `approved`, para no perder la trazabilidad del ajuste a
 * Inventory).
 *
 * No conoce `req`/`res`; `approve` se envuelve en `withTransaction`.
 */
export class ReturnService {
  public constructor(
    private readonly repository: ReturnRepository = new ReturnRepository(),
    private readonly inventoryRepository: InventoryRepository = new InventoryRepository()
  ) {}

  // ================== READ ==================
  public async getAll(filters: { saleDetailId?: number; estado?: string }): Promise<ReturnResponseDto[]> {
    const returns = await this.repository.findAll(filters);
    return returns.map((ret) => toReturnResponse(ret));
  }

  public async getOne(id: number): Promise<ReturnResponseDto> {
    return toReturnResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateReturnDto): Promise<ReturnResponseDto> {
    if (body.cantidad <= 0) {
      throw new AppError(400, "La cantidad a devolver debe ser mayor a 0");
    }

    const saleDetail = await SaleDetail.findByPk(body.saleDetailId);
    if (!saleDetail) {
      throw new AppError(404, "SaleDetail not found");
    }

    const sale = await Sale.findByPk(saleDetail.saleId);
    if (!sale || sale.estado === "cancelled") {
      throw new AppError(400, "No se puede devolver una línea de una venta cancelada o inexistente");
    }

    const previousReturns = await this.repository.findApprovedBySaleDetailId(body.saleDetailId);
    const alreadyReturned = previousReturns.reduce((sum, r) => sum + r.cantidad, 0);

    if (alreadyReturned + body.cantidad > saleDetail.cantidad) {
      throw new AppError(
        400,
        `La cantidad a devolver supera lo vendido en esa línea (vendido: ${saleDetail.cantidad}, ya devuelto: ${alreadyReturned})`
      );
    }

    const total = body.cantidad * Number(saleDetail.valorUnitario);

    const ret = await this.repository.create({
      saleDetailId: body.saleDetailId,
      fecha: new Date(),
      motivo: body.motivo,
      cantidad: body.cantidad,
      total,
      estado: "pending",
    });
    return toReturnResponse(ret);
  }

  // ================== APPROVE / REJECT ==================
  /** Aprueba la devolución y repone el stock en Inventory. */
  public async approve(id: number): Promise<ReturnResponseDto> {
    return withTransaction(async (transaction) => {
      const ret = await this.repository.findById(id, transaction);
      if (!ret) {
        throw new AppError(404, "Return not found");
      }
      if (ret.estado !== "pending") {
        throw new AppError(400, `No se puede aprobar una devolución en estado '${ret.estado}'`);
      }

      const saleDetail = await SaleDetail.findByPk(ret.saleDetailId, { transaction });
      if (!saleDetail) {
        throw new AppError(404, "SaleDetail not found");
      }

      const sale = await Sale.findByPk(saleDetail.saleId, { transaction });
      if (!sale) {
        throw new AppError(404, "Sale not found");
      }

      const inventory = await this.inventoryRepository.findByBranchAndProduct(
        sale.branchId,
        saleDetail.productId
      );

      if (inventory) {
        await this.inventoryRepository.update(inventory, {
          quantity: inventory.quantity + ret.cantidad,
        });
      } else {
        await this.inventoryRepository.create({
          branchId: sale.branchId,
          productId: saleDetail.productId,
          quantity: ret.cantidad,
          minStock: 0,
        });
      }

      await this.repository.update(ret, { estado: "approved" }, transaction);
      return toReturnResponse(ret);
    });
  }

  public async reject(id: number): Promise<ReturnResponseDto> {
    const ret = await this.findOrFail(id);
    if (ret.estado !== "pending") {
      throw new AppError(400, `No se puede rechazar una devolución en estado '${ret.estado}'`);
    }

    await this.repository.update(ret, { estado: "rejected" });
    return toReturnResponse(ret);
  }

  // ================== DELETE ==================
  /** Eliminación física. Bloqueada si ya está `approved` (se perdería la trazabilidad del ajuste a Inventory). */
  public async deletePhysical(id: number): Promise<void> {
    const ret = await this.findOrFail(id);
    if (ret.estado === "approved") {
      throw new AppError(400, "No se puede eliminar una devolución ya aprobada");
    }
    await this.repository.delete(ret);
  }

  // ================== HELPERS ==================
  private async findOrFail(id: number): Promise<Return> {
    const ret = await this.repository.findById(id);
    if (!ret) {
      throw new AppError(404, "Return not found");
    }
    return ret;
  }
}
