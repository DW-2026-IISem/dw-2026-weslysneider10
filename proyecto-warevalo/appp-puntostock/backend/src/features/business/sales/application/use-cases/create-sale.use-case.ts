import { Inject, Injectable } from '@nestjs/common';

import {
  SALE_REPOSITORY,
  ISaleRepository,
} from '../../domain/interfaces/sale-repository.interface';

import { Sale } from '../../domain/entities/sale.entity';
import { SaleCalculatorDomainService } from '../../domain/services/sale-calculator.domain-service';

import { CreateSaleDto } from '../dto/create-sale.dto';
import { SaleMapper } from '../mappers/sale.mapper';

@Injectable()
export class CreateSaleUseCase {
  constructor(
    @Inject(SALE_REPOSITORY)
    private readonly saleRepository: ISaleRepository,

    private readonly saleCalculator: SaleCalculatorDomainService,
  ) {}

  async execute(dto: CreateSaleDto) {
    if (dto.clientId === undefined) {
      throw new Error(
        'El cliente es obligatorio para registrar una venta',
      );
    }

    const items = dto.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.quantity * item.unitPrice,
    }));

    const totals = this.saleCalculator.calculate({
      items,
      tax: dto.tax,
      discounts: dto.discounts,
    });

    const sale = Sale.create({
      saleDate: new Date(),
      subtotal: totals.subtotal,
      tax: totals.tax,
      discounts: totals.discounts,
      total: totals.total,
      clientId: dto.clientId,
      items,
    });

    const created = await this.saleRepository.create(sale);

    return SaleMapper.toResponse(created);
  }
}
