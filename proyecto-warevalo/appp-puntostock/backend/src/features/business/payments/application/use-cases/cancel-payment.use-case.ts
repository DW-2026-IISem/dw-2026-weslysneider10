import { Inject, Injectable } from '@nestjs/common';
import { PaymentStatus } from '../../domain/enums/payment-status.enum';
import { PaymentNotFoundException } from '../../domain/exceptions/payment-not-found.exception';
import {
  PAYMENT_REPOSITORY,
  type IPaymentRepository,
} from '../../domain/interfaces/payment-repository.interface';
import { PaymentMapper } from '../mappers/payment.mapper';

@Injectable()
export class CancelPaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async execute(id: number) {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new PaymentNotFoundException(id);
    }

    payment.cancel();
    const updated = await this.paymentRepository.updateStatus(
      id,
      PaymentStatus.CANCELLED,
    );
    return PaymentMapper.toResponse(updated);
  }
}
