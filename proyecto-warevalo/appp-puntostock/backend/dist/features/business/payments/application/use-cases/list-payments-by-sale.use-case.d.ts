import { type IPaymentRepository } from '../../domain/interfaces/payment-repository.interface';
import { type ISaleRepository } from '../../../sales/domain/interfaces/sale-repository.interface';
export declare class ListPaymentsBySaleUseCase {
    private readonly paymentRepository;
    private readonly saleRepository;
    constructor(paymentRepository: IPaymentRepository, saleRepository: ISaleRepository);
    execute(saleId: number): Promise<{
        saleId: number;
        saleTotal: number;
        totalPaid: number;
        balance: number;
        payments: import("../dto/payment-response.dto").PaymentResponseDto[];
    }>;
}
