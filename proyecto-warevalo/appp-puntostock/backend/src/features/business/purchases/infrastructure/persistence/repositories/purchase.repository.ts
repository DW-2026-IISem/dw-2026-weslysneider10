import { Injectable } from '@nestjs/common';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util';
import { Purchase } from '../../../domain/entities/purchase.entity';
import {
  IPurchaseRepository,
  PurchaseFindAllParams,
} from '../../../domain/interfaces/purchase-repository.interface';
import { PurchaseMapper } from '../../../application/mappers/purchase.mapper';
import { PurchaseModel } from '../models/purchase.model';
import { PurchaseDetailModel } from '../models/purchase-detail.model';

@Injectable()
export class PurchaseRepository implements IPurchaseRepository {
  async create(purchase: Purchase): Promise<Purchase> {
    const sequelize = PurchaseModel.sequelize!;

    return sequelize.transaction(async (transaction) => {
      const purchaseModel = await PurchaseModel.create(
        PurchaseMapper.toPersistence(purchase),
        { transaction },
      );

      const detailModels = await PurchaseDetailModel.bulkCreate(
        purchase.items.map((item) => ({
          purchaseId: purchaseModel.id,
          productId: item.productId,
          quantityOrdered: item.quantityOrdered,
          quantityReceived: item.quantityReceived,
          unitCost: item.unitCost,
          total: item.total,
        })),
        { transaction },
      );

      return PurchaseMapper.toDomain(purchaseModel, detailModels);
    });
  }

  async update(purchase: Purchase): Promise<Purchase> {
    const sequelize = PurchaseModel.sequelize!;

    return sequelize.transaction(async (transaction) => {
      await PurchaseModel.update(PurchaseMapper.toPersistence(purchase), {
        where: { id: purchase.id },
        transaction,
      });

      for (const item of purchase.items) {
        await PurchaseDetailModel.update(
          { quantityReceived: item.quantityReceived },
          {
            where: { id: item.id, purchaseId: purchase.id },
            transaction,
          },
        );
      }

      const updated = await PurchaseModel.findByPk(purchase.id!, {
        include: [PurchaseDetailModel],
        transaction,
      });

      return PurchaseMapper.toDomain(
        updated!,
        updated!.details as PurchaseDetailModel[],
      );
    });
  }

  async findById(id: number): Promise<Purchase | null> {
    const model = await PurchaseModel.findByPk(id, {
      include: [PurchaseDetailModel],
    });

    if (!model) {
      return null;
    }

    return PurchaseMapper.toDomain(model, model.details as PurchaseDetailModel[]);
  }

  async findAll(params: PurchaseFindAllParams) {
    const { page, limit, offset } = normalizePagination(params.page, params.limit);

    const where: Record<string, unknown> = {};

    if (params.supplierId) {
      where.supplierId = params.supplierId;
    }

    if (params.branchId) {
      where.branchId = params.branchId;
    }

    if (params.status) {
      where.status = params.status;
    }

    const { rows, count } = await PurchaseModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [PurchaseDetailModel],
    });

    return buildPaginatedResult(
      rows.map((row) =>
        PurchaseMapper.toDomain(row, row.details as PurchaseDetailModel[]),
      ),
      count,
      page,
      limit,
    );
  }
}
