import { Sale } from '../../../domain/entities/sale.entity';
import { ISaleRepository, SaleFindAllParams } from '../../../domain/interfaces/sale-repository.interface';
export declare class SaleRepository implements ISaleRepository {
    create(sale: Sale): Promise<Sale>;
    update(sale: Sale): Promise<Sale>;
    findById(id: number): Promise<Sale | null>;
    findAll(params: SaleFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface").PaginatedResult<Sale>>;
}
