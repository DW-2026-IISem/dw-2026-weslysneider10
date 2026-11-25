"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleRepository = void 0;
const common_1 = require("@nestjs/common");
const pagination_util_1 = require("../../../../../../common/utils/pagination.util");
const sale_mapper_1 = require("../../../application/mappers/sale.mapper");
const sale_model_1 = require("../models/sale.model");
const product_sale_model_1 = require("../models/product-sale.model");
let SaleRepository = class SaleRepository {
    async create(sale) {
        const sequelize = sale_model_1.SaleModel.sequelize;
        const created = await sequelize.transaction(async (transaction) => {
            const saleModel = await sale_model_1.SaleModel.create(sale_mapper_1.SaleMapper.toPersistence(sale), { transaction });
            if (sale.items?.length) {
                await product_sale_model_1.ProductSaleModel.bulkCreate(sale.items.map((item) => ({
                    saleId: saleModel.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    total: item.total,
                })), { transaction });
            }
            return saleModel;
        });
        const result = await sale_model_1.SaleModel.findByPk(created.id, {
            include: [
                {
                    model: product_sale_model_1.ProductSaleModel,
                    as: 'items',
                },
            ],
        });
        if (!result) {
            throw new Error(`No se pudo recuperar la venta ${created.id}`);
        }
        const itemModels = result.get('items') ??
            [];
        return sale_mapper_1.SaleMapper.toDomain(result, itemModels);
    }
    async update(sale) {
        await sale_model_1.SaleModel.update(sale_mapper_1.SaleMapper.toPersistence(sale), {
            where: {
                id: sale.id,
            },
        });
        const updated = await sale_model_1.SaleModel.findByPk(sale.id, {
            include: [
                {
                    model: product_sale_model_1.ProductSaleModel,
                    as: 'items',
                },
            ],
        });
        if (!updated) {
            throw new Error(`No se pudo recuperar la venta ${sale.id}`);
        }
        const itemModels = updated.get('items') ??
            [];
        return sale_mapper_1.SaleMapper.toDomain(updated, itemModels);
    }
    async findById(id) {
        const model = await sale_model_1.SaleModel.findByPk(id, {
            include: [
                {
                    model: product_sale_model_1.ProductSaleModel,
                    as: 'items',
                },
            ],
        });
        if (!model) {
            return null;
        }
        const itemModels = model.get('items') ??
            [];
        return sale_mapper_1.SaleMapper.toDomain(model, itemModels);
    }
    async findAll(params) {
        const { page, limit, offset, } = (0, pagination_util_1.normalizePagination)(params.page, params.limit);
        const where = {};
        if (params.clientId !== undefined) {
            where.clientId = params.clientId;
        }
        const { rows, count, } = await sale_model_1.SaleModel.findAndCountAll({
            where,
            include: [
                {
                    model: product_sale_model_1.ProductSaleModel,
                    as: 'items',
                },
            ],
            limit,
            offset,
            order: [['id', 'DESC']],
        });
        const sales = rows.map((model) => {
            const itemModels = model.get('items') ?? [];
            return sale_mapper_1.SaleMapper.toDomain(model, itemModels);
        });
        return (0, pagination_util_1.buildPaginatedResult)(sales, count, page, limit);
    }
};
exports.SaleRepository = SaleRepository;
exports.SaleRepository = SaleRepository = __decorate([
    (0, common_1.Injectable)()
], SaleRepository);
//# sourceMappingURL=sale.repository.js.map