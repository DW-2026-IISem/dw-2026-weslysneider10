import { Inject, Injectable } from '@nestjs/common';
import { PaymentNotFoundException } from '../../domain/exceptions/payment-not-found.exception';
import {
  PAYMENT_REPOSITORY,
  type IPaymentRepository,
} from '../../domain/interfaces/payment-repository.interface';
import { PaymentMapper } from '../mappers/payment.mapper';

@Injectable()
export class GetPaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async execute(id: number) {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new PaymentNotFoundException(id);
    }

    return PaymentMapper.toResponse(payment);
  }
}
