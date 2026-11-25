import { type ISupplierRepository } from '../../domain/interfaces/supplier-repository.interface';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
export declare class CreateSupplierUseCase {
    private readonly supplierRepository;
    constructor(supplierRepository: ISupplierRepository);
    execute(dto: CreateSupplierDto): Promise<import("../dto/supplier-response.dto").SupplierResponseDto>;
}
