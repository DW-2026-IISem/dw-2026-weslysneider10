import { Module } from '@nestjs/common';
import { SUPPLIER_REPOSITORY } from './domain/interfaces/supplier-repository.interface';
import { SupplierRepository } from './infrastructure/persistence/repositories/supplier.repository';
import { CreateSupplierUseCase } from './application/use-cases/create-supplier.use-case';
import { UpdateSupplierUseCase } from './application/use-cases/update-supplier.use-case';
import { DeleteSupplierUseCase } from './application/use-cases/delete-supplier.use-case';
import { GetSupplierUseCase } from './application/use-cases/get-supplier.use-case';
import { ListSuppliersUseCase } from './application/use-cases/list-suppliers.use-case';
import { SuppliersController } from './presentation/http/controllers/suppliers.controller';

@Module({
  controllers: [SuppliersController],
  providers: [
    SupplierRepository,
    { provide: SUPPLIER_REPOSITORY, useExisting: SupplierRepository },
    CreateSupplierUseCase,
    UpdateSupplierUseCase,
    DeleteSupplierUseCase,
    GetSupplierUseCase,
    ListSuppliersUseCase,
  ],
  exports: [SUPPLIER_REPOSITORY],
})
export class SuppliersModule {}
