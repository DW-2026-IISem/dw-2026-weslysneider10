"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRepository = void 0;
const common_1 = require("@nestjs/common");
const pagination_util_1 = require("../../../../../../common/utils/pagination.util");
const purchase_mapper_1 = require("../../../application/mappers/purchase.mapper");
const purchase_model_1 = require("../models/purchase.model");
const purchase_detail_model_1 = require("../models/purchase-detail.model");
let PurchaseRepository = class PurchaseRepository {
    async create(purchase) {
        const sequelize = purchase_model_1.PurchaseModel.sequelize;
        return sequelize.transaction(async (transaction) => {
            const purchaseModel = await purchase_model_1.PurchaseModel.create(purchase_mapper_1.PurchaseMapper.toPersistence(purchase), { transaction });
            const detailModels = await purchase_detail_model_1.PurchaseDetailModel.bulkCreate(purchase.items.map((item) => ({
                purchaseId: purchaseModel.id,
                productId: item.productId,
                quantityOrdered: item.quantityOrdered,
                quantityReceived: item.quantityReceived,
                unitCost: item.unitCost,
                total: item.total,
            })), { transaction });
            return purchase_mapper_1.PurchaseMapper.toDomain(purchaseModel, detailModels);
        });
    }
    async update(purchase) {
        const sequelize = purchase_model_1.PurchaseModel.sequelize;
        return sequelize.transaction(async (transaction) => {
            await purchase_model_1.PurchaseModel.update(purchase_mapper_1.PurchaseMapper.toPersistence(purchase), {
                where: { id: purchase.id },
                transaction,
            });
            for (const item of purchase.items) {
                await purchase_detail_model_1.PurchaseDetailModel.update({ quantityReceived: item.quantityReceived }, {
                    where: { id: item.id, purchaseId: purchase.id },
                    transaction,
                });
            }
            const updated = await purchase_model_1.PurchaseModel.findByPk(purchase.id, {
                include: [purchase_detail_model_1.PurchaseDetailModel],
                transaction,
            });
            return purchase_mapper_1.PurchaseMapper.toDomain(updated, updated.details);
        });
    }
    async findById(id) {
        const model = await purchase_model_1.PurchaseModel.findByPk(id, {
            include: [purchase_detail_model_1.PurchaseDetailModel],
        });
        if (!model) {
            return null;
        }
        return purchase_mapper_1.PurchaseMapper.toDomain(model, model.details);
    }
    async findAll(params) {
        const { page, limit, offset } = (0, pagination_util_1.normalizePagination)(params.page, params.limit);
        const where = {};
        if (params.supplierId) {
            where.supplierId = params.supplierId;
        }
        if (params.branchId) {
            where.branchId = params.branchId;
        }
        if (params.status) {
            where.status = params.status;
        }
        const { rows, count } = await purchase_model_1.PurchaseModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            include: [purchase_detail_model_1.PurchaseDetailModel],
        });
        return (0, pagination_util_1.buildPaginatedResult)(rows.map((row) => purchase_mapper_1.PurchaseMapper.toDomain(row, row.details)), count, page, limit);
    }
};
exports.PurchaseRepository = PurchaseRepository;
exports.PurchaseRepository = PurchaseRepository = __decorate([
    (0, common_1.Injectable)()
], PurchaseRepository);
//# sourceMappingURL=purchase.repository.js.map