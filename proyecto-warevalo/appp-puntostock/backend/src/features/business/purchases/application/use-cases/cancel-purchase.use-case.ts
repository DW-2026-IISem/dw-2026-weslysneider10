import { Inject, Injectable } from '@nestjs/common';
import { InvalidPurchaseStatusException } from '../../domain/exceptions/invalid-purchase-status.exception';
import { PurchaseNotFoundException } from '../../domain/exceptions/purchase-not-found.exception';
import { PurchaseStatus } from '../../domain/entities/purchase.entity';
import { PURCHASE_REPOSITORY, type IPurchaseRepository } from '../../domain/interfaces/purchase-repository.interface';
import { PurchaseMapper } from '../mappers/purchase.mapper';

@Injectable()
export class CancelPurchaseUseCase {
  constructor(
    @Inject(PURCHASE_REPOSITORY)
    private readonly purchaseRepository: IPurchaseRepository,
  ) {}

  async execute(id: number) {
    const purchase = await this.purchaseRepository.findById(id);
    if (!purchase) {
      throw new PurchaseNotFoundException(id);
    }

    if (purchase.status === PurchaseStatus.RECEIVED) {
      throw new InvalidPurchaseStatusException(purchase.status, 'cancelar');
    }

    purchase.cancel();
    const updated = await this.purchaseRepository.update(purchase);
    return PurchaseMapper.toResponse(updated);
  }
}
