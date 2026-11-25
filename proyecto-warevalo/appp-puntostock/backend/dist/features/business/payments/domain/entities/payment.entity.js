"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const payment_status_enum_1 = require("../enums/payment-status.enum");
class Payment {
    id;
    referenceType;
    referenceId;
    method;
    amount;
    paymentDate;
    status;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.referenceType = props.referenceType;
        this.referenceId = props.referenceId;
        this.method = props.method;
        this.amount = props.amount;
        this.paymentDate = props.paymentDate ?? new Date();
        this.status = props.status ?? payment_status_enum_1.PaymentStatus.CONFIRMED;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (!props.referenceId) {
            throw new Error('La referencia del pago es requerida');
        }
        if (props.amount <= 0) {
            throw new Error('El monto del pago debe ser mayor a cero');
        }
        return new Payment(props);
    }
    static reconstitute(props) {
        return new Payment(props);
    }
    cancel() {
        if (this.status === payment_status_enum_1.PaymentStatus.CANCELLED) {
            throw new Error('El pago ya está cancelado');
        }
        this.status = payment_status_enum_1.PaymentStatus.CANCELLED;
    }
}
exports.Payment = Payment;
//# sourceMappingURL=payment.entity.js.map