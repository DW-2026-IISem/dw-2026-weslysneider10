"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRepository = void 0;
const client_model_1 = require("./client.model");
/**
 * Capa Repository del feature Client.
 * Única responsable de hablar con Sequelize. No conoce reglas de negocio
 * ni `req`/`res`.
 */
class ClientRepository {
    /** Todos los clientes activos. */
    async findAllActive() {
        return client_model_1.Client.findAll({ where: { status: "active" } });
    }
    /** Un cliente por PK (o `null`). */
    async findById(id) {
        return client_model_1.Client.findByPk(id);
    }
    /** Inserta un cliente. */
    async create(data) {
        return client_model_1.Client.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(client, data) {
        return client.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(client) {
        await client.destroy();
    }
}
exports.ClientRepository = ClientRepository;
//# sourceMappingURL=client.repository.js.map