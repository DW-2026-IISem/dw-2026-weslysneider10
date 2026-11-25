import { Sale, SaleItem } from '../../domain/entities/sale.entity';
import { SaleItemResponseDto, SaleResponseDto } from '../dto/sale-response.dto';
import { SaleModel } from '../../infrastructure/persistence/models/sale.model';
import { ProductSaleModel } from '../../infrastructure/persistence/models/product-sale.model';
export declare class SaleMapper {
    static toDomain(saleModel: SaleModel, itemModels: ProductSaleModel[]): Sale;
    static toResponse(entity: Sale): SaleResponseDto;
    static toItemResponse(item: SaleItem): SaleItemResponseDto;
    static toPersistence(entity: Sale): Partial<SaleModel>;
}
