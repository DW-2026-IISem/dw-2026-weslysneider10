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
exports.ReturnsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_positive_int_pipe_1 = require("../../../../../../common/pipes/parse-positive-int.pipe");
const create_return_dto_1 = require("../../../application/dto/create-return.dto");
const return_filter_dto_1 = require("../../../application/dto/return-filter.dto");
const return_response_dto_1 = require("../../../application/dto/return-response.dto");
const create_return_use_case_1 = require("../../../application/use-cases/create-return.use-case");
const cancel_return_use_case_1 = require("../../../application/use-cases/cancel-return.use-case");
const get_return_use_case_1 = require("../../../application/use-cases/get-return.use-case");
const list_returns_use_case_1 = require("../../../application/use-cases/list-returns.use-case");
const list_returns_by_sale_use_case_1 = require("../../../application/use-cases/list-returns-by-sale.use-case");
let ReturnsController = class ReturnsController {
    createReturnUseCase;
    cancelReturnUseCase;
    getReturnUseCase;
    listReturnsUseCase;
    listReturnsBySaleUseCase;
    constructor(createReturnUseCase, cancelReturnUseCase, getReturnUseCase, listReturnsUseCase, listReturnsBySaleUseCase) {
        this.createReturnUseCase = createReturnUseCase;
        this.cancelReturnUseCase = cancelReturnUseCase;
        this.getReturnUseCase = getReturnUseCase;
        this.listReturnsUseCase = listReturnsUseCase;
        this.listReturnsBySaleUseCase = listReturnsBySaleUseCase;
    }
    create(dto) {
        return this.createReturnUseCase.execute(dto);
    }
    findAll(filter) {
        return this.listReturnsUseCase.execute(filter);
    }
    findBySale(saleId) {
        return this.listReturnsBySaleUseCase.execute(saleId);
    }
    findOne(id) {
        return this.getReturnUseCase.execute(id);
    }
    cancel(id) {
        return this.cancelReturnUseCase.execute(id);
    }
};
exports.ReturnsController = ReturnsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar una devolución' }),
    (0, swagger_1.ApiCreatedResponse)({ type: return_response_dto_1.ReturnResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_return_dto_1.CreateReturnDto]),
    __metadata("design:returntype", void 0)
], ReturnsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar devoluciones' }),
    (0, swagger_1.ApiOkResponse)({ type: [return_response_dto_1.ReturnResponseDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [return_filter_dto_1.ReturnFilterDto]),
    __metadata("design:returntype", void 0)
], ReturnsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('sale/:saleId'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar devoluciones de una venta' }),
    (0, swagger_1.ApiOkResponse)({ type: [return_response_dto_1.ReturnResponseDto] }),
    __param(0, (0, common_1.Param)('saleId', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReturnsController.prototype, "findBySale", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una devolución por ID' }),
    (0, swagger_1.ApiOkResponse)({ type: return_response_dto_1.ReturnResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReturnsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancelar una devolución (revierte el stock repuesto)' }),
    (0, swagger_1.ApiOkResponse)({ type: return_response_dto_1.ReturnResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReturnsController.prototype, "cancel", null);
exports.ReturnsController = ReturnsController = __decorate([
    (0, swagger_1.ApiTags)('Returns'),
    (0, common_1.Controller)('api/returns'),
    __metadata("design:paramtypes", [create_return_use_case_1.CreateReturnUseCase,
        cancel_return_use_case_1.CancelReturnUseCase,
        get_return_use_case_1.GetReturnUseCase,
        list_returns_use_case_1.ListReturnsUseCase,
        list_returns_by_sale_use_case_1.ListReturnsBySaleUseCase])
], ReturnsController);
//# sourceMappingURL=returns.controller.js.map