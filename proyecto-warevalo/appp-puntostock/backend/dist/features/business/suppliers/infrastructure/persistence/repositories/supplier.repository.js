"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const pagination_util_1 = require("../../../../../../common/utils/pagination.util");
const supplier_mapper_1 = require("../../../application/mappers/supplier.mapper");
const supplier_model_1 = require("../models/supplier.model");
let SupplierRepository = class SupplierRepository {
    async create(supplier) {
        const model = await supplier_model_1.SupplierModel.create(supplier_mapper_1.SupplierMapper.toPersistence(supplier));
        return supplier_mapper_1.SupplierMapper.toDomain(model);
    }
    async update(supplier) {
        await supplier_model_1.SupplierModel.update(supplier_mapper_1.SupplierMapper.toPersistence(supplier), {
            where: { id: supplier.id },
        });
        const updated = await supplier_model_1.SupplierModel.findByPk(supplier.id);
        return supplier_mapper_1.SupplierMapper.toDomain(updated);
    }
    async delete(id) {
        await supplier_model_1.SupplierModel.destroy({ where: { id } });
    }
    async findById(id) {
        const model = await supplier_model_1.SupplierModel.findByPk(id);
        return model ? supplier_mapper_1.SupplierMapper.toDomain(model) : null;
    }
    async findByNit(nit) {
        const model = await supplier_model_1.SupplierModel.findOne({ where: { nit } });
        return model ? supplier_mapper_1.SupplierMapper.toDomain(model) : null;
    }
    async findAll(params) {
        const { page, limit, offset } = (0, pagination_util_1.normalizePagination)(params.page, params.limit);
        const where = params.search
            ? {
                [sequelize_1.Op.or]: [
                    { businessName: { [sequelize_1.Op.like]: `%${params.search}%` } },
                    { nit: { [sequelize_1.Op.like]: `%${params.search}%` } },
                ],
            }
            : {};
        const { rows, count } = await supplier_model_1.SupplierModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        return (0, pagination_util_1.buildPaginatedResult)(rows.map((row) => supplier_mapper_1.SupplierMapper.toDomain(row)), count, page, limit);
    }
};
exports.SupplierRepository = SupplierRepository;
exports.SupplierRepository = SupplierRepository = __decorate([
    (0, common_1.Injectable)()
], SupplierRepository);
//# sourceMappingURL=supplier.repository.js.map