import { Inject, Injectable } from '@nestjs/common';
import { SupplierNitAlreadyExistsException } from '../../domain/exceptions/supplier-nit-already-exists.exception';
import { SupplierNotFoundException } from '../../domain/exceptions/supplier-not-found.exception';
import {
  SUPPLIER_REPOSITORY,
  type ISupplierRepository,
} from '../../domain/interfaces/supplier-repository.interface';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';
import { SupplierMapper } from '../mappers/supplier.mapper';

@Injectable()
export class UpdateSupplierUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplierRepository: ISupplierRepository,
  ) {}

  async execute(id: number, dto: UpdateSupplierDto) {
    const supplier = await this.supplierRepository.findById(id);
    if (!supplier) {
      throw new SupplierNotFoundException(id);
    }

    if (dto.nit && dto.nit !== supplier.nit) {
      const existing = await this.supplierRepository.findByNit(dto.nit);
      if (existing) {
        throw new SupplierNitAlreadyExistsException(dto.nit);
      }
    }

    supplier.update(dto);
    const updated = await this.supplierRepository.update(supplier);
    return SupplierMapper.toResponse(updated);
  }
}
