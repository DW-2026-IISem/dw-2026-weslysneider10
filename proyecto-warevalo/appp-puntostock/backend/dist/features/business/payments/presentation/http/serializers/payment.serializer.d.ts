import { Payment } from '../../../domain/entities/payment.entity';
import { PaymentResponseDto } from '../../../application/dto/payment-response.dto';
export declare class PaymentSerializer {
    static serialize(entity: Payment): PaymentResponseDto;
}
