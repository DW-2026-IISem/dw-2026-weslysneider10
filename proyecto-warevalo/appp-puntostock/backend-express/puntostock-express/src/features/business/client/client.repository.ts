import { CreationAttributes } from "sequelize";
import { Client, ClientI } from "./client.model";

/**
 * Capa Repository del feature Client.
 * Única responsable de hablar con Sequelize. No conoce reglas de negocio
 * ni `req`/`res`.
 */
export class ClientRepository {
  /** Todos los clientes activos. */
  public async findAllActive(): Promise<Client[]> {
    return Client.findAll({ where: { status: "active" } });
  }

  /** Un cliente por PK (o `null`). */
  public async findById(id: number): Promise<Client | null> {
    return Client.findByPk(id);
  }

  /** Inserta un cliente. */
  public async create(data: CreationAttributes<Client>): Promise<Client> {
    return Client.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(client: Client, data: Partial<ClientI>): Promise<Client> {
    return client.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(client: Client): Promise<void> {
    await client.destroy();
  }
}
