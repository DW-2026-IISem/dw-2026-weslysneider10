import { CreationAttributes } from "sequelize";
import { Supplier, SupplierI } from "./supplier.model";

/**
 * Capa Repository del feature Supplier.
 * Única responsable de hablar con Sequelize. No conoce reglas de negocio
 * ni `req`/`res`.
 */
export class SupplierRepository {
  /** Todos los proveedores activos. */
  public async findAllActive(): Promise<Supplier[]> {
    return Supplier.findAll({ where: { isActive: true } });
  }

  /** Un proveedor por PK (o `null`). */
  public async findById(id: number): Promise<Supplier | null> {
    return Supplier.findByPk(id);
  }

  /** Inserta un proveedor. */
  public async create(data: CreationAttributes<Supplier>): Promise<Supplier> {
    return Supplier.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(supplier: Supplier, data: Partial<SupplierI>): Promise<Supplier> {
    return supplier.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(supplier: Supplier): Promise<void> {
    await supplier.destroy();
  }
}
