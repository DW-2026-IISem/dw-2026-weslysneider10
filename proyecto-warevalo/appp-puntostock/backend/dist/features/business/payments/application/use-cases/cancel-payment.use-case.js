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
exports.CancelPaymentUseCase = void 0;
const common_1 = require("@nestjs/common");
const payment_status_enum_1 = require("../../domain/enums/payment-status.enum");
const payment_not_found_exception_1 = require("../../domain/exceptions/payment-not-found.exception");
const payment_repository_interface_1 = require("../../domain/interfaces/payment-repository.interface");
const payment_mapper_1 = require("../mappers/payment.mapper");
let CancelPaymentUseCase = class CancelPaymentUseCase {
    paymentRepository;
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    async execute(id) {
        const payment = await this.paymentRepository.findById(id);
        if (!payment) {
            throw new payment_not_found_exception_1.PaymentNotFoundException(id);
        }
        payment.cancel();
        const updated = await this.paymentRepository.updateStatus(id, payment_status_enum_1.PaymentStatus.CANCELLED);
        return payment_mapper_1.PaymentMapper.toResponse(updated);
    }
};
exports.CancelPaymentUseCase = CancelPaymentUseCase;
exports.CancelPaymentUseCase = CancelPaymentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(payment_repository_interface_1.PAYMENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CancelPaymentUseCase);
//# sourceMappingURL=cancel-payment.use-case.js.map