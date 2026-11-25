import { Supplier } from '../../../domain/entities/supplier.entity';
import { ISupplierRepository, SupplierFindAllParams } from '../../../domain/interfaces/supplier-repository.interface';
export declare class SupplierRepository implements ISupplierRepository {
    create(supplier: Supplier): Promise<Supplier>;
    update(supplier: Supplier): Promise<Supplier>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Supplier | null>;
    findByNit(nit: string): Promise<Supplier | null>;
    findAll(params: SupplierFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface").PaginatedResult<Supplier>>;
}
