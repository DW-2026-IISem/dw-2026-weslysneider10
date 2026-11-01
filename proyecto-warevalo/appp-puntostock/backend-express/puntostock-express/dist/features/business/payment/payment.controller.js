"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const payment_service_1 = require("./payment.service");
/**
 * Capa Controller del feature Payment.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 */
class PaymentController extends base_controller_1.BaseController {
    constructor(service = new payment_service_1.PaymentService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const payments = await this.service.getAll();
            res.status(200).json({ payments });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const payment = await this.service.getOne(this.paramId(req));
            res.status(200).json({ payment });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const payment = await this.service.create(req.body);
            res.status(201).json({ payment });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const payment = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ payment });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const payment = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ payment });
        });
    }
    // ================== CANCEL ==================
    async cancel(req, res) {
        await this.run(res, async () => {
            const payment = await this.service.cancel(this.paramId(req));
            res.status(200).json({ message: "Payment cancelled", payment });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Payment permanently deleted", id });
        });
    }
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map