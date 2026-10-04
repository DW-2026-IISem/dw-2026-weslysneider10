import {
  CreateProductTypeDto,
  PatchProductTypeDto,
  ProductTypeResponseDto,
  UpdateProductTypeDto,
  toProductTypeResponse,
} from "./dto";
import { ProductTypeRepository } from "./product-type.repository";
import { ProductType } from "./product-type.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature ProductType.
 *
 * Reglas de negocio: default de `status`, política de borrado lógico,
 * borrado físico y saneamiento de la respuesta.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve DTOs, nunca instancias del modelo.
 */
export class ProductTypeService {
  public constructor(
    private readonly repository: ProductTypeRepository = new ProductTypeRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<ProductTypeResponseDto[]> {
    const productTypes = await this.repository.findAllActive();
    return productTypes.map((productType) => toProductTypeResponse(productType));
  }

  public async getOne(id: number): Promise<ProductTypeResponseDto> {
    return toProductTypeResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateProductTypeDto): Promise<ProductTypeResponseDto> {
    const productType = await this.repository.create({
      name: body.name,
      description: body.description ?? null,
      status: body.status ?? "active",
    });
    return toProductTypeResponse(productType);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateProductTypeDto): Promise<ProductTypeResponseDto> {
    const productType = await this.findOrFail(id);
    await this.repository.update(productType, {
      name: body.name,
      description: body.description ?? null,
    });
    return toProductTypeResponse(productType);
  }

  public async updatePatch(id: number, body: PatchProductTypeDto): Promise<ProductTypeResponseDto> {
    const productType = await this.findOrFail(id);
    await this.repository.update(productType, body);
    return toProductTypeResponse(productType);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    const productType = await this.findOrFail(id, false);
    await this.repository.delete(productType);
  }

  /** Eliminación lógica -> status = inactive. */
  public async deleteLogical(id: number): Promise<ProductTypeResponseDto> {
    const productType = await this.findOrFail(id);
    await this.repository.update(productType, { status: "inactive" });
    return toProductTypeResponse(productType);
  }

  // ================== HELPERS ==================
  /**
   * Busca por PK y falla con 404 si no existe.
   *
   * `onlyActive` (por defecto true) aplica la política de borrado lógico:
   * un registro inactive deja de ser visible para la API, igual que en
   * getAll. Así getOne, updatePut, updatePatch y deleteLogical quedan
   * consistentes sin repetir la comprobación en cada método.
   */
  private async findOrFail(id: number, onlyActive = true): Promise<ProductType> {
    const productType = await this.repository.findById(id);
    if (!productType || (onlyActive && productType.status !== "active")) {
      throw new AppError(404, "Product type not found");
    }
    return productType;
  }
}
