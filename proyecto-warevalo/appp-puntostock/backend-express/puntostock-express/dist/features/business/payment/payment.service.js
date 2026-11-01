"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const dto_1 = require("./dto");
const payment_repository_1 = require("./payment.repository");
const sale_model_1 = require("../sale/sale.model");
const app_error_1 = require("../../../shared/errors/app-error");
/**
 * Capa Service del feature Payment.
 *
 * Reglas de negocio: validación de que `saleId` exista, validación de
 * `metodo` y `monto`, y cancelación (borrado lógico -> estado = cancelled).
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve DTOs, nunca instancias del modelo.
 */
class PaymentService {
    constructor(repository = new payment_repository_1.PaymentRepository()) {
        this.repository = repository;
    }
    // ================== READ ==================
    async getAll() {
        const payments = await this.repository.findAll();
        return payments.map((payment) => (0, dto_1.toPaymentResponse)(payment));
    }
    async getOne(id) {
        return (0, dto_1.toPaymentResponse)(await this.findOrFail(id));
    }
    // ================== CREATE ==================
    async create(body) {
        await this.assertSaleExists(body.saleId);
        this.assertValidMetodo(body.metodo);
        this.assertValidMonto(body.monto);
        const payment = await this.repository.create({
            saleId: body.saleId,
            fecha: body.fecha ?? new Date(),
            metodo: body.metodo,
            monto: body.monto,
            estado: "completed",
        });
        return (0, dto_1.toPaymentResponse)(payment);
    }
    // ================== UPDATE ==================
    async updatePut(id, body) {
        const payment = await this.findOrFail(id);
        this.assertValidMetodo(body.metodo);
        this.assertValidMonto(body.monto);
        await this.repository.update(payment, {
            fecha: body.fecha,
            metodo: body.metodo,
            monto: body.monto,
        });
        return (0, dto_1.toPaymentResponse)(payment);
    }
    async updatePatch(id, body) {
        const payment = await this.findOrFail(id);
        if (body.metodo !== undefined)
            this.assertValidMetodo(body.metodo);
        if (body.monto !== undefined)
            this.assertValidMonto(body.monto);
        await this.repository.update(payment, body);
        return (0, dto_1.toPaymentResponse)(payment);
    }
    // ================== CANCEL ==================
    /** Cancelación (borrado lógico) -> estado = cancelled. */
    async cancel(id) {
        const payment = await this.findOrFail(id);
        await this.repository.update(payment, { estado: "cancelled" });
        return (0, dto_1.toPaymentResponse)(payment);
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(id) {
        const payment = await this.findOrFail(id);
        await this.repository.delete(payment);
    }
    // ================== HELPERS ==================
    async findOrFail(id) {
        const payment = await this.repository.findById(id);
        if (!payment) {
            throw new app_error_1.AppError(404, "Payment not found");
        }
        return payment;
    }
    async assertSaleExists(saleId) {
        const sale = await sale_model_1.Sale.findByPk(saleId);
        if (!sale) {
            throw new app_error_1.AppError(404, "Sale not found");
        }
    }
    assertValidMetodo(metodo) {
        if (!metodo || !["cash", "card", "transfer"].includes(metodo)) {
            throw new app_error_1.AppError(400, "Invalid payment method");
        }
    }
    assertValidMonto(monto) {
        if (!monto || Number(monto) <= 0) {
            throw new app_error_1.AppError(400, "Payment amount must be greater than zero");
        }
    }
}
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map