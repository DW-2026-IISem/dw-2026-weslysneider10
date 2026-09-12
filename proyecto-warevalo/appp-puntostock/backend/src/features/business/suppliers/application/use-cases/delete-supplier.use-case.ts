import { Inject, Injectable } from '@nestjs/common';
import { SupplierNotFoundException } from '../../domain/exceptions/supplier-not-found.exception';
import {
  SUPPLIER_REPOSITORY,
  type ISupplierRepository,
} from '../../domain/interfaces/supplier-repository.interface';

@Injectable()
export class DeleteSupplierUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplierRepository: ISupplierRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const supplier = await this.supplierRepository.findById(id);
    if (!supplier) {
      throw new SupplierNotFoundException(id);
    }

    await this.supplierRepository.delete(id);
  }
}
