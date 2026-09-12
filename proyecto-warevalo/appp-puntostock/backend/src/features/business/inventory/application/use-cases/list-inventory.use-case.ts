import { Inject, Injectable } from '@nestjs/common';
import {
  type IInventoryRepository,
  INVENTORY_REPOSITORY,
} from '../../domain/interfaces/inventory-repository.interface';
import { InventoryFilterDto } from '../dto/inventory-filter.dto';
import { InventoryMapper } from '../mappers/inventory.mapper';

@Injectable()
export class ListInventoryUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: IInventoryRepository,
  ) {}

  async execute(filter: InventoryFilterDto) {
    const result = await this.inventoryRepository.findAll(filter);
    return {
      items: result.items.map((inventory) =>
        InventoryMapper.toResponse(inventory),
      ),
      meta: result.meta,
    };
  }
}
