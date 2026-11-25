import { type ISupplierRepository } from '../../domain/interfaces/supplier-repository.interface';
export declare class DeleteSupplierUseCase {
    private readonly supplierRepository;
    constructor(supplierRepository: ISupplierRepository);
    execute(id: number): Promise<void>;
}
