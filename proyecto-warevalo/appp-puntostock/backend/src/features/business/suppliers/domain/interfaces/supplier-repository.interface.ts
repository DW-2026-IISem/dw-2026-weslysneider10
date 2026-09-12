import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface';
import { Supplier } from '../entities/supplier.entity';

export const SUPPLIER_REPOSITORY = 'SUPPLIER_REPOSITORY';

export interface SupplierFindAllParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ISupplierRepository {
  create(supplier: Supplier): Promise<Supplier>;
  update(supplier: Supplier): Promise<Supplier>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Supplier | null>;
  findByNit(nit: string): Promise<Supplier | null>;
  findAll(params: SupplierFindAllParams): Promise<PaginatedResult<Supplier>>;
}
