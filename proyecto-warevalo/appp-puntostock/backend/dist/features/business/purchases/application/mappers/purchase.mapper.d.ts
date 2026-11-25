import { Purchase, PurchaseItem } from '../../domain/entities/purchase.entity';
import { PurchaseDetailResponseDto, PurchaseResponseDto } from '../dto/purchase-response.dto';
import { PurchaseModel } from '../../infrastructure/persistence/models/purchase.model';
import { PurchaseDetailModel } from '../../infrastructure/persistence/models/purchase-detail.model';
export declare class PurchaseMapper {
    static toDomain(purchaseModel: PurchaseModel, detailModels: PurchaseDetailModel[]): Purchase;
    static toResponse(entity: Purchase): PurchaseResponseDto;
    static toItemResponse(item: PurchaseItem): PurchaseDetailResponseDto;
    static toPersistence(entity: Purchase): Partial<PurchaseModel>;
}
