import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';

import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util';

import { ProductType } from '../../../domain/entities/product-type.entity';

import {
  IProductTypeRepository,
  ProductTypeFindAllParams,
} from '../../../domain/interfaces/product-type-repository.interface';

import { ProductTypeMapper } from '../../../application/mappers/product-type.mapper';

import { ProductTypeModel } from '../models/product-type.model';

@Injectable()
export class ProductTypeRepository implements IProductTypeRepository {
  async create(productType: ProductType): Promise<ProductType> {
    const model = await ProductTypeModel.create(
      ProductTypeMapper.toPersistence(productType),
    );

    return ProductTypeMapper.toDomain(model);
  }

  async update(productType: ProductType): Promise<ProductType> {
    if (!productType.id) {
      throw new Error(
        'No se puede actualizar un tipo de producto sin ID',
      );
    }

    await ProductTypeModel.update(
      ProductTypeMapper.toPersistence(productType),
      {
        where: {
          id: productType.id,
        },
      },
    );

    const updated = await ProductTypeModel.findByPk(productType.id);

    if (!updated) {
      throw new Error(
        `No se pudo recuperar el tipo de producto ${productType.id}`,
      );
    }

    return ProductTypeMapper.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await ProductTypeModel.destroy({
      where: { id },
    });
  }

  async findById(id: number): Promise<ProductType | null> {
    const model = await ProductTypeModel.findByPk(id);

    if (!model) {
      return null;
    }

    return ProductTypeMapper.toDomain(model);
  }

  async findAll(
    params: ProductTypeFindAllParams,
  ) {
    const { page, limit, offset } = normalizePagination(
      params.page,
      params.limit,
    );

    const search = params.search?.trim();

    const where = search
      ? {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              description: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        }
      : {};

    const result = await ProductTypeModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    const rows: ProductTypeModel[] = result.rows;
    const count = result.count;

    return buildPaginatedResult(
      rows.map((row: ProductTypeModel) =>
        ProductTypeMapper.toDomain(row),
      ),
      count,
      page,
      limit,
    );
  }
}
