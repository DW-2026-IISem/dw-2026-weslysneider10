import { type ISupplierRepository } from '../../domain/interfaces/supplier-repository.interface';
export declare class GetSupplierUseCase {
    private readonly supplierRepository;
    constructor(supplierRepository: ISupplierRepository);
    execute(id: number): Promise<import("../dto/supplier-response.dto").SupplierResponseDto>;
}
