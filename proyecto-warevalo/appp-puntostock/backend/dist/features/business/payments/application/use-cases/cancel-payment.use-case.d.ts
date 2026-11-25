import { type IPaymentRepository } from '../../domain/interfaces/payment-repository.interface';
export declare class CancelPaymentUseCase {
    private readonly paymentRepository;
    constructor(paymentRepository: IPaymentRepository);
    execute(id: number): Promise<import("../dto/payment-response.dto").PaymentResponseDto>;
}
