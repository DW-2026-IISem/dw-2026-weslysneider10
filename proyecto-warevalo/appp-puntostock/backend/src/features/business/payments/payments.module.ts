import { Module } from '@nestjs/common';
import { SalesModule } from '../sales/sales.module';
import { PAYMENT_REPOSITORY } from './domain/interfaces/payment-repository.interface';
import { PaymentRepository } from './infrastructure/persistence/repositories/payment.repository';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.use-case';
import { CancelPaymentUseCase } from './application/use-cases/cancel-payment.use-case';
import { GetPaymentUseCase } from './application/use-cases/get-payment.use-case';
import { ListPaymentsUseCase } from './application/use-cases/list-payments.use-case';
import { ListPaymentsBySaleUseCase } from './application/use-cases/list-payments-by-sale.use-case';
import { PaymentsController } from './presentation/http/controllers/payments.controller';

@Module({
  imports: [SalesModule],
  controllers: [PaymentsController],
  providers: [
    PaymentRepository,
    { provide: PAYMENT_REPOSITORY, useExisting: PaymentRepository },
    CreatePaymentUseCase,
    CancelPaymentUseCase,
    GetPaymentUseCase,
    ListPaymentsUseCase,
    ListPaymentsBySaleUseCase,
  ],
  exports: [PAYMENT_REPOSITORY],
})
export class PaymentsModule {}
