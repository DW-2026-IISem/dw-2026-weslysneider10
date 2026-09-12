import { Inject, Injectable } from '@nestjs/common';
import { SupplierNotFoundException } from '../../domain/exceptions/supplier-not-found.exception';
import {
  SUPPLIER_REPOSITORY,
  type ISupplierRepository,
} from '../../domain/interfaces/supplier-repository.interface';
import { SupplierMapper } from '../mappers/supplier.mapper';

@Injectable()
export class GetSupplierUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplierRepository: ISupplierRepository,
  ) {}

  async execute(id: number) {
    const supplier = await this.supplierRepository.findById(id);
    if (!supplier) {
      throw new SupplierNotFoundException(id);
    }

    return SupplierMapper.toResponse(supplier);
  }
}
