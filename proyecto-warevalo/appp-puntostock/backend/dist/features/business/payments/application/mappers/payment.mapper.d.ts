import { Payment } from '../../domain/entities/payment.entity';
import { PaymentResponseDto } from '../dto/payment-response.dto';
import { PaymentModel } from '../../infrastructure/persistence/models/payment.model';
export declare class PaymentMapper {
    static toDomain(model: PaymentModel): Payment;
    static toResponse(entity: Payment): PaymentResponseDto;
    static toPersistence(entity: Payment): Partial<PaymentModel>;
}
