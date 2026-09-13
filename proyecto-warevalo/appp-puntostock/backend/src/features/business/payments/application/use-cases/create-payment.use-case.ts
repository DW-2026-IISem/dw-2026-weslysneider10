import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Payment } from '../../domain/entities/payment.entity';
import { PaymentReferenceType } from '../../domain/enums/payment-reference-type.enum';
import { PaymentExceedsBalanceException } from '../../domain/exceptions/payment-exceeds-balance.exception';
import {
  PAYMENT_REPOSITORY,
  type IPaymentRepository,
} from '../../domain/interfaces/payment-repository.interface';
import {
  SALE_REPOSITORY,
  type ISaleRepository,
} from '../../../sales/domain/interfaces/sale-repository.interface';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { PaymentMapper } from '../mappers/payment.mapper';

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
    @Inject(SALE_REPOSITORY)
    private readonly saleRepository: ISaleRepository,
  ) {}

  async execute(dto: CreatePaymentDto) {
    if (dto.referenceType === PaymentReferenceType.SALE) {
      const sale = await this.saleRepository.findById(dto.referenceId);
      if (!sale) {
        throw new NotFoundException(
          `Venta ${dto.referenceId} no encontrada`,
        );
      }

      const alreadyPaid = await this.paymentRepository.sumConfirmedByReference(
        PaymentReferenceType.SALE,
        dto.referenceId,
      );

      const balance = sale.total - alreadyPaid;
      if (dto.amount > balance) {
        throw new PaymentExceedsBalanceException(dto.referenceId, balance);
      }
    }

    const payment = Payment.create(dto);
    const created = await this.paymentRepository.create(payment);
    return PaymentMapper.toResponse(created);
  }
}
