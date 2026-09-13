import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util';
import { ProductModel } from '../../../../products/infrastructure/persistence/models/product.model';
import { Return } from '../../../domain/entities/return.entity';
import { ReturnStatus } from '../../../domain/enums/return-status.enum';
import {
  IReturnRepository,
  ReturnFindAllParams,
} from '../../../domain/interfaces/return-repository.interface';
import { ReturnMapper } from '../../../application/mappers/return.mapper';
import { ReturnModel } from '../models/return.model';
import { ReturnDetailModel } from '../models/return-detail.model';

@Injectable()
export class ReturnRepository implements IReturnRepository {
  async create(returnEntity: Return): Promise<Return> {
    const sequelize = ReturnModel.sequelize!;

    return sequelize.transaction(async (transaction) => {
      const returnModel = await ReturnModel.create(
        ReturnMapper.toPersistence(returnEntity),
        { transaction },
      );

      const detailModels = await ReturnDetailModel.bulkCreate(
        returnEntity.lines.map((line) => ({
          returnId: returnModel.id,
          productId: line.productId,
          quantity: line.quantity,
          unitPrice: line.unitPrice,
          total: line.total,
        })),
        { transaction },
      );

      for (const line of returnEntity.lines) {
        const product = await ProductModel.findByPk(line.productId, { transaction });
        if (product) {
          await product.update(
            { quantity: product.quantity + line.quantity },
            { transaction },
          );
        }
      }

      return ReturnMapper.toDomain(returnModel, detailModels);
    });
  }

  async update(returnEntity: Return): Promise<Return> {
    await ReturnModel.update(ReturnMapper.toPersistence(returnEntity), {
      where: { id: returnEntity.id },
    });

    const updated = await ReturnModel.findByPk(returnEntity.id!, {
      include: [ReturnDetailModel],
    });

    return ReturnMapper.toDomain(updated!, updated!.details as ReturnDetailModel[]);
  }

  async findById(id: number): Promise<Return | null> {
    const model = await ReturnModel.findByPk(id, {
      include: [ReturnDetailModel],
    });

    if (!model) {
      return null;
    }

    return ReturnMapper.toDomain(model, model.details as ReturnDetailModel[]);
  }

  async findAll(params: ReturnFindAllParams) {
    const { page, limit, offset } = normalizePagination(params.page, params.limit);

    const where: Record<string, unknown> = {};

    if (params.saleId) {
      where.saleId = params.saleId;
    }

    if (params.status) {
      where.status = params.status;
    }

    const { rows, count } = await ReturnModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [ReturnDetailModel],
    });

    return buildPaginatedResult(
      rows.map((row) => ReturnMapper.toDomain(row, row.details as ReturnDetailModel[])),
      count,
      page,
      limit,
    );
  }

  async findBySaleId(saleId: number): Promise<Return[]> {
    const rows = await ReturnModel.findAll({
      where: { saleId },
      include: [ReturnDetailModel],
      order: [['createdAt', 'DESC']],
    });

    return rows.map((row) => ReturnMapper.toDomain(row, row.details as ReturnDetailModel[]));
  }

  async getReturnedQuantityForSaleItem(
    saleId: number,
    productId: number,
  ): Promise<number> {
    const returns = await ReturnModel.findAll({
      where: {
        saleId,
        status: { [Op.ne]: ReturnStatus.CANCELLED },
      },
      attributes: ['id'],
    });

    const returnIds = returns.map((r) => r.id);

    if (returnIds.length === 0) {
      return 0;
    }

    const total = await ReturnDetailModel.sum('quantity', {
      where: {
        returnId: { [Op.in]: returnIds },
        productId,
      },
    });

    return total ?? 0;
  }
}
