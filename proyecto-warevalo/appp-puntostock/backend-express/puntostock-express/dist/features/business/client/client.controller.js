"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const client_service_1 = require("./client.service");
/**
 * Capa Controller del feature Client.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 */
class ClientController extends base_controller_1.BaseController {
    constructor(service = new client_service_1.ClientService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const clients = await this.service.getAll();
            res.status(200).json({ clients });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const client = await this.service.getOne(this.paramId(req));
            res.status(200).json({ client });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const client = await this.service.create(req.body);
            res.status(201).json({ client });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const client = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ client });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const client = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ client });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Client permanently deleted", id });
        });
    }
    /** Eliminación lógica -> status = inactive. */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const client = await this.service.deleteLogical(this.paramId(req));
            res.status(200).json({ message: "Client deactivated (logical delete)", client });
        });
    }
}
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map