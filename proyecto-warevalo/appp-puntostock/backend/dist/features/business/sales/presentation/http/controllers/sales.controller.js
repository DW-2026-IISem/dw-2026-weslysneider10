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
exports.SalesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_positive_int_pipe_1 = require("../../../../../../common/pipes/parse-positive-int.pipe");
const create_sale_dto_1 = require("../../../application/dto/create-sale.dto");
const sale_filter_dto_1 = require("../../../application/dto/sale-filter.dto");
const sale_response_dto_1 = require("../../../application/dto/sale-response.dto");
const create_sale_use_case_1 = require("../../../application/use-cases/create-sale.use-case");
const cancel_sale_use_case_1 = require("../../../application/use-cases/cancel-sale.use-case");
const get_sale_use_case_1 = require("../../../application/use-cases/get-sale.use-case");
const list_sales_use_case_1 = require("../../../application/use-cases/list-sales.use-case");
let SalesController = class SalesController {
    createSaleUseCase;
    cancelSaleUseCase;
    getSaleUseCase;
    listSalesUseCase;
    constructor(createSaleUseCase, cancelSaleUseCase, getSaleUseCase, listSalesUseCase) {
        this.createSaleUseCase = createSaleUseCase;
        this.cancelSaleUseCase = cancelSaleUseCase;
        this.getSaleUseCase = getSaleUseCase;
        this.listSalesUseCase = listSalesUseCase;
    }
    create(dto) {
        return this.createSaleUseCase.execute(dto);
    }
    findAll(filter) {
        return this.listSalesUseCase.execute(filter);
    }
    findOne(id) {
        return this.getSaleUseCase.execute(id);
    }
    cancel(id) {
        return this.cancelSaleUseCase.execute(id);
    }
};
exports.SalesController = SalesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una venta' }),
    (0, swagger_1.ApiCreatedResponse)({ type: sale_response_dto_1.SaleResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sale_dto_1.CreateSaleDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar ventas' }),
    (0, swagger_1.ApiOkResponse)({ type: [sale_response_dto_1.SaleResponseDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sale_filter_dto_1.SaleFilterDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una venta por ID' }),
    (0, swagger_1.ApiOkResponse)({ type: sale_response_dto_1.SaleResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancelar una venta' }),
    (0, swagger_1.ApiOkResponse)({ type: sale_response_dto_1.SaleResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "cancel", null);
exports.SalesController = SalesController = __decorate([
    (0, swagger_1.ApiTags)('Sales'),
    (0, common_1.Controller)('api/sales'),
    __metadata("design:paramtypes", [create_sale_use_case_1.CreateSaleUseCase,
        cancel_sale_use_case_1.CancelSaleUseCase,
        get_sale_use_case_1.GetSaleUseCase,
        list_sales_use_case_1.ListSalesUseCase])
], SalesController);
//# sourceMappingURL=sales.controller.js.map