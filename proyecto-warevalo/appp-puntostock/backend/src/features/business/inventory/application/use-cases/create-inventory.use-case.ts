import { Inject, Injectable } from '@nestjs/common';
import { BranchNotFoundException } from '../../../branches/domain/exceptions/branch-not-found.exception';
import {
  BRANCH_REPOSITORY,
  type IBranchRepository,
} from '../../../branches/domain/interfaces/branch-repository.interface';
import { ProductNotFoundException } from '../../../products/domain/exceptions/product-not-found.exception';
import {
  type IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../../products/domain/interfaces/product-repository.interface';
import { Inventory } from '../../domain/entities/inventory.entity';
import { InventoryAlreadyExistsException } from '../../domain/exceptions/inventory-already-exists.exception';
import {
  type IInventoryRepository,
  INVENTORY_REPOSITORY,
} from '../../domain/interfaces/inventory-repository.interface';
import { CreateInventoryDto } from '../dto/create-inventory.dto';
import { InventoryMapper } from '../mappers/inventory.mapper';

@Injectable()
export class CreateInventoryUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: IInventoryRepository,
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepository: IBranchRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(dto: CreateInventoryDto) {
    const branch = await this.branchRepository.findById(dto.branchId);
    if (!branch) {
      throw new BranchNotFoundException(dto.branchId);
    }

    const product = await this.productRepository.findById(dto.productId);
    if (!product) {
      throw new ProductNotFoundException(dto.productId);
    }

    const existing = await this.inventoryRepository.findByBranchAndProduct(
      dto.branchId,
      dto.productId,
    );
    if (existing) {
      throw new InventoryAlreadyExistsException(dto.branchId, dto.productId);
    }

    const inventory = Inventory.create(dto);
    const created = await this.inventoryRepository.create(inventory);
    return InventoryMapper.toResponse(created);
  }
}
