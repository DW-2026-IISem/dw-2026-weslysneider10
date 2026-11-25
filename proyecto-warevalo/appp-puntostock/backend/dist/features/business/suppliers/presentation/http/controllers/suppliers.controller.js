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
exports.SuppliersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_positive_int_pipe_1 = require("../../../../../../common/pipes/parse-positive-int.pipe");
const create_supplier_dto_1 = require("../../../application/dto/create-supplier.dto");
const update_supplier_dto_1 = require("../../../application/dto/update-supplier.dto");
const supplier_filter_dto_1 = require("../../../application/dto/supplier-filter.dto");
const supplier_response_dto_1 = require("../../../application/dto/supplier-response.dto");
const create_supplier_use_case_1 = require("../../../application/use-cases/create-supplier.use-case");
const update_supplier_use_case_1 = require("../../../application/use-cases/update-supplier.use-case");
const delete_supplier_use_case_1 = require("../../../application/use-cases/delete-supplier.use-case");
const get_supplier_use_case_1 = require("../../../application/use-cases/get-supplier.use-case");
const list_suppliers_use_case_1 = require("../../../application/use-cases/list-suppliers.use-case");
let SuppliersController = class SuppliersController {
    createSupplierUseCase;
    updateSupplierUseCase;
    deleteSupplierUseCase;
    getSupplierUseCase;
    listSuppliersUseCase;
    constructor(createSupplierUseCase, updateSupplierUseCase, deleteSupplierUseCase, getSupplierUseCase, listSuppliersUseCase) {
        this.createSupplierUseCase = createSupplierUseCase;
        this.updateSupplierUseCase = updateSupplierUseCase;
        this.deleteSupplierUseCase = deleteSupplierUseCase;
        this.getSupplierUseCase = getSupplierUseCase;
        this.listSuppliersUseCase = listSuppliersUseCase;
    }
    create(dto) {
        return this.createSupplierUseCase.execute(dto);
    }
    findAll(filter) {
        return this.listSuppliersUseCase.execute(filter);
    }
    findOne(id) {
        return this.getSupplierUseCase.execute(id);
    }
    update(id, dto) {
        return this.updateSupplierUseCase.execute(id, dto);
    }
    remove(id) {
        return this.deleteSupplierUseCase.execute(id);
    }
};
exports.SuppliersController = SuppliersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un proveedor' }),
    (0, swagger_1.ApiCreatedResponse)({ type: supplier_response_dto_1.SupplierResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_supplier_dto_1.CreateSupplierDto]),
    __metadata("design:returntype", void 0)
], SuppliersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar proveedores' }),
    (0, swagger_1.ApiOkResponse)({ type: [supplier_response_dto_1.SupplierResponseDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [supplier_filter_dto_1.SupplierFilterDto]),
    __metadata("design:returntype", void 0)
], SuppliersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un proveedor por ID' }),
    (0, swagger_1.ApiOkResponse)({ type: supplier_response_dto_1.SupplierResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SuppliersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un proveedor' }),
    (0, swagger_1.ApiOkResponse)({ type: supplier_response_dto_1.SupplierResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_supplier_dto_1.UpdateSupplierDto]),
    __metadata("design:returntype", void 0)
], SuppliersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un proveedor' }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SuppliersController.prototype, "remove", null);
exports.SuppliersController = SuppliersController = __decorate([
    (0, swagger_1.ApiTags)('Suppliers'),
    (0, common_1.Controller)('suppliers'),
    __metadata("design:paramtypes", [create_supplier_use_case_1.CreateSupplierUseCase,
        update_supplier_use_case_1.UpdateSupplierUseCase,
        delete_supplier_use_case_1.DeleteSupplierUseCase,
        get_supplier_use_case_1.GetSupplierUseCase,
        list_suppliers_use_case_1.ListSuppliersUseCase])
], SuppliersController);
//# sourceMappingURL=suppliers.controller.js.map