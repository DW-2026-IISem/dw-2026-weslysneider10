"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPayments = seedPayments;
const payment_model_1 = require("../models/payment.model");
const payment_method_enum_1 = require("../../../domain/enums/payment-method.enum");
const payment_reference_type_enum_1 = require("../../../domain/enums/payment-reference-type.enum");
const payment_status_enum_1 = require("../../../domain/enums/payment-status.enum");
const sale_model_1 = require("../../../../sales/infrastructure/persistence/models/sale.model");
async function seedPayments() {
    const count = await payment_model_1.PaymentModel.count();
    if (count > 0) {
        return;
    }
    const sale = await sale_model_1.SaleModel.findOne({ order: [['id', 'ASC']] });
    if (!sale) {
        return;
    }
    await payment_model_1.PaymentModel.create({
        referenceType: payment_reference_type_enum_1.PaymentReferenceType.SALE,
        referenceId: sale.id,
        method: payment_method_enum_1.PaymentMethod.CASH,
        amount: sale.total,
        paymentDate: new Date(),
        status: payment_status_enum_1.PaymentStatus.CONFIRMED,
    });
}
//# sourceMappingURL=payments.seeder.js.map