import { Injectable } from '@nestjs/common';
import { Op, WhereOptions, col, where as sequelizeWhere } from 'sequelize';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util';
import { Inventory } from '../../../domain/entities/inventory.entity';
import {
  IInventoryRepository,
  InventoryFindAllParams,
  InventoryLowStockParams,
} from '../../../domain/interfaces/inventory-repository.interface';
import { InventoryMapper } from '../../../application/mappers/inventory.mapper';
import { InventoryModel } from '../models/inventory.model';

@Injectable()
export class InventoryRepository implements IInventoryRepository {
  async create(inventory: Inventory): Promise<Inventory> {
    const model = await InventoryModel.create(
      InventoryMapper.toPersistence(inventory),
    );
    return InventoryMapper.toDomain(model);
  }

  async update(inventory: Inventory): Promise<Inventory> {
    await InventoryModel.update(InventoryMapper.toPersistence(inventory), {
      where: { id: inventory.id },
    });
    const updated = await InventoryModel.findByPk(inventory.id!);
    return InventoryMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await InventoryModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<Inventory | null> {
    const model = await InventoryModel.findByPk(id);
    return model ? InventoryMapper.toDomain(model) : null;
  }

  async findByBranchAndProduct(
    branchId: number,
    productId: number,
  ): Promise<Inventory | null> {
    const model = await InventoryModel.findOne({
      where: { branchId, productId },
    });
    return model ? InventoryMapper.toDomain(model) : null;
  }

  async findAll(params: InventoryFindAllParams) {
    const { page, limit, offset } = normalizePagination(
      params.page,
      params.limit,
    );

    const where: WhereOptions = {};

    if (params.branchId) {
      where.branchId = params.branchId;
    }

    if (params.productId) {
      where.productId = params.productId;
    }

    const { rows, count } = await InventoryModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['updatedAt', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row) => InventoryMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }

  async findLowStock(params: InventoryLowStockParams): Promise<Inventory[]> {
    const where: WhereOptions = {
      [Op.and]: [sequelizeWhere(col('quantity'), Op.lte, col('minStock'))],
    };

    if (params.branchId) {
      Object.assign(where, { branchId: params.branchId });
    }

    const rows = await InventoryModel.findAll({
      where,
      order: [['quantity', 'ASC']],
    });

    return rows.map((row) => InventoryMapper.toDomain(row));
  }
}
