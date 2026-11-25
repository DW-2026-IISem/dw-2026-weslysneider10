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
exports.UpdateSupplierUseCase = void 0;
const common_1 = require("@nestjs/common");
const supplier_nit_already_exists_exception_1 = require("../../domain/exceptions/supplier-nit-already-exists.exception");
const supplier_not_found_exception_1 = require("../../domain/exceptions/supplier-not-found.exception");
const supplier_repository_interface_1 = require("../../domain/interfaces/supplier-repository.interface");
const supplier_mapper_1 = require("../mappers/supplier.mapper");
let UpdateSupplierUseCase = class UpdateSupplierUseCase {
    supplierRepository;
    constructor(supplierRepository) {
        this.supplierRepository = supplierRepository;
    }
    async execute(id, dto) {
        const supplier = await this.supplierRepository.findById(id);
        if (!supplier) {
            throw new supplier_not_found_exception_1.SupplierNotFoundException(id);
        }
        if (dto.nit && dto.nit !== supplier.nit) {
            const existing = await this.supplierRepository.findByNit(dto.nit);
            if (existing) {
                throw new supplier_nit_already_exists_exception_1.SupplierNitAlreadyExistsException(dto.nit);
            }
        }
        supplier.update(dto);
        const updated = await this.supplierRepository.update(supplier);
        return supplier_mapper_1.SupplierMapper.toResponse(updated);
    }
};
exports.UpdateSupplierUseCase = UpdateSupplierUseCase;
exports.UpdateSupplierUseCase = UpdateSupplierUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supplier_repository_interface_1.SUPPLIER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateSupplierUseCase);
//# sourceMappingURL=update-supplier.use-case.js.map