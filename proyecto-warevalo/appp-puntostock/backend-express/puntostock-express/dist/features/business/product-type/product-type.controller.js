"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypeController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const product_type_service_1 = require("./product-type.service");
/**
 * Capa Controller del feature ProductType.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 */
class ProductTypeController extends base_controller_1.BaseController {
    constructor(service = new product_type_service_1.ProductTypeService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const productTypes = await this.service.getAll();
            res.status(200).json({ productTypes });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const productType = await this.service.getOne(this.paramId(req));
            res.status(200).json({ productType });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const productType = await this.service.create(req.body);
            res.status(201).json({ productType });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const productType = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ productType });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const productType = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ productType });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Product type permanently deleted", id });
        });
    }
    /** Eliminación lógica -> status = inactive. */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const productType = await this.service.deleteLogical(this.paramId(req));
            res.status(200).json({ message: "Product type deactivated (logical delete)", productType });
        });
    }
}
exports.ProductTypeController = ProductTypeController;
//# sourceMappingURL=product-type.controller.js.map