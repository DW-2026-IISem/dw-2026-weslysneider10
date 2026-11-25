import { type IPaymentRepository } from '../../domain/interfaces/payment-repository.interface';
import { type ISaleRepository } from '../../../sales/domain/interfaces/sale-repository.interface';
import { CreatePaymentDto } from '../dto/create-payment.dto';
export declare class CreatePaymentUseCase {
    private readonly paymentRepository;
    private readonly saleRepository;
    constructor(paymentRepository: IPaymentRepository, saleRepository: ISaleRepository);
    execute(dto: CreatePaymentDto): Promise<import("../dto/payment-response.dto").PaymentResponseDto>;
}
