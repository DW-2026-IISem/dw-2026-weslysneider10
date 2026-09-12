import { Inject, Injectable } from '@nestjs/common';
import {
  SUPPLIER_REPOSITORY,
  type ISupplierRepository,
} from '../../domain/interfaces/supplier-repository.interface';
import { SupplierFilterDto } from '../dto/supplier-filter.dto';
import { SupplierMapper } from '../mappers/supplier.mapper';

@Injectable()
export class ListSuppliersUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplierRepository: ISupplierRepository,
  ) {}

  async execute(filter: SupplierFilterDto) {
    const result = await this.supplierRepository.findAll(filter);
    return {
      items: result.items.map((s) => SupplierMapper.toResponse(s)),
      meta: result.meta,
    };
  }
}
