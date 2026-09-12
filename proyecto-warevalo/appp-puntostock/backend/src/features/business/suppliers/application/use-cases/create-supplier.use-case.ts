import { Inject, Injectable } from '@nestjs/common';
import { Supplier } from '../../domain/entities/supplier.entity';
import { SupplierNitAlreadyExistsException } from '../../domain/exceptions/supplier-nit-already-exists.exception';
import {
  SUPPLIER_REPOSITORY,
  type ISupplierRepository,
} from '../../domain/interfaces/supplier-repository.interface';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { SupplierMapper } from '../mappers/supplier.mapper';

@Injectable()
export class CreateSupplierUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplierRepository: ISupplierRepository,
  ) {}

  async execute(dto: CreateSupplierDto) {
    const existing = await this.supplierRepository.findByNit(dto.nit);
    if (existing) {
      throw new SupplierNitAlreadyExistsException(dto.nit);
    }

    const supplier = Supplier.create(dto);
    const created = await this.supplierRepository.create(supplier);
    return SupplierMapper.toResponse(created);
  }
}
