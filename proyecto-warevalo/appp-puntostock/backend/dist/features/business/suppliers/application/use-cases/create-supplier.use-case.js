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
exports.CreateSupplierUseCase = void 0;
const common_1 = require("@nestjs/common");
const supplier_entity_1 = require("../../domain/entities/supplier.entity");
const supplier_nit_already_exists_exception_1 = require("../../domain/exceptions/supplier-nit-already-exists.exception");
const supplier_repository_interface_1 = require("../../domain/interfaces/supplier-repository.interface");
const supplier_mapper_1 = require("../mappers/supplier.mapper");
let CreateSupplierUseCase = class CreateSupplierUseCase {
    supplierRepository;
    constructor(supplierRepository) {
        this.supplierRepository = supplierRepository;
    }
    async execute(dto) {
        const existing = await this.supplierRepository.findByNit(dto.nit);
        if (existing) {
            throw new supplier_nit_already_exists_exception_1.SupplierNitAlreadyExistsException(dto.nit);
        }
        const supplier = supplier_entity_1.Supplier.create(dto);
        const created = await this.supplierRepository.create(supplier);
        return supplier_mapper_1.SupplierMapper.toResponse(created);
    }
};
exports.CreateSupplierUseCase = CreateSupplierUseCase;
exports.CreateSupplierUseCase = CreateSupplierUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supplier_repository_interface_1.SUPPLIER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateSupplierUseCase);
//# sourceMappingURL=create-supplier.use-case.js.map