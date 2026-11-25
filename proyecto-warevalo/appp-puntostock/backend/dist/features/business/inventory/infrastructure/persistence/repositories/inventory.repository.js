"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const pagination_util_1 = require("../../../../../../common/utils/pagination.util");
const inventory_mapper_1 = require("../../../application/mappers/inventory.mapper");
const inventory_model_1 = require("../models/inventory.model");
let InventoryRepository = class InventoryRepository {
    async create(inventory) {
        const model = await inventory_model_1.InventoryModel.create(inventory_mapper_1.InventoryMapper.toPersistence(inventory));
        return inventory_mapper_1.InventoryMapper.toDomain(model);
    }
    async update(inventory) {
        await inventory_model_1.InventoryModel.update(inventory_mapper_1.InventoryMapper.toPersistence(inventory), {
            where: { id: inventory.id },
        });
        const updated = await inventory_model_1.InventoryModel.findByPk(inventory.id);
        return inventory_mapper_1.InventoryMapper.toDomain(updated);
    }
    async delete(id) {
        await inventory_model_1.InventoryModel.destroy({ where: { id } });
    }
    async findById(id) {
        const model = await inventory_model_1.InventoryModel.findByPk(id);
        return model ? inventory_mapper_1.InventoryMapper.toDomain(model) : null;
    }
    async findByBranchAndProduct(branchId, productId) {
        const model = await inventory_model_1.InventoryModel.findOne({
            where: { branchId, productId },
        });
        return model ? inventory_mapper_1.InventoryMapper.toDomain(model) : null;
    }
    async findAll(params) {
        const { page, limit, offset } = (0, pagination_util_1.normalizePagination)(params.page, params.limit);
        const where = {};
        if (params.branchId) {
            where.branchId = params.branchId;
        }
        if (params.productId) {
            where.productId = params.productId;
        }
        const { rows, count } = await inventory_model_1.InventoryModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['updatedAt', 'DESC']],
        });
        return (0, pagination_util_1.buildPaginatedResult)(rows.map((row) => inventory_mapper_1.InventoryMapper.toDomain(row)), count, page, limit);
    }
    async findLowStock(params) {
        const where = {
            [sequelize_1.Op.and]: [(0, sequelize_1.where)((0, sequelize_1.col)('quantity'), sequelize_1.Op.lte, (0, sequelize_1.col)('minStock'))],
        };
        if (params.branchId) {
            Object.assign(where, { branchId: params.branchId });
        }
        const rows = await inventory_model_1.InventoryModel.findAll({
            where,
            order: [['quantity', 'ASC']],
        });
        return rows.map((row) => inventory_mapper_1.InventoryMapper.toDomain(row));
    }
};
exports.InventoryRepository = InventoryRepository;
exports.InventoryRepository = InventoryRepository = __decorate([
    (0, common_1.Injectable)()
], InventoryRepository);
//# sourceMappingURL=inventory.repository.js.map