import { Inject, Injectable } from '@nestjs/common';
import {
  type IInventoryRepository,
  INVENTORY_REPOSITORY,
} from '../../domain/interfaces/inventory-repository.interface';
import { InventoryMapper } from '../mappers/inventory.mapper';

@Injectable()
export class ListLowStockUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: IInventoryRepository,
  ) {}

  async execute(branchId?: number) {
    const items = await this.inventoryRepository.findLowStock({ branchId });
    return items.map((inventory) => InventoryMapper.toResponse(inventory));
  }
}
