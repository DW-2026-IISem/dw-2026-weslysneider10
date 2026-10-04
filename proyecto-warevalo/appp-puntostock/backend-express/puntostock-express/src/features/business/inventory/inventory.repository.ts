import { CreationAttributes, Op, col, where as sequelizeWhere } from "sequelize";
import { Inventory, InventoryI } from "./inventory.model";

/**
 * Capa Repository del feature Inventory.
 * Única responsable de hablar con Sequelize. No conoce reglas de negocio
 * ni `req`/`res`.
 */
export class InventoryRepository {
  /** Todos los registros de inventario, filtrables por sucursal y/o producto. */
  public async findAll(filters: { branchId?: number; productId?: number }): Promise<Inventory[]> {
    const where: Record<string, unknown> = {};
    if (filters.branchId !== undefined) where.branchId = filters.branchId;
    if (filters.productId !== undefined) where.productId = filters.productId;
    return Inventory.findAll({ where });
  }

  /** Un registro de inventario por PK (o `null`). */
  public async findById(id: number): Promise<Inventory | null> {
    return Inventory.findByPk(id);
  }

  /** Busca por la clave compuesta (sucursal + producto). Usado para evitar duplicados. */
  public async findByBranchAndProduct(branchId: number, productId: number): Promise<Inventory | null> {
    return Inventory.findOne({ where: { branchId, productId } });
  }

  /** Inserta un registro de inventario. */
  public async create(data: CreationAttributes<Inventory>): Promise<Inventory> {
    return Inventory.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(inventory: Inventory, data: Partial<InventoryI>): Promise<Inventory> {
    return inventory.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(inventory: Inventory): Promise<void> {
    await inventory.destroy();
  }

  /** Registros con quantity <= minStock, filtrables por sucursal. */
  public async findLowStock(branchId?: number): Promise<Inventory[]> {
    const where: Record<string, unknown> = {
      [Op.and]: [sequelizeWhere(col("quantity"), Op.lte, col("minStock"))],
    };
    if (branchId !== undefined) where.branchId = branchId;

    return Inventory.findAll({ where, order: [["quantity", "ASC"]] });
  }
}
