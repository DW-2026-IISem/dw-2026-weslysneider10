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
exports.CreateInventoryUseCase = void 0;
const common_1 = require("@nestjs/common");
const branch_not_found_exception_1 = require("../../../branches/domain/exceptions/branch-not-found.exception");
const branch_repository_interface_1 = require("../../../branches/domain/interfaces/branch-repository.interface");
const product_not_found_exception_1 = require("../../../products/domain/exceptions/product-not-found.exception");
const product_repository_interface_1 = require("../../../products/domain/interfaces/product-repository.interface");
const inventory_entity_1 = require("../../domain/entities/inventory.entity");
const inventory_already_exists_exception_1 = require("../../domain/exceptions/inventory-already-exists.exception");
const inventory_repository_interface_1 = require("../../domain/interfaces/inventory-repository.interface");
const inventory_mapper_1 = require("../mappers/inventory.mapper");
let CreateInventoryUseCase = class CreateInventoryUseCase {
    inventoryRepository;
    branchRepository;
    productRepository;
    constructor(inventoryRepository, branchRepository, productRepository) {
        this.inventoryRepository = inventoryRepository;
        this.branchRepository = branchRepository;
        this.productRepository = productRepository;
    }
    async execute(dto) {
        const branch = await this.branchRepository.findById(dto.branchId);
        if (!branch) {
            throw new branch_not_found_exception_1.BranchNotFoundException(dto.branchId);
        }
        const product = await this.productRepository.findById(dto.productId);
        if (!product) {
            throw new product_not_found_exception_1.ProductNotFoundException(dto.productId);
        }
        const existing = await this.inventoryRepository.findByBranchAndProduct(dto.branchId, dto.productId);
        if (existing) {
            throw new inventory_already_exists_exception_1.InventoryAlreadyExistsException(dto.branchId, dto.productId);
        }
        const inventory = inventory_entity_1.Inventory.create(dto);
        const created = await this.inventoryRepository.create(inventory);
        return inventory_mapper_1.InventoryMapper.toResponse(created);
    }
};
exports.CreateInventoryUseCase = CreateInventoryUseCase;
exports.CreateInventoryUseCase = CreateInventoryUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(inventory_repository_interface_1.INVENTORY_REPOSITORY)),
    __param(1, (0, common_1.Inject)(branch_repository_interface_1.BRANCH_REPOSITORY)),
    __param(2, (0, common_1.Inject)(product_repository_interface_1.PRODUCT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateInventoryUseCase);
//# sourceMappingURL=create-inventory.use-case.js.map