"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const inventory_service_1 = require("./inventory.service");
/**
 * Capa Controller del feature Inventory.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 */
class InventoryController extends base_controller_1.BaseController {
    constructor(service = new inventory_service_1.InventoryService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(req, res) {
        await this.run(res, async () => {
            const { branchId, productId } = req.query;
            const inventories = await this.service.getAll({
                branchId: branchId ? Number(branchId) : undefined,
                productId: productId ? Number(productId) : undefined,
            });
            res.status(200).json({ inventories });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const inventory = await this.service.getOne(this.paramId(req));
            res.status(200).json({ inventory });
        });
    }
    // ================== LOW STOCK ==================
    async getLowStock(req, res) {
        await this.run(res, async () => {
            const { branchId } = req.query;
            const inventories = await this.service.getLowStock(branchId ? Number(branchId) : undefined);
            res.status(200).json({ inventories });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const inventory = await this.service.create(req.body);
            res.status(201).json({ inventory });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const inventory = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ inventory });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const inventory = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ inventory });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. Inventory no tiene borrado lógico. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Inventory deleted successfully", id });
        });
    }
}
exports.InventoryController = InventoryController;
//# sourceMappingURL=inventory.controller.js.map