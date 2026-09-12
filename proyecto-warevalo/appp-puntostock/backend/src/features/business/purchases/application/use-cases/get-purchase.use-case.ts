import { Inject, Injectable } from '@nestjs/common';
import { PurchaseNotFoundException } from '../../domain/exceptions/purchase-not-found.exception';
import { PURCHASE_REPOSITORY, type IPurchaseRepository } from '../../domain/interfaces/purchase-repository.interface';
import { PurchaseMapper } from '../mappers/purchase.mapper';

@Injectable()
export class GetPurchaseUseCase {
  constructor(
    @Inject(PURCHASE_REPOSITORY)
    private readonly purchaseRepository: IPurchaseRepository,
  ) {}

  async execute(id: number) {
    const purchase = await this.purchaseRepository.findById(id);
    if (!purchase) {
      throw new PurchaseNotFoundException(id);
    }

    return PurchaseMapper.toResponse(purchase);
  }
}
