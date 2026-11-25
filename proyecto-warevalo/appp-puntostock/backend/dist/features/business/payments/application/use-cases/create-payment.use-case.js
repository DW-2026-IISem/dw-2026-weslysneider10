"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentUseCase = void 0;
const common_1 = require("@nestjs/common");
const payment_entity_1 = require("../../domain/entities/payment.entity");
const payment_reference_type_enum_1 = require("../../domain/enums/payment-reference-type.enum");
const payment_exceeds_balance_exception_1 = require("../../domain/exceptions/payment-exceeds-balance.exception");
const payment_repository_interface_1 = require("../../domain/interfaces/payment-repository.interface");
const sale_repository_interface_1 = require("../../../sales/domain/interfaces/sale-repository.interface");
const payment_mapper_1 = require("../mappers/payment.mapper");
let CreatePaymentUseCase = class CreatePaymentUseCase {
    paymentRepository;
    saleRepository;
    constructor(paymentRepository, saleRepository) {
        this.paymentRepository = paymentRepository;
        this.saleRepository = saleRepository;
    }
    async execute(dto) {
        if (dto.referenceType === payment_reference_type_enum_1.PaymentReferenceType.SALE) {
            const sale = await this.saleRepository.findById(dto.referenceId);
            if (!sale) {
                throw new common_1.NotFoundException(`Venta ${dto.referenceId} no encontrada`);
            }
            const alreadyPaid = await this.paymentRepository.sumConfirmedByReference(payment_reference_type_enum_1.PaymentReferenceType.SALE, dto.referenceId);
            const balance = sale.total - alreadyPaid;
            if (dto.amount > balance) {
                throw new payment_exceeds_balance_exception_1.PaymentExceedsBalanceException(dto.referenceId, balance);
            }
        }
        const payment = payment_entity_1.Payment.create(dto);
        const created = await this.paymentRepository.create(payment);
        return payment_mapper_1.PaymentMapper.toResponse(created);
    }
};
exports.CreatePaymentUseCase = CreatePaymentUseCase;
exports.CreatePaymentUseCase = CreatePaymentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(payment_repository_interface_1.PAYMENT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(sale_repository_interface_1.SALE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], CreatePaymentUseCase);
//# sourceMappingURL=create-payment.use-case.js.map