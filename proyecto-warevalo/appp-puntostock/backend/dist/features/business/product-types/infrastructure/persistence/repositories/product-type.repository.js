"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypeRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const pagination_util_1 = require("../../../../../../common/utils/pagination.util");
const product_type_mapper_1 = require("../../../application/mappers/product-type.mapper");
const product_type_model_1 = require("../models/product-type.model");
let ProductTypeRepository = class ProductTypeRepository {
    async create(productType) {
        const model = await product_type_model_1.ProductTypeModel.create(product_type_mapper_1.ProductTypeMapper.toPersistence(productType));
        return product_type_mapper_1.ProductTypeMapper.toDomain(model);
    }
    async update(productType) {
        if (!productType.id) {
            throw new Error('No se puede actualizar un tipo de producto sin ID');
        }
        await product_type_model_1.ProductTypeModel.update(product_type_mapper_1.ProductTypeMapper.toPersistence(productType), {
            where: {
                id: productType.id,
            },
        });
        const updated = await product_type_model_1.ProductTypeModel.findByPk(productType.id);
        if (!updated) {
            throw new Error(`No se pudo recuperar el tipo de producto ${productType.id}`);
        }
        return product_type_mapper_1.ProductTypeMapper.toDomain(updated);
    }
    async delete(id) {
        await product_type_model_1.ProductTypeModel.destroy({
            where: { id },
        });
    }
    async findById(id) {
        const model = await product_type_model_1.ProductTypeModel.findByPk(id);
        if (!model) {
            return null;
        }
        return product_type_mapper_1.ProductTypeMapper.toDomain(model);
    }
    async findAll(params) {
        const { page, limit, offset } = (0, pagination_util_1.normalizePagination)(params.page, params.limit);
        const search = params.search?.trim();
        const where = search
            ? {
                [sequelize_1.Op.or]: [
                    {
                        name: {
                            [sequelize_1.Op.like]: `%${search}%`,
                        },
                    },
                    {
                        description: {
                            [sequelize_1.Op.like]: `%${search}%`,
                        },
                    },
                ],
            }
            : {};
        const result = await product_type_model_1.ProductTypeModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        const rows = result.rows;
        const count = result.count;
        return (0, pagination_util_1.buildPaginatedResult)(rows.map((row) => product_type_mapper_1.ProductTypeMapper.toDomain(row)), count, page, limit);
    }
};
exports.ProductTypeRepository = ProductTypeRepository;
exports.ProductTypeRepository = ProductTypeRepository = __decorate([
    (0, common_1.Injectable)()
], ProductTypeRepository);
//# sourceMappingURL=product-type.repository.js.map