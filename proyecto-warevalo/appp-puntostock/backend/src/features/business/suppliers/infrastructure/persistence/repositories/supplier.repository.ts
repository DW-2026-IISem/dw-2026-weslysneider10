import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util';
import { Supplier } from '../../../domain/entities/supplier.entity';
import {
  ISupplierRepository,
  SupplierFindAllParams,
} from '../../../domain/interfaces/supplier-repository.interface';
import { SupplierMapper } from '../../../application/mappers/supplier.mapper';
import { SupplierModel } from '../models/supplier.model';

@Injectable()
export class SupplierRepository implements ISupplierRepository {
  async create(supplier: Supplier): Promise<Supplier> {
    const model = await SupplierModel.create(
      SupplierMapper.toPersistence(supplier),
    );
    return SupplierMapper.toDomain(model);
  }

  async update(supplier: Supplier): Promise<Supplier> {
    await SupplierModel.update(SupplierMapper.toPersistence(supplier), {
      where: { id: supplier.id },
    });
    const updated = await SupplierModel.findByPk(supplier.id!);
    return SupplierMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await SupplierModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<Supplier | null> {
    const model = await SupplierModel.findByPk(id);
    return model ? SupplierMapper.toDomain(model) : null;
  }

  async findByNit(nit: string): Promise<Supplier | null> {
    const model = await SupplierModel.findOne({ where: { nit } });
    return model ? SupplierMapper.toDomain(model) : null;
  }

  async findAll(params: SupplierFindAllParams) {
    const { page, limit, offset } = normalizePagination(
      params.page,
      params.limit,
    );

    const where = params.search
      ? {
          [Op.or]: [
            { businessName: { [Op.like]: `%${params.search}%` } },
            { nit: { [Op.like]: `%${params.search}%` } },
          ],
        }
      : {};

    const { rows, count } = await SupplierModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row) => SupplierMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }
}
