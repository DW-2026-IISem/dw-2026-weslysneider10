"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const common_1 = require("@nestjs/common");
const pagination_util_1 = require("../../../../../../common/utils/pagination.util");
const payment_status_enum_1 = require("../../../domain/enums/payment-status.enum");
const payment_mapper_1 = require("../../../application/mappers/payment.mapper");
const payment_model_1 = require("../models/payment.model");
let PaymentRepository = class PaymentRepository {
    async create(payment) {
        const model = await payment_model_1.PaymentModel.create(payment_mapper_1.PaymentMapper.toPersistence(payment));
        return payment_mapper_1.PaymentMapper.toDomain(model);
    }
    async updateStatus(id, status) {
        await payment_model_1.PaymentModel.update({ status }, { where: { id } });
        const updated = await payment_model_1.PaymentModel.findByPk(id);
        return payment_mapper_1.PaymentMapper.toDomain(updated);
    }
    async findById(id) {
        const model = await payment_model_1.PaymentModel.findByPk(id);
        return model ? payment_mapper_1.PaymentMapper.toDomain(model) : null;
    }
    async findAll(params) {
        const { page, limit, offset } = (0, pagination_util_1.normalizePagination)(params.page, params.limit);
        const where = {};
        if (params.referenceType) {
            where.referenceType = params.referenceType;
        }
        if (params.referenceId) {
            where.referenceId = params.referenceId;
        }
        const { rows, count } = await payment_model_1.PaymentModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['paymentDate', 'DESC']],
        });
        return (0, pagination_util_1.buildPaginatedResult)(rows.map((row) => payment_mapper_1.PaymentMapper.toDomain(row)), count, page, limit);
    }
    async findByReference(referenceType, referenceId) {
        const rows = await payment_model_1.PaymentModel.findAll({
            where: { referenceType, referenceId },
            order: [['paymentDate', 'ASC']],
        });
        return rows.map((row) => payment_mapper_1.PaymentMapper.toDomain(row));
    }
    async sumConfirmedByReference(referenceType, referenceId) {
        const result = await payment_model_1.PaymentModel.sum('amount', {
            where: {
                referenceType,
                referenceId,
                status: payment_status_enum_1.PaymentStatus.CONFIRMED,
            },
        });
        return result ?? 0;
    }
};
exports.PaymentRepository = PaymentRepository;
exports.PaymentRepository = PaymentRepository = __decorate([
    (0, common_1.Injectable)()
], PaymentRepository);
//# sourceMappingURL=payment.repository.js.map