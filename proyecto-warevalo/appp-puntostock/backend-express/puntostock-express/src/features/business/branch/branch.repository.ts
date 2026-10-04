import { CreationAttributes } from "sequelize";
import { Branch, BranchI } from "./branch.model";

/**
 * Capa Repository del feature Branch.
 * Única responsable de hablar con Sequelize. No conoce reglas de negocio
 * ni `req`/`res`.
 */
export class BranchRepository {
  /** Todas las sucursales activas. */
  public async findAllActive(): Promise<Branch[]> {
    return Branch.findAll({ where: { status: "active" } });
  }

  /** Una sucursal por PK (o `null`). */
  public async findById(id: number): Promise<Branch | null> {
    return Branch.findByPk(id);
  }

  /** Inserta una sucursal. */
  public async create(data: CreationAttributes<Branch>): Promise<Branch> {
    return Branch.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(branch: Branch, data: Partial<BranchI>): Promise<Branch> {
    return branch.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(branch: Branch): Promise<void> {
    await branch.destroy();
  }
}
