"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const pagination_util_1 = require("../../../../../../common/utils/pagination.util");
const client_mapper_1 = require("../../../application/mappers/client.mapper");
const client_model_1 = require("../models/client.model");
let ClientRepository = class ClientRepository {
    async create(client) {
        const model = await client_model_1.ClientModel.create(client_mapper_1.ClientMapper.toPersistence(client));
        return client_mapper_1.ClientMapper.toDomain(model);
    }
    async update(client) {
        await client_model_1.ClientModel.update(client_mapper_1.ClientMapper.toPersistence(client), {
            where: { id: client.id },
        });
        const updated = await client_model_1.ClientModel.findByPk(client.id);
        return client_mapper_1.ClientMapper.toDomain(updated);
    }
    async delete(id) {
        await client_model_1.ClientModel.destroy({ where: { id } });
    }
    async findById(id) {
        const model = await client_model_1.ClientModel.findByPk(id);
        return model ? client_mapper_1.ClientMapper.toDomain(model) : null;
    }
    async findByEmail(email) {
        const model = await client_model_1.ClientModel.findOne({ where: { email } });
        return model ? client_mapper_1.ClientMapper.toDomain(model) : null;
    }
    async findAll(params) {
        const { page, limit, offset } = (0, pagination_util_1.normalizePagination)(params.page, params.limit);
        const where = params.search
            ? {
                [sequelize_1.Op.or]: [
                    { name: { [sequelize_1.Op.like]: `%${params.search}%` } },
                    { email: { [sequelize_1.Op.like]: `%${params.search}%` } },
                ],
            }
            : {};
        const { rows, count } = await client_model_1.ClientModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        return (0, pagination_util_1.buildPaginatedResult)(rows.map((row) => client_mapper_1.ClientMapper.toDomain(row)), count, page, limit);
    }
};
exports.ClientRepository = ClientRepository;
exports.ClientRepository = ClientRepository = __decorate([
    (0, common_1.Injectable)()
], ClientRepository);
//# sourceMappingURL=client.repository.js.map