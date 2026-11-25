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
exports.ListPaymentsBySaleUseCase = void 0;
const common_1 = require("@nestjs/common");
const payment_reference_type_enum_1 = require("../../domain/enums/payment-reference-type.enum");
const payment_repository_interface_1 = require("../../domain/interfaces/payment-repository.interface");
const sale_repository_interface_1 = require("../../../sales/domain/interfaces/sale-repository.interface");
const payment_mapper_1 = require("../mappers/payment.mapper");
let ListPaymentsBySaleUseCase = class ListPaymentsBySaleUseCase {
    paymentRepository;
    saleRepository;
    constructor(paymentRepository, saleRepository) {
        this.paymentRepository = paymentRepository;
        this.saleRepository = saleRepository;
    }
    async execute(saleId) {
        const sale = await this.saleRepository.findById(saleId);
        if (!sale) {
            throw new common_1.NotFoundException(`Venta ${saleId} no encontrada`);
        }
        const payments = await this.paymentRepository.findByReference(payment_reference_type_enum_1.PaymentReferenceType.SALE, saleId);
        const totalPaid = await this.paymentRepository.sumConfirmedByReference(payment_reference_type_enum_1.PaymentReferenceType.SALE, saleId);
        return {
            saleId,
            saleTotal: sale.total,
            totalPaid,
            balance: sale.total - totalPaid,
            payments: payments.map((p) => payment_mapper_1.PaymentMapper.toResponse(p)),
        };
    }
};
exports.ListPaymentsBySaleUseCase = ListPaymentsBySaleUseCase;
exports.ListPaymentsBySaleUseCase = ListPaymentsBySaleUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(payment_repository_interface_1.PAYMENT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(sale_repository_interface_1.SALE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], ListPaymentsBySaleUseCase);
//# sourceMappingURL=list-payments-by-sale.use-case.js.map