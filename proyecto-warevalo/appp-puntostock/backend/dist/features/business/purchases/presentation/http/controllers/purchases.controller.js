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
exports.PurchasesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_positive_int_pipe_1 = require("../../../../../../common/pipes/parse-positive-int.pipe");
const create_purchase_dto_1 = require("../../../application/dto/create-purchase.dto");
const purchase_filter_dto_1 = require("../../../application/dto/purchase-filter.dto");
const purchase_response_dto_1 = require("../../../application/dto/purchase-response.dto");
const receive_purchase_dto_1 = require("../../../application/dto/receive-purchase.dto");
const create_purchase_use_case_1 = require("../../../application/use-cases/create-purchase.use-case");
const receive_purchase_use_case_1 = require("../../../application/use-cases/receive-purchase.use-case");
const cancel_purchase_use_case_1 = require("../../../application/use-cases/cancel-purchase.use-case");
const get_purchase_use_case_1 = require("../../../application/use-cases/get-purchase.use-case");
const list_purchases_use_case_1 = require("../../../application/use-cases/list-purchases.use-case");
let PurchasesController = class PurchasesController {
    createPurchaseUseCase;
    receivePurchaseUseCase;
    cancelPurchaseUseCase;
    getPurchaseUseCase;
    listPurchasesUseCase;
    constructor(createPurchaseUseCase, receivePurchaseUseCase, cancelPurchaseUseCase, getPurchaseUseCase, listPurchasesUseCase) {
        this.createPurchaseUseCase = createPurchaseUseCase;
        this.receivePurchaseUseCase = receivePurchaseUseCase;
        this.cancelPurchaseUseCase = cancelPurchaseUseCase;
        this.getPurchaseUseCase = getPurchaseUseCase;
        this.listPurchasesUseCase = listPurchasesUseCase;
    }
    create(dto) {
        return this.createPurchaseUseCase.execute(dto);
    }
    findAll(filter) {
        return this.listPurchasesUseCase.execute(filter);
    }
    findOne(id) {
        return this.getPurchaseUseCase.execute(id);
    }
    receive(id, dto) {
        return this.receivePurchaseUseCase.execute(id, dto);
    }
    cancel(id) {
        return this.cancelPurchaseUseCase.execute(id);
    }
};
exports.PurchasesController = PurchasesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una orden de compra' }),
    (0, swagger_1.ApiCreatedResponse)({ type: purchase_response_dto_1.PurchaseResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_purchase_dto_1.CreatePurchaseDto]),
    __metadata("design:returntype", void 0)
], PurchasesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar compras' }),
    (0, swagger_1.ApiOkResponse)({ type: [purchase_response_dto_1.PurchaseResponseDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [purchase_filter_dto_1.PurchaseFilterDto]),
    __metadata("design:returntype", void 0)
], PurchasesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una compra por ID' }),
    (0, swagger_1.ApiOkResponse)({ type: purchase_response_dto_1.PurchaseResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PurchasesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/receive'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar recepción parcial o total de una compra' }),
    (0, swagger_1.ApiOkResponse)({ type: purchase_response_dto_1.PurchaseResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, receive_purchase_dto_1.ReceivePurchaseDto]),
    __metadata("design:returntype", void 0)
], PurchasesController.prototype, "receive", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancelar una compra' }),
    (0, swagger_1.ApiOkResponse)({ type: purchase_response_dto_1.PurchaseResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PurchasesController.prototype, "cancel", null);
exports.PurchasesController = PurchasesController = __decorate([
    (0, swagger_1.ApiTags)('Purchases'),
    (0, common_1.Controller)('api/purchases'),
    __metadata("design:paramtypes", [create_purchase_use_case_1.CreatePurchaseUseCase,
        receive_purchase_use_case_1.ReceivePurchaseUseCase,
        cancel_purchase_use_case_1.CancelPurchaseUseCase,
        get_purchase_use_case_1.GetPurchaseUseCase,
        list_purchases_use_case_1.ListPurchasesUseCase])
], PurchasesController);
//# sourceMappingURL=purchases.controller.js.map