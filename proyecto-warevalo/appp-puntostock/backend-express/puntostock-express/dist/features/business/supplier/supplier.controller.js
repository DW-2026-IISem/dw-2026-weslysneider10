"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const supplier_service_1 = require("./supplier.service");
/**
 * Capa Controller del feature Supplier.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 */
class SupplierController extends base_controller_1.BaseController {
    constructor(service = new supplier_service_1.SupplierService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const suppliers = await this.service.getAll();
            res.status(200).json({ suppliers });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const supplier = await this.service.getOne(this.paramId(req));
            res.status(200).json({ supplier });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const supplier = await this.service.create(req.body);
            res.status(201).json({ supplier });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const supplier = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ supplier });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const supplier = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ supplier });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Supplier permanently deleted", id });
        });
    }
    /** Eliminación lógica -> isActive = false. */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const supplier = await this.service.deleteLogical(this.paramId(req));
            res.status(200).json({ message: "Supplier deactivated (logical delete)", supplier });
        });
    }
}
exports.SupplierController = SupplierController;
//# sourceMappingURL=supplier.controller.js.map