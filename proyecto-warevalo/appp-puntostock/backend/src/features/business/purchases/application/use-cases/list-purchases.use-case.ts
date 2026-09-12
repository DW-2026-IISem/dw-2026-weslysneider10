import { Inject, Injectable } from '@nestjs/common';
import { PURCHASE_REPOSITORY, type IPurchaseRepository } from '../../domain/interfaces/purchase-repository.interface';
import { PurchaseFilterDto } from '../dto/purchase-filter.dto';
import { PurchaseMapper } from '../mappers/purchase.mapper';

@Injectable()
export class ListPurchasesUseCase {
  constructor(
    @Inject(PURCHASE_REPOSITORY)
    private readonly purchaseRepository: IPurchaseRepository,
  ) {}

  async execute(filter: PurchaseFilterDto) {
    const result = await this.purchaseRepository.findAll(filter);

    return {
      items: result.items.map((purchase) => PurchaseMapper.toResponse(purchase)),
      meta: result.meta,
    };
  }
}
