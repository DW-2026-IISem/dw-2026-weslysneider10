import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface';
import { Return } from '../entities/return.entity';
import { ReturnStatus } from '../enums/return-status.enum';

export const RETURN_REPOSITORY = 'RETURN_REPOSITORY';

export interface ReturnFindAllParams {
  page?: number;
  limit?: number;
  saleId?: number;
  status?: ReturnStatus;
}

export interface IReturnRepository {
  create(returnEntity: Return): Promise<Return>;
  update(returnEntity: Return): Promise<Return>;
  findById(id: number): Promise<Return | null>;
  findAll(params: ReturnFindAllParams): Promise<PaginatedResult<Return>>;
  findBySaleId(saleId: number): Promise<Return[]>;
  getReturnedQuantityForSaleItem(
    saleId: number,
    productId: number,
  ): Promise<number>;
}
