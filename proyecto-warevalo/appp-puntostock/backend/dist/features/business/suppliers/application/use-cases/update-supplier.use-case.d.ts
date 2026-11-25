import { type ISupplierRepository } from '../../domain/interfaces/supplier-repository.interface';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';
export declare class UpdateSupplierUseCase {
    private readonly supplierRepository;
    constructor(supplierRepository: ISupplierRepository);
    execute(id: number, dto: UpdateSupplierDto): Promise<import("../dto/supplier-response.dto").SupplierResponseDto>;
}
