import { Return } from '../../../domain/entities/return.entity';
import { IReturnRepository, ReturnFindAllParams } from '../../../domain/interfaces/return-repository.interface';
export declare class ReturnRepository implements IReturnRepository {
    create(returnEntity: Return): Promise<Return>;
    update(returnEntity: Return): Promise<Return>;
    findById(id: number): Promise<Return | null>;
    findAll(params: ReturnFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface").PaginatedResult<Return>>;
    findBySaleId(saleId: number): Promise<Return[]>;
    getReturnedQuantityForSaleItem(saleId: number, productId: number): Promise<number>;
}
