"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const pagination_util_1 = require("../../../../../../common/utils/pagination.util");
const branch_mapper_1 = require("../../../application/mappers/branch.mapper");
const branch_model_1 = require("../models/branch.model");
let BranchRepository = class BranchRepository {
    async create(branch) {
        const model = await branch_model_1.BranchModel.create(branch_mapper_1.BranchMapper.toPersistence(branch));
        return branch_mapper_1.BranchMapper.toDomain(model);
    }
    async update(branch) {
        await branch_model_1.BranchModel.update(branch_mapper_1.BranchMapper.toPersistence(branch), { where: { id: branch.id } });
        const updated = await branch_model_1.BranchModel.findByPk(branch.id);
        return branch_mapper_1.BranchMapper.toDomain(updated);
    }
    async delete(id) {
        await branch_model_1.BranchModel.destroy({ where: { id } });
    }
    async findById(id) {
        const model = await branch_model_1.BranchModel.findByPk(id);
        return model ? branch_mapper_1.BranchMapper.toDomain(model) : null;
    }
    async findAll(params) {
        const { page, limit, offset } = (0, pagination_util_1.normalizePagination)(params.page, params.limit);
        const where = params.search
            ? {
                [sequelize_1.Op.or]: [
                    { name: { [sequelize_1.Op.like]: `%${params.search}%` } },
                    { description: { [sequelize_1.Op.like]: `%${params.search}%` } },
                ],
            }
            : {};
        const { rows, count } = await branch_model_1.BranchModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        return (0, pagination_util_1.buildPaginatedResult)(rows.map((row) => branch_mapper_1.BranchMapper.toDomain(row)), count, page, limit);
    }
};
exports.BranchRepository = BranchRepository;
exports.BranchRepository = BranchRepository = __decorate([
    (0, common_1.Injectable)()
], BranchRepository);
//# sourceMappingURL=branch.repository.js.map