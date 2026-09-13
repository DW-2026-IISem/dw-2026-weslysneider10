import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PaymentReferenceType } from '../../domain/enums/payment-reference-type.enum';
import {
  PAYMENT_REPOSITORY,
  type IPaymentRepository,
} from '../../domain/interfaces/payment-repository.interface';
import {
  SALE_REPOSITORY,
  type ISaleRepository,
} from '../../../sales/domain/interfaces/sale-repository.interface';
import { PaymentMapper } from '../mappers/payment.mapper';

@Injectable()
export class ListPaymentsBySaleUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
    @Inject(SALE_REPOSITORY)
    private readonly saleRepository: ISaleRepository,
  ) {}

  async execute(saleId: number) {
    const sale = await this.saleRepository.findById(saleId);
    if (!sale) {
      throw new NotFoundException(`Venta ${saleId} no encontrada`);
    }

    const payments = await this.paymentRepository.findByReference(
      PaymentReferenceType.SALE,
      saleId,
    );

    const totalPaid = await this.paymentRepository.sumConfirmedByReference(
      PaymentReferenceType.SALE,
      saleId,
    );

    return {
      saleId,
      saleTotal: sale.total,
      totalPaid,
      balance: sale.total - totalPaid,
      payments: payments.map((p) => PaymentMapper.toResponse(p)),
    };
  }
}
