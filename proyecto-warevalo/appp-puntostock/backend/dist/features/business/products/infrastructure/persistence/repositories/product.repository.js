"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const pagination_util_1 = require("../../../../../../common/utils/pagination.util");
const product_mapper_1 = require("../../../application/mappers/product.mapper");
const product_model_1 = require("../models/product.model");
let ProductRepository = class ProductRepository {
    async create(product) {
        const model = await product_model_1.ProductModel.create(product_mapper_1.ProductMapper.toPersistence(product));
        return product_mapper_1.ProductMapper.toDomain(model);
    }
    async update(product) {
        await product_model_1.ProductModel.update(product_mapper_1.ProductMapper.toPersistence(product), {
            where: {
                id: product.id,
            },
        });
        const updated = await product_model_1.ProductModel.findByPk(product.id);
        return product_mapper_1.ProductMapper.toDomain(updated);
    }
    async delete(id) {
        await product_model_1.ProductModel.destroy({
            where: { id },
        });
    }
    async findById(id) {
        const model = await product_model_1.ProductModel.findByPk(id);
        return model
            ? product_mapper_1.ProductMapper.toDomain(model)
            : null;
    }
    async findBySku(sku) {
        const model = await product_model_1.ProductModel.findOne({
            where: { sku },
        });
        return model
            ? product_mapper_1.ProductMapper.toDomain(model)
            : null;
    }
    async findAll(params) {
        const { page, limit, offset } = (0, pagination_util_1.normalizePagination)(params.page, params.limit);
        const where = {};
        if (params.search) {
            Object.assign(where, {
                [sequelize_1.Op.or]: [
                    {
                        sku: {
                            [sequelize_1.Op.like]: `%${params.search}%`,
                        },
                    },
                    {
                        name: {
                            [sequelize_1.Op.like]: `%${params.search}%`,
                        },
                    },
                ],
            });
        }
        if (params.sku) {
            where.sku = params.sku;
        }
        if (params.isActive !== undefined) {
            where.isActive = params.isActive;
        }
        const { rows, count } = await product_model_1.ProductModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        return (0, pagination_util_1.buildPaginatedResult)(rows.map((row) => product_mapper_1.ProductMapper.toDomain(row)), count, page, limit);
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)()
], ProductRepository);
//# sourceMappingURL=product.repository.js.map