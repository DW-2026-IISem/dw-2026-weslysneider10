import { CreateSupplierDto } from '../../../application/dto/create-supplier.dto';
import { UpdateSupplierDto } from '../../../application/dto/update-supplier.dto';
import { SupplierFilterDto } from '../../../application/dto/supplier-filter.dto';
import { SupplierResponseDto } from '../../../application/dto/supplier-response.dto';
import { CreateSupplierUseCase } from '../../../application/use-cases/create-supplier.use-case';
import { UpdateSupplierUseCase } from '../../../application/use-cases/update-supplier.use-case';
import { DeleteSupplierUseCase } from '../../../application/use-cases/delete-supplier.use-case';
import { GetSupplierUseCase } from '../../../application/use-cases/get-supplier.use-case';
import { ListSuppliersUseCase } from '../../../application/use-cases/list-suppliers.use-case';
export declare class SuppliersController {
    private readonly createSupplierUseCase;
    private readonly updateSupplierUseCase;
    private readonly deleteSupplierUseCase;
    private readonly getSupplierUseCase;
    private readonly listSuppliersUseCase;
    constructor(createSupplierUseCase: CreateSupplierUseCase, updateSupplierUseCase: UpdateSupplierUseCase, deleteSupplierUseCase: DeleteSupplierUseCase, getSupplierUseCase: GetSupplierUseCase, listSuppliersUseCase: ListSuppliersUseCase);
    create(dto: CreateSupplierDto): Promise<SupplierResponseDto>;
    findAll(filter: SupplierFilterDto): Promise<{
        items: SupplierResponseDto[];
        meta: import("../../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
    findOne(id: number): Promise<SupplierResponseDto>;
    update(id: number, dto: UpdateSupplierDto): Promise<SupplierResponseDto>;
    remove(id: number): Promise<void>;
}
