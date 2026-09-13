import { Inject, Injectable } from '@nestjs/common';
import { SaleNotFoundException } from '../../../sales/domain/exceptions/sale-not-found.exception';
import { SALE_REPOSITORY, type ISaleRepository } from '../../../sales/domain/interfaces/sale-repository.interface';
import { ProductNotFoundException } from '../../../products/domain/exceptions/product-not-found.exception';
import { PRODUCT_REPOSITORY, type IProductRepository } from '../../../products/domain/interfaces/product-repository.interface';
import { InvalidReturnQuantityException } from '../../domain/exceptions/invalid-return-quantity.exception';
import { Return, ReturnLine } from '../../domain/entities/return.entity';
import { RETURN_REPOSITORY, type IReturnRepository } from '../../domain/interfaces/return-repository.interface';
import { ReturnCalculatorDomainService } from '../../domain/services/return-calculator.domain-service';
import { CreateReturnDto } from '../dto/create-return.dto';
import { ReturnMapper } from '../mappers/return.mapper';

@Injectable()
export class CreateReturnUseCase {
  private readonly returnCalculator = new ReturnCalculatorDomainService();

  constructor(
    @Inject(RETURN_REPOSITORY)
    private readonly returnRepository: IReturnRepository,
    @Inject(SALE_REPOSITORY)
    private readonly saleRepository: ISaleRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(dto: CreateReturnDto) {
    const sale = await this.saleRepository.findById(dto.saleId);
    if (!sale) {
      throw new SaleNotFoundException(dto.saleId);
    }

    const lines: ReturnLine[] = [];

    for (const itemDto of dto.items) {
      const saleItem = sale.items.find((i) => i.productId === itemDto.productId);

      if (!saleItem) {
        throw new Error(
          `El producto ${itemDto.productId} no pertenece a la venta ${dto.saleId}`,
        );
      }

      const product = await this.productRepository.findById(itemDto.productId);
      if (!product) {
        throw new ProductNotFoundException(itemDto.productId);
      }

      const alreadyReturned = await this.returnRepository.getReturnedQuantityForSaleItem(
        dto.saleId,
        itemDto.productId,
      );

      const available = saleItem.quantity - alreadyReturned;

      if (itemDto.quantity > available) {
        throw new InvalidReturnQuantityException(
          product.name,
          saleItem.quantity,
          alreadyReturned,
          itemDto.quantity,
        );
      }

      lines.push(
        ReturnLine.create({
          productId: itemDto.productId,
          quantity: itemDto.quantity,
          unitPrice: saleItem.unitPrice,
        }),
      );
    }

    const totals = this.returnCalculator.calculateTotals(lines);

    const returnEntity = Return.create({
      returnDate: new Date(),
      reason: dto.reason,
      saleId: dto.saleId,
      subtotal: totals.subtotal,
      total: totals.total,
      lines,
    });

    const created = await this.returnRepository.create(returnEntity);
    return ReturnMapper.toResponse(created);
  }
}
