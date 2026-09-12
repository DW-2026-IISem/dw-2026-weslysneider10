import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util';
import { Branch } from '../../../domain/entities/branch.entity';
import {
  IBranchRepository,
  BranchFindAllParams,
} from '../../../domain/interfaces/branch-repository.interface';
import { BranchMapper } from '../../../application/mappers/branch.mapper';
import { BranchModel } from '../models/branch.model';

@Injectable()
export class BranchRepository implements IBranchRepository {
  async create(branch: Branch): Promise<Branch> {
    const model = await BranchModel.create(
      BranchMapper.toPersistence(branch),
    );
    return BranchMapper.toDomain(model);
  }

  async update(branch: Branch): Promise<Branch> {
    await BranchModel.update(
      BranchMapper.toPersistence(branch),
      { where: { id: branch.id } },
    );
    const updated = await BranchModel.findByPk(branch.id!);
    return BranchMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await BranchModel.destroy({ where: { id } });
  }

  async findById(id: number): Promise<Branch | null> {
    const model = await BranchModel.findByPk(id);
    return model ? BranchMapper.toDomain(model) : null;
  }

  async findAll(params: BranchFindAllParams) {
    const { page, limit, offset } = normalizePagination(
      params.page,
      params.limit,
    );

    const where = params.search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${params.search}%` } },
            { description: { [Op.like]: `%${params.search}%` } },
          ],
        }
      : {};

    const { rows, count } = await BranchModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row) => BranchMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }
}
