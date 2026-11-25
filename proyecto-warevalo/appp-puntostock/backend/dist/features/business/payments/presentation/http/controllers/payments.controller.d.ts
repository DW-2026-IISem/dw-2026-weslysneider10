import { CreatePaymentDto } from '../../../application/dto/create-payment.dto';
import { PaymentFilterDto } from '../../../application/dto/payment-filter.dto';
import { PaymentResponseDto } from '../../../application/dto/payment-response.dto';
import { CreatePaymentUseCase } from '../../../application/use-cases/create-payment.use-case';
import { CancelPaymentUseCase } from '../../../application/use-cases/cancel-payment.use-case';
import { GetPaymentUseCase } from '../../../application/use-cases/get-payment.use-case';
import { ListPaymentsUseCase } from '../../../application/use-cases/list-payments.use-case';
import { ListPaymentsBySaleUseCase } from '../../../application/use-cases/list-payments-by-sale.use-case';
export declare class PaymentsController {
    private readonly createPaymentUseCase;
    private readonly cancelPaymentUseCase;
    private readonly getPaymentUseCase;
    private readonly listPaymentsUseCase;
    private readonly listPaymentsBySaleUseCase;
    constructor(createPaymentUseCase: CreatePaymentUseCase, cancelPaymentUseCase: CancelPaymentUseCase, getPaymentUseCase: GetPaymentUseCase, listPaymentsUseCase: ListPaymentsUseCase, listPaymentsBySaleUseCase: ListPaymentsBySaleUseCase);
    create(dto: CreatePaymentDto): Promise<PaymentResponseDto>;
    findAll(filter: PaymentFilterDto): Promise<{
        items: PaymentResponseDto[];
        meta: import("../../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
    findBySale(saleId: number): Promise<{
        saleId: number;
        saleTotal: number;
        totalPaid: number;
        balance: number;
        payments: PaymentResponseDto[];
    }>;
    findOne(id: number): Promise<PaymentResponseDto>;
    cancel(id: number): Promise<PaymentResponseDto>;
}
