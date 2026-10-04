import {
  CreateSupplierDto,
  PatchSupplierDto,
  SupplierResponseDto,
  UpdateSupplierDto,
  toSupplierResponse,
} from "./dto";
import { SupplierRepository } from "./supplier.repository";
import { Supplier } from "./supplier.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature Supplier.
 *
 * Reglas de negocio: default de `isActive`, política de borrado lógico,
 * borrado físico y saneamiento de la respuesta.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve DTOs, nunca instancias del modelo.
 */
export class SupplierService {
  public constructor(
    private readonly repository: SupplierRepository = new SupplierRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<SupplierResponseDto[]> {
    const suppliers = await this.repository.findAllActive();
    return suppliers.map((supplier) => toSupplierResponse(supplier));
  }

  public async getOne(id: number): Promise<SupplierResponseDto> {
    return toSupplierResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateSupplierDto): Promise<SupplierResponseDto> {
    const supplier = await this.repository.create({
      nit: body.nit,
      razonSocial: body.razonSocial,
      contacto: body.contacto ?? null,
      telefono: body.telefono ?? null,
      email: body.email ?? null,
      isActive: body.isActive ?? true,
    });
    return toSupplierResponse(supplier);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateSupplierDto): Promise<SupplierResponseDto> {
    const supplier = await this.findOrFail(id);
    await this.repository.update(supplier, {
      nit: body.nit,
      razonSocial: body.razonSocial,
      contacto: body.contacto ?? null,
      telefono: body.telefono ?? null,
      email: body.email ?? null,
    });
    return toSupplierResponse(supplier);
  }

  public async updatePatch(id: number, body: PatchSupplierDto): Promise<SupplierResponseDto> {
    const supplier = await this.findOrFail(id);
    await this.repository.update(supplier, body);
    return toSupplierResponse(supplier);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    const supplier = await this.findOrFail(id, false);
    await this.repository.delete(supplier);
  }

  /** Eliminación lógica -> isActive = false. */
  public async deleteLogical(id: number): Promise<SupplierResponseDto> {
    const supplier = await this.findOrFail(id);
    await this.repository.update(supplier, { isActive: false });
    return toSupplierResponse(supplier);
  }

  // ================== HELPERS ==================
  /**
   * Busca por PK y falla con 404 si no existe.
   *
   * `onlyActive` (por defecto true) aplica la política de borrado lógico:
   * un registro isActive = false deja de ser visible para la API.
   */
  private async findOrFail(id: number, onlyActive = true): Promise<Supplier> {
    const supplier = await this.repository.findById(id);
    if (!supplier || (onlyActive && !supplier.isActive)) {
      throw new AppError(404, "Supplier not found");
    }
    return supplier;
  }
}
