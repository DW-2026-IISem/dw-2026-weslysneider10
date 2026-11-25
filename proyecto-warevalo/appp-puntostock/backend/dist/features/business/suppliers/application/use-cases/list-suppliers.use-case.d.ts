import { type ISupplierRepository } from '../../domain/interfaces/supplier-repository.interface';
import { SupplierFilterDto } from '../dto/supplier-filter.dto';
export declare class ListSuppliersUseCase {
    private readonly supplierRepository;
    constructor(supplierRepository: ISupplierRepository);
    execute(filter: SupplierFilterDto): Promise<{
        items: import("../dto/supplier-response.dto").SupplierResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
}
