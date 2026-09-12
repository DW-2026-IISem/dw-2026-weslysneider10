import { Inject, Injectable } from '@nestjs/common';
import { SUPPLIER_REPOSITORY, type ISupplierRepository } from '../../../suppliers/domain/interfaces/supplier-repository.interface';
import { BRANCH_REPOSITORY, type IBranchRepository } from '../../../branches/domain/interfaces/branch-repository.interface';
import { PRODUCT_REPOSITORY, type IProductRepository } from '../../../products/domain/interfaces/product-repository.interface';
import { ProductNotFoundException } from '../../../products/domain/exceptions/product-not-found.exception';
import { Purchase, PurchaseItem } from '../../domain/entities/purchase.entity';
import { PURCHASE_REPOSITORY, type IPurchaseRepository } from '../../domain/interfaces/purchase-repository.interface';
import { PurchaseCalculatorDomainService } from '../../domain/services/purchase-calculator.domain-service';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { PurchaseMapper } from '../mappers/purchase.mapper';

@Injectable()
export class CreatePurchaseUseCase {
  private readonly purchaseCalculator = new PurchaseCalculatorDomainService();

  constructor(
    @Inject(PURCHASE_REPOSITORY)
    private readonly purchaseRepository: IPurchaseRepository,
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplierRepository: ISupplierRepository,
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepository: IBranchRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(dto: CreatePurchaseDto) {
    const supplier = await this.supplierRepository.findById(dto.supplierId);
    if (!supplier) {
      throw new Error(`Proveedor ${dto.supplierId} no encontrado`);
    }

    const branch = await this.branchRepository.findById(dto.branchId);
    if (!branch) {
      throw new Error(`Sucursal ${dto.branchId} no encontrada`);
    }

    const items: PurchaseItem[] = [];

    for (const itemDto of dto.items) {
      const product = await this.productRepository.findById(itemDto.productId);
      if (!product) {
        throw new ProductNotFoundException(itemDto.productId);
      }

      items.push(
        PurchaseItem.create({
          productId: itemDto.productId,
          quantityOrdered: itemDto.quantityOrdered,
          unitCost: itemDto.unitCost,
        }),
      );
    }

    const totals = this.purchaseCalculator.calculateTotals(dto.items, dto.tax ?? 0);

    const purchase = Purchase.create({
      purchaseDate: new Date(),
      supplierId: dto.supplierId,
      branchId: dto.branchId,
      subtotal: totals.subtotal,
      tax: totals.tax,
      total: totals.total,
      items,
    });

    const created = await this.purchaseRepository.create(purchase);
    return PurchaseMapper.toResponse(created);
  }
}
