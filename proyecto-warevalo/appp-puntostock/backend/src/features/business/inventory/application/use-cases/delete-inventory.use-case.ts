import { Inject, Injectable } from '@nestjs/common';
import { InventoryNotFoundException } from '../../domain/exceptions/inventory-not-found.exception';
import {
  type IInventoryRepository,
  INVENTORY_REPOSITORY,
} from '../../domain/interfaces/inventory-repository.interface';

@Injectable()
export class DeleteInventoryUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: IInventoryRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const inventory = await this.inventoryRepository.findById(id);
    if (!inventory) {
      throw new InventoryNotFoundException(id);
    }

    await this.inventoryRepository.delete(id);
  }
}
