import { Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';

import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util';

import { Sale } from '../../../domain/entities/sale.entity';

import {
  ISaleRepository,
  SaleFindAllParams,
} from '../../../domain/interfaces/sale-repository.interface';

import { SaleMapper } from '../../../application/mappers/sale.mapper';

import { SaleModel } from '../models/sale.model';
import { ProductSaleModel } from '../models/product-sale.model';

@Injectable()
export class SaleRepository
  implements ISaleRepository
{
  async create(sale: Sale): Promise<Sale> {
    const sequelize = SaleModel.sequelize!;

    const created =
      await sequelize.transaction(
        async (transaction) => {
          const saleModel =
            await SaleModel.create(
              SaleMapper.toPersistence(sale),
              { transaction },
            );

          if (sale.items?.length) {
            await ProductSaleModel.bulkCreate(
              sale.items.map((item) => ({
                saleId: saleModel.id,
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                total: item.total,
              })),
              { transaction },
            );
          }

          return saleModel;
        },
      );

    const result =
      await SaleModel.findByPk(created.id, {
        include: [
          {
            model: ProductSaleModel,
            as: 'items',
          },
        ],
      });

    if (!result) {
      throw new Error(
        `No se pudo recuperar la venta ${created.id}`,
      );
    }

    const itemModels =
      (result.get('items') as ProductSaleModel[]) ??
      [];

    return SaleMapper.toDomain(
      result,
      itemModels,
    );
  }

  async update(sale: Sale): Promise<Sale> {
    await SaleModel.update(
      SaleMapper.toPersistence(sale),
      {
        where: {
          id: sale.id,
        },
      },
    );

    const updated =
      await SaleModel.findByPk(sale.id!, {
        include: [
          {
            model: ProductSaleModel,
            as: 'items',
          },
        ],
      });

    if (!updated) {
      throw new Error(
        `No se pudo recuperar la venta ${sale.id}`,
      );
    }

    const itemModels =
      (updated.get('items') as ProductSaleModel[]) ??
      [];

    return SaleMapper.toDomain(
      updated,
      itemModels,
    );
  }

  async findById(
    id: number,
  ): Promise<Sale | null> {
    const model =
      await SaleModel.findByPk(id, {
        include: [
          {
            model: ProductSaleModel,
            as: 'items',
          },
        ],
      });

    if (!model) {
      return null;
    }

    const itemModels =
      (model.get('items') as ProductSaleModel[]) ??
      [];

    return SaleMapper.toDomain(
      model,
      itemModels,
    );
  }

  async findAll(
    params: SaleFindAllParams,
  ) {
    const {
      page,
      limit,
      offset,
    } = normalizePagination(
      params.page,
      params.limit,
    );

    const where: WhereOptions = {};

    if (params.clientId !== undefined) {
      where.clientId = params.clientId;
    }

    const {
      rows,
      count,
    } = await SaleModel.findAndCountAll({
      where,
      include: [
        {
          model: ProductSaleModel,
          as: 'items',
        },
      ],
      limit,
      offset,
      order: [['id', 'DESC']],
    });

    const sales = rows.map((model) => {
      const itemModels =
        (model.get(
          'items',
        ) as ProductSaleModel[]) ?? [];

      return SaleMapper.toDomain(
        model,
        itemModels,
      );
    });

    return buildPaginatedResult(
      sales,
      count,
      page,
      limit,
    );
  }
}
