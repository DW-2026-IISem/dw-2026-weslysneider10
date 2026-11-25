import { type IPaymentRepository } from '../../domain/interfaces/payment-repository.interface';
import { PaymentFilterDto } from '../dto/payment-filter.dto';
export declare class ListPaymentsUseCase {
    private readonly paymentRepository;
    constructor(paymentRepository: IPaymentRepository);
    execute(filter: PaymentFilterDto): Promise<{
        items: import("../dto/payment-response.dto").PaymentResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
}
