"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const pagination_util_1 = require("../../../../../../common/utils/pagination.util");
const product_model_1 = require("../../../../products/infrastructure/persistence/models/product.model");
const return_status_enum_1 = require("../../../domain/enums/return-status.enum");
const return_mapper_1 = require("../../../application/mappers/return.mapper");
const return_model_1 = require("../models/return.model");
const return_detail_model_1 = require("../models/return-detail.model");
let ReturnRepository = class ReturnRepository {
    async create(returnEntity) {
        const sequelize = return_model_1.ReturnModel.sequelize;
        return sequelize.transaction(async (transaction) => {
            const returnModel = await return_model_1.ReturnModel.create(return_mapper_1.ReturnMapper.toPersistence(returnEntity), { transaction });
            const detailModels = await return_detail_model_1.ReturnDetailModel.bulkCreate(returnEntity.lines.map((line) => ({
                returnId: returnModel.id,
                productId: line.productId,
                quantity: line.quantity,
                unitPrice: line.unitPrice,
                total: line.total,
            })), { transaction });
            for (const line of returnEntity.lines) {
                const product = await product_model_1.ProductModel.findByPk(line.productId, { transaction });
                if (product) {
                    await product.update({ quantity: product.quantity + line.quantity }, { transaction });
                }
            }
            return return_mapper_1.ReturnMapper.toDomain(returnModel, detailModels);
        });
    }
    async update(returnEntity) {
        await return_model_1.ReturnModel.update(return_mapper_1.ReturnMapper.toPersistence(returnEntity), {
            where: { id: returnEntity.id },
        });
        const updated = await return_model_1.ReturnModel.findByPk(returnEntity.id, {
            include: [return_detail_model_1.ReturnDetailModel],
        });
        return return_mapper_1.ReturnMapper.toDomain(updated, updated.details);
    }
    async findById(id) {
        const model = await return_model_1.ReturnModel.findByPk(id, {
            include: [return_detail_model_1.ReturnDetailModel],
        });
        if (!model) {
            return null;
        }
        return return_mapper_1.ReturnMapper.toDomain(model, model.details);
    }
    async findAll(params) {
        const { page, limit, offset } = (0, pagination_util_1.normalizePagination)(params.page, params.limit);
        const where = {};
        if (params.saleId) {
            where.saleId = params.saleId;
        }
        if (params.status) {
            where.status = params.status;
        }
        const { rows, count } = await return_model_1.ReturnModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            include: [return_detail_model_1.ReturnDetailModel],
        });
        return (0, pagination_util_1.buildPaginatedResult)(rows.map((row) => return_mapper_1.ReturnMapper.toDomain(row, row.details)), count, page, limit);
    }
    async findBySaleId(saleId) {
        const rows = await return_model_1.ReturnModel.findAll({
            where: { saleId },
            include: [return_detail_model_1.ReturnDetailModel],
            order: [['createdAt', 'DESC']],
        });
        return rows.map((row) => return_mapper_1.ReturnMapper.toDomain(row, row.details));
    }
    async getReturnedQuantityForSaleItem(saleId, productId) {
        const returns = await return_model_1.ReturnModel.findAll({
            where: {
                saleId,
                status: { [sequelize_1.Op.ne]: return_status_enum_1.ReturnStatus.CANCELLED },
            },
            attributes: ['id'],
        });
        const returnIds = returns.map((r) => r.id);
        if (returnIds.length === 0) {
            return 0;
        }
        const total = await return_detail_model_1.ReturnDetailModel.sum('quantity', {
            where: {
                returnId: { [sequelize_1.Op.in]: returnIds },
                productId,
            },
        });
        return total ?? 0;
    }
};
exports.ReturnRepository = ReturnRepository;
exports.ReturnRepository = ReturnRepository = __decorate([
    (0, common_1.Injectable)()
], ReturnRepository);
//# sourceMappingURL=return.repository.js.map