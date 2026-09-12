import { Inject, Injectable } from '@nestjs/common';
import { INVENTORY_REPOSITORY, type IInventoryRepository } from '../../../inventory/domain/interfaces/inventory-repository.interface';
import { Inventory } from '../../../inventory/domain/entities/inventory.entity';
import { PRODUCT_REPOSITORY, type IProductRepository } from '../../../products/domain/interfaces/product-repository.interface';
import { InvalidPurchaseStatusException } from '../../domain/exceptions/invalid-purchase-status.exception';
import { InvalidReceiptQuantityException } from '../../domain/exceptions/invalid-receipt-quantity.exception';
import { PurchaseNotFoundException } from '../../domain/exceptions/purchase-not-found.exception';
import { PurchaseStatus } from '../../domain/entities/purchase.entity';
import { PURCHASE_REPOSITORY, type IPurchaseRepository } from '../../domain/interfaces/purchase-repository.interface';
import { ReceivePurchaseDto } from '../dto/receive-purchase.dto';
import { PurchaseMapper } from '../mappers/purchase.mapper';

@Injectable()
export class ReceivePurchaseUseCase {
  constructor(
    @Inject(PURCHASE_REPOSITORY)
    private readonly purchaseRepository: IPurchaseRepository,
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: IInventoryRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: number, dto: ReceivePurchaseDto) {
    const purchase = await this.purchaseRepository.findById(id);
    if (!purchase) {
      throw new PurchaseNotFoundException(id);
    }

    if (
      purchase.status === PurchaseStatus.RECEIVED ||
      purchase.status === PurchaseStatus.CANCELLED
    ) {
      throw new InvalidPurchaseStatusException(purchase.status, 'recibir');
    }

    for (const receipt of dto.items) {
      const item = purchase.items.find((i) => i.productId === receipt.productId);

      if (item && item.quantityReceived + receipt.quantity > item.quantityOrdered) {
        const product = await this.productRepository.findById(receipt.productId);

        throw new InvalidReceiptQuantityException(
          product?.name ?? `producto ${receipt.productId}`,
          item.quantityOrdered,
          item.quantityReceived + receipt.quantity,
        );
      }
    }

    purchase.receiveItems(dto.items);

    for (const receipt of dto.items) {
      const existingInventory = await this.inventoryRepository.findByBranchAndProduct(
        purchase.branchId,
        receipt.productId,
      );

      if (existingInventory) {
        existingInventory.increaseStock(receipt.quantity);
        await this.inventoryRepository.update(existingInventory);
      } else {
        const newInventory = Inventory.create({
          branchId: purchase.branchId,
          productId: receipt.productId,
          quantity: receipt.quantity,
          minStock: 0,
        });
        await this.inventoryRepository.create(newInventory);
      }
    }

    const updated = await this.purchaseRepository.update(purchase);
    return PurchaseMapper.toResponse(updated);
  }
}
