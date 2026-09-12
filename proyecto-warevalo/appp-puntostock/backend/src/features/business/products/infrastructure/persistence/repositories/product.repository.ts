import { Injectable } from '@nestjs/common';
import { Op, WhereOptions } from 'sequelize';

import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util';

import { Product } from '../../../domain/entities/product.entity';
import {
  IProductRepository,
  ProductFindAllParams,
} from '../../../domain/interfaces/product-repository.interface';

import { ProductMapper } from '../../../application/mappers/product.mapper';
import { ProductModel } from '../models/product.model';

@Injectable()
export class ProductRepository implements IProductRepository {
  async create(product: Product): Promise<Product> {
    const model = await ProductModel.create(
      ProductMapper.toPersistence(product),
    );

    return ProductMapper.toDomain(model);
  }

  async update(product: Product): Promise<Product> {
    await ProductModel.update(
      ProductMapper.toPersistence(product),
      {
        where: {
          id: product.id,
        },
      },
    );

    const updated = await ProductModel.findByPk(product.id!);

    return ProductMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await ProductModel.destroy({
      where: { id },
    });
  }

  async findById(id: number): Promise<Product | null> {
    const model = await ProductModel.findByPk(id);

    return model
      ? ProductMapper.toDomain(model)
      : null;
  }

  async findBySku(sku: string): Promise<Product | null> {
    const model = await ProductModel.findOne({
      where: { sku },
    });

    return model
      ? ProductMapper.toDomain(model)
      : null;
  }

  async findAll(params: ProductFindAllParams) {
    const { page, limit, offset } = normalizePagination(
      params.page,
      params.limit,
    );

    const where: WhereOptions = {};

    if (params.search) {
      Object.assign(where, {
        [Op.or]: [
          {
            sku: {
              [Op.like]: `%${params.search}%`,
            },
          },
          {
            name: {
              [Op.like]: `%${params.search}%`,
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

    const { rows, count } =
      await ProductModel.findAndCountAll({
        where,
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

    return buildPaginatedResult(
      rows.map((row) => ProductMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }
}
