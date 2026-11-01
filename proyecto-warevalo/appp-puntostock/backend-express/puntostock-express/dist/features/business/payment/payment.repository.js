"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const payment_model_1 = require("./payment.model");
/**
 * Capa Repository del feature Payment.
 * Única responsable de hablar con Sequelize. No conoce reglas de negocio
 * ni `req`/`res`.
 */
class PaymentRepository {
    /** Todos los pagos. */
    async findAll() {
        return payment_model_1.Payment.findAll();
    }
    /** Un pago por PK (o `null`). */
    async findById(id) {
        return payment_model_1.Payment.findByPk(id);
    }
    /** Inserta un pago. */
    async create(data) {
        return payment_model_1.Payment.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(payment, data) {
        return payment.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(payment) {
        await payment.destroy();
    }
}
exports.PaymentRepository = PaymentRepository;
//# sourceMappingURL=payment.repository.js.map