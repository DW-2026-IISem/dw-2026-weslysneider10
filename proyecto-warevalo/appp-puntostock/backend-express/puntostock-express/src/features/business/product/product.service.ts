import {
  CreateProductDto,
  PatchProductDto,
  ProductResponseDto,
  UpdateProductDto,
  toProductResponse,
} from "./dto";
import { ProductRepository } from "./product.repository";
import { Product } from "./product.model";
import { ProductType } from "../product-type/product-type.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature Product.
 *
 * Reglas de negocio: default de `status`, política de borrado lógico,
 * borrado físico, validación de `productTypeId` (debe existir y estar
 * `active`) y saneamiento de la respuesta.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve DTOs, nunca instancias del modelo.
 */
export class ProductService {
  public constructor(
    private readonly repository: ProductRepository = new ProductRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<ProductResponseDto[]> {
    const products = await this.repository.findAllActive();
    return products.map((product) => toProductResponse(product));
  }

  public async getOne(id: number): Promise<ProductResponseDto> {
    return toProductResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateProductDto): Promise<ProductResponseDto> {
    await this.assertActiveProductType(body.productTypeId);

    const product = await this.repository.create({
      sku: body.sku,
      name: body.name,
      description: body.description ?? null,
      price: body.price,
      productTypeId: body.productTypeId,
      status: body.status ?? "active",
    });
    return toProductResponse(product);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateProductDto): Promise<ProductResponseDto> {
    const product = await this.findOrFail(id);
    await this.assertActiveProductType(body.productTypeId);

    await this.repository.update(product, {
      sku: body.sku,
      name: body.name,
      description: body.description ?? null,
      price: body.price,
      productTypeId: body.productTypeId,
    });
    return toProductResponse(product);
  }

  public async updatePatch(id: number, body: PatchProductDto): Promise<ProductResponseDto> {
    const product = await this.findOrFail(id);

    if (body.productTypeId !== undefined) {
      await this.assertActiveProductType(body.productTypeId);
    }

    await this.repository.update(product, body);
    return toProductResponse(product);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    const product = await this.findOrFail(id, false);
    await this.repository.delete(product);
  }

  /** Eliminación lógica -> status = inactive. */
  public async deleteLogical(id: number): Promise<ProductResponseDto> {
    const product = await this.findOrFail(id);
    await this.repository.update(product, { status: "inactive" });
    return toProductResponse(product);
  }

  // ================== HELPERS ==================
  /**
   * Busca por PK y falla con 404 si no existe.
   *
   * `onlyActive` (por defecto true) aplica la política de borrado lógico:
   * un registro inactive deja de ser visible para la API.
   */
  private async findOrFail(id: number, onlyActive = true): Promise<Product> {
    const product = await this.repository.findById(id);
    if (!product || (onlyActive && product.status !== "active")) {
      throw new AppError(404, "Product not found");
    }
    return product;
  }

  /** Valida que el tipo de producto exista y esté activo. */
  private async assertActiveProductType(productTypeId: number): Promise<void> {
    const productType = await ProductType.findByPk(productTypeId);
    if (!productType) {
      throw new AppError(404, "Product type not found");
    }
    if (productType.status !== "active") {
      throw new AppError(400, "Product type must be active");
    }
  }
}
