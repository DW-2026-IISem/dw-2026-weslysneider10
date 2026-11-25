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
exports.InventoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_positive_int_pipe_1 = require("../../../../../../common/pipes/parse-positive-int.pipe");
const create_inventory_dto_1 = require("../../../application/dto/create-inventory.dto");
const update_inventory_dto_1 = require("../../../application/dto/update-inventory.dto");
const inventory_filter_dto_1 = require("../../../application/dto/inventory-filter.dto");
const inventory_response_dto_1 = require("../../../application/dto/inventory-response.dto");
const create_inventory_use_case_1 = require("../../../application/use-cases/create-inventory.use-case");
const update_inventory_use_case_1 = require("../../../application/use-cases/update-inventory.use-case");
const delete_inventory_use_case_1 = require("../../../application/use-cases/delete-inventory.use-case");
const get_inventory_use_case_1 = require("../../../application/use-cases/get-inventory.use-case");
const list_inventory_use_case_1 = require("../../../application/use-cases/list-inventory.use-case");
const list_low_stock_use_case_1 = require("../../../application/use-cases/list-low-stock.use-case");
let InventoriesController = class InventoriesController {
    createInventoryUseCase;
    updateInventoryUseCase;
    deleteInventoryUseCase;
    getInventoryUseCase;
    listInventoryUseCase;
    listLowStockUseCase;
    constructor(createInventoryUseCase, updateInventoryUseCase, deleteInventoryUseCase, getInventoryUseCase, listInventoryUseCase, listLowStockUseCase) {
        this.createInventoryUseCase = createInventoryUseCase;
        this.updateInventoryUseCase = updateInventoryUseCase;
        this.deleteInventoryUseCase = deleteInventoryUseCase;
        this.getInventoryUseCase = getInventoryUseCase;
        this.listInventoryUseCase = listInventoryUseCase;
        this.listLowStockUseCase = listLowStockUseCase;
    }
    create(dto) {
        return this.createInventoryUseCase.execute(dto);
    }
    findAll(filter) {
        return this.listInventoryUseCase.execute(filter);
    }
    findLowStock(branchId) {
        return this.listLowStockUseCase.execute(branchId ? Number(branchId) : undefined);
    }
    findOne(id) {
        return this.getInventoryUseCase.execute(id);
    }
    update(id, dto) {
        return this.updateInventoryUseCase.execute(id, dto);
    }
    remove(id) {
        return this.deleteInventoryUseCase.execute(id);
    }
};
exports.InventoriesController = InventoriesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un registro de inventario' }),
    (0, swagger_1.ApiCreatedResponse)({ type: inventory_response_dto_1.InventoryResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inventory_dto_1.CreateInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar inventario (filtro por sucursal/producto)' }),
    (0, swagger_1.ApiOkResponse)({ type: [inventory_response_dto_1.InventoryResponseDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_filter_dto_1.InventoryFilterDto]),
    __metadata("design:returntype", void 0)
], InventoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('low-stock'),
    (0, swagger_1.ApiOperation)({ summary: 'Alertas de reposición (cantidad <= stock mínimo)' }),
    (0, swagger_1.ApiQuery)({ name: 'branchId', required: false, example: 1 }),
    (0, swagger_1.ApiOkResponse)({ type: [inventory_response_dto_1.InventoryResponseDto] }),
    __param(0, (0, common_1.Query)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoriesController.prototype, "findLowStock", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un registro de inventario por ID' }),
    (0, swagger_1.ApiOkResponse)({ type: inventory_response_dto_1.InventoryResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InventoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar cantidad/stock mínimo' }),
    (0, swagger_1.ApiOkResponse)({ type: inventory_response_dto_1.InventoryResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_inventory_dto_1.UpdateInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un registro de inventario' }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InventoriesController.prototype, "remove", null);
exports.InventoriesController = InventoriesController = __decorate([
    (0, swagger_1.ApiTags)('Inventory'),
    (0, common_1.Controller)('inventories'),
    __metadata("design:paramtypes", [create_inventory_use_case_1.CreateInventoryUseCase,
        update_inventory_use_case_1.UpdateInventoryUseCase,
        delete_inventory_use_case_1.DeleteInventoryUseCase,
        get_inventory_use_case_1.GetInventoryUseCase,
        list_inventory_use_case_1.ListInventoryUseCase,
        list_low_stock_use_case_1.ListLowStockUseCase])
], InventoriesController);
//# sourceMappingURL=inventories.controller.js.map