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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_positive_int_pipe_1 = require("../../../../../../common/pipes/parse-positive-int.pipe");
const create_payment_dto_1 = require("../../../application/dto/create-payment.dto");
const payment_filter_dto_1 = require("../../../application/dto/payment-filter.dto");
const payment_response_dto_1 = require("../../../application/dto/payment-response.dto");
const create_payment_use_case_1 = require("../../../application/use-cases/create-payment.use-case");
const cancel_payment_use_case_1 = require("../../../application/use-cases/cancel-payment.use-case");
const get_payment_use_case_1 = require("../../../application/use-cases/get-payment.use-case");
const list_payments_use_case_1 = require("../../../application/use-cases/list-payments.use-case");
const list_payments_by_sale_use_case_1 = require("../../../application/use-cases/list-payments-by-sale.use-case");
let PaymentsController = class PaymentsController {
    createPaymentUseCase;
    cancelPaymentUseCase;
    getPaymentUseCase;
    listPaymentsUseCase;
    listPaymentsBySaleUseCase;
    constructor(createPaymentUseCase, cancelPaymentUseCase, getPaymentUseCase, listPaymentsUseCase, listPaymentsBySaleUseCase) {
        this.createPaymentUseCase = createPaymentUseCase;
        this.cancelPaymentUseCase = cancelPaymentUseCase;
        this.getPaymentUseCase = getPaymentUseCase;
        this.listPaymentsUseCase = listPaymentsUseCase;
        this.listPaymentsBySaleUseCase = listPaymentsBySaleUseCase;
    }
    create(dto) {
        return this.createPaymentUseCase.execute(dto);
    }
    findAll(filter) {
        return this.listPaymentsUseCase.execute(filter);
    }
    findBySale(saleId) {
        return this.listPaymentsBySaleUseCase.execute(saleId);
    }
    findOne(id) {
        return this.getPaymentUseCase.execute(id);
    }
    cancel(id) {
        return this.cancelPaymentUseCase.execute(id);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar un pago (soporta pagos mixtos)' }),
    (0, swagger_1.ApiCreatedResponse)({ type: payment_response_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar pagos' }),
    (0, swagger_1.ApiOkResponse)({ type: [payment_response_dto_1.PaymentResponseDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_filter_dto_1.PaymentFilterDto]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('sale/:saleId'),
    (0, swagger_1.ApiOperation)({ summary: 'Desglose de pagos y saldo pendiente de una venta' }),
    __param(0, (0, common_1.Param)('saleId', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "findBySale", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un pago por ID' }),
    (0, swagger_1.ApiOkResponse)({ type: payment_response_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancelar un pago' }),
    (0, swagger_1.ApiOkResponse)({ type: payment_response_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "cancel", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, swagger_1.ApiTags)('Payments'),
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [create_payment_use_case_1.CreatePaymentUseCase,
        cancel_payment_use_case_1.CancelPaymentUseCase,
        get_payment_use_case_1.GetPaymentUseCase,
        list_payments_use_case_1.ListPaymentsUseCase,
        list_payments_by_sale_use_case_1.ListPaymentsBySaleUseCase])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map