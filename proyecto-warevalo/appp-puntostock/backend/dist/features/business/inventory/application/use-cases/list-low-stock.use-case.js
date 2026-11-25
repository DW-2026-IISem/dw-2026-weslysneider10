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
exports.ListLowStockUseCase = void 0;
const common_1 = require("@nestjs/common");
const inventory_repository_interface_1 = require("../../domain/interfaces/inventory-repository.interface");
const inventory_mapper_1 = require("../mappers/inventory.mapper");
let ListLowStockUseCase = class ListLowStockUseCase {
    inventoryRepository;
    constructor(inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    async execute(branchId) {
        const items = await this.inventoryRepository.findLowStock({ branchId });
        return items.map((inventory) => inventory_mapper_1.InventoryMapper.toResponse(inventory));
    }
};
exports.ListLowStockUseCase = ListLowStockUseCase;
exports.ListLowStockUseCase = ListLowStockUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(inventory_repository_interface_1.INVENTORY_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListLowStockUseCase);
//# sourceMappingURL=list-low-stock.use-case.js.map