import { CreationAttributes } from "sequelize";
import { Product, ProductI } from "./product.model";

/**
 * Capa Repository del feature Product.
 * Única responsable de hablar con Sequelize. No conoce reglas de negocio
 * ni `req`/`res`.
 */
export class ProductRepository {
  /** Todos los productos activos. */
  public async findAllActive(): Promise<Product[]> {
    return Product.findAll({ where: { status: "active" } });
  }

  /** Un producto por PK (o `null`). */
  public async findById(id: number): Promise<Product | null> {
    return Product.findByPk(id);
  }

  /** Inserta un producto. */
  public async create(data: CreationAttributes<Product>): Promise<Product> {
    return Product.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(product: Product, data: Partial<ProductI>): Promise<Product> {
    return product.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(product: Product): Promise<void> {
    await product.destroy();
  }
}
