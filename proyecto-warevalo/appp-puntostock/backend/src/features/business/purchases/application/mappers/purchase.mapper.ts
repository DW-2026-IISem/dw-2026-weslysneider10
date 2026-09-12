import { Purchase, PurchaseItem, PurchaseStatus } from '../../domain/entities/purchase.entity';
import {
  PurchaseDetailResponseDto,
  PurchaseResponseDto,
} from '../dto/purchase-response.dto';
import { PurchaseModel } from '../../infrastructure/persistence/models/purchase.model';
import { PurchaseDetailModel } from '../../infrastructure/persistence/models/purchase-detail.model';

export class PurchaseMapper {
  static toDomain(
    purchaseModel: PurchaseModel,
    detailModels: PurchaseDetailModel[],
  ): Purchase {
    const items = detailModels.map((detail) =>
      PurchaseItem.reconstitute({
        id: detail.id,
        purchaseId: detail.purchaseId,
        productId: detail.productId,
        quantityOrdered: detail.quantityOrdered,
        quantityReceived: detail.quantityReceived,
        unitCost: Number(detail.unitCost),
        total: Number(detail.total),
      }),
    );

    return Purchase.reconstitute({
      id: purchaseModel.id,
      purchaseDate: purchaseModel.purchaseDate,
      supplierId: purchaseModel.supplierId,
      branchId: purchaseModel.branchId,
      status: purchaseModel.status,
      subtotal: Number(purchaseModel.subtotal),
      tax: Number(purchaseModel.tax),
      total: Number(purchaseModel.total),
      items,
      createdAt: purchaseModel.createdAt,
      updatedAt: purchaseModel.updatedAt,
    });
  }

  static toResponse(entity: Purchase): PurchaseResponseDto {
    return {
      id: entity.id!,
      purchaseDate: entity.purchaseDate,
      supplierId: entity.supplierId,
      branchId: entity.branchId,
      status: entity.status,
      subtotal: entity.subtotal,
      tax: entity.tax,
      total: entity.total,
      items: entity.items.map((item) => PurchaseMapper.toItemResponse(item)),
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toItemResponse(item: PurchaseItem): PurchaseDetailResponseDto {
    return {
      id: item.id!,
      productId: item.productId,
      quantityOrdered: item.quantityOrdered,
      quantityReceived: item.quantityReceived,
      unitCost: item.unitCost,
      total: item.total,
    };
  }

  static toPersistence(entity: Purchase): Partial<PurchaseModel> {
    return {
      id: entity.id,
      purchaseDate: entity.purchaseDate,
      supplierId: entity.supplierId,
      branchId: entity.branchId,
      status: entity.status ?? PurchaseStatus.PENDING,
      subtotal: entity.subtotal,
      tax: entity.tax,
      total: entity.total,
    };
  }
}
