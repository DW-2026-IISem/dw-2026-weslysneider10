import {
  CreateInventoryDto,
  InventoryResponseDto,
  PatchInventoryDto,
  UpdateInventoryDto,
  toInventoryResponse,
} from "./dto";
import { InventoryRepository } from "./inventory.repository";
import { Inventory } from "./inventory.model";
import { Branch } from "../branch/branch.model";
import { Product } from "../product/product.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature Inventory.
 *
 * Reglas de negocio: validación de que `branchId`/`productId` existan,
 * unicidad de la clave compuesta (sucursal + producto) y saneamiento
 * de la respuesta.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve DTOs, nunca instancias del modelo.
 *
 * Inventory no tiene `status`/`isActive`: no existe borrado lógico, solo
 * eliminación física.
 */
export class InventoryService {
  public constructor(
    private readonly repository: InventoryRepository = new InventoryRepository()
  ) {}

  // ================== READ ==================
  public async getAll(filters: { branchId?: number; productId?: number }): Promise<InventoryResponseDto[]> {
    const inventories = await this.repository.findAll(filters);
    return inventories.map((inventory) => toInventoryResponse(inventory));
  }

  public async getOne(id: number): Promise<InventoryResponseDto> {
    return toInventoryResponse(await this.findOrFail(id));
  }

  /** Registros con quantity <= minStock, filtrables por sucursal. */
  public async getLowStock(branchId?: number): Promise<InventoryResponseDto[]> {
    const inventories = await this.repository.findLowStock(branchId);
    return inventories.map((inventory) => toInventoryResponse(inventory));
  }

  // ================== CREATE ==================
  public async create(body: CreateInventoryDto): Promise<InventoryResponseDto> {
    await this.assertBranchExists(body.branchId);
    await this.assertProductExists(body.productId);
    await this.assertUniqueBranchProduct(body.branchId, body.productId);

    const inventory = await this.repository.create({
      branchId: body.branchId,
      productId: body.productId,
      quantity: body.quantity ?? 0,
      minStock: body.minStock ?? 0,
    });
    return toInventoryResponse(inventory);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateInventoryDto): Promise<InventoryResponseDto> {
    const inventory = await this.findOrFail(id);
    await this.repository.update(inventory, {
      quantity: body.quantity,
      minStock: body.minStock,
    });
    return toInventoryResponse(inventory);
  }

  public async updatePatch(id: number, body: PatchInventoryDto): Promise<InventoryResponseDto> {
    const inventory = await this.findOrFail(id);
    await this.repository.update(inventory, body);
    return toInventoryResponse(inventory);
  }

  // ================== DELETE ==================
  /** Eliminación física. Inventory no tiene borrado lógico. */
  public async deletePhysical(id: number): Promise<void> {
    const inventory = await this.findOrFail(id);
    await this.repository.delete(inventory);
  }

  // ================== HELPERS ==================
  /** Busca por PK y falla con 404 si no existe. */
  private async findOrFail(id: number): Promise<Inventory> {
    const inventory = await this.repository.findById(id);
    if (!inventory) {
      throw new AppError(404, "Inventory not found");
    }
    return inventory;
  }

  private async assertBranchExists(branchId: number): Promise<void> {
    const branch = await Branch.findByPk(branchId);
    if (!branch) {
      throw new AppError(404, "Branch not found");
    }
  }

  private async assertProductExists(productId: number): Promise<void> {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new AppError(404, "Product not found");
    }
  }

  private async assertUniqueBranchProduct(branchId: number, productId: number): Promise<void> {
    const existing = await this.repository.findByBranchAndProduct(branchId, productId);
    if (existing) {
      throw new AppError(
        409,
        `Ya existe un registro de inventario para la sucursal '${branchId}' y el producto '${productId}'`
      );
    }
  }
}
