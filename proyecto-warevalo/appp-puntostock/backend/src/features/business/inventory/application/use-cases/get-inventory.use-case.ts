import { Inject, Injectable } from '@nestjs/common';
import { InventoryNotFoundException } from '../../domain/exceptions/inventory-not-found.exception';
import {
  type IInventoryRepository,
  INVENTORY_REPOSITORY,
} from '../../domain/interfaces/inventory-repository.interface';
import { InventoryMapper } from '../mappers/inventory.mapper';

@Injectable()
export class GetInventoryUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: IInventoryRepository,
  ) {}

  async execute(id: number) {
    const inventory = await this.inventoryRepository.findById(id);
    if (!inventory) {
      throw new InventoryNotFoundException(id);
    }

    return InventoryMapper.toResponse(inventory);
  }
}
