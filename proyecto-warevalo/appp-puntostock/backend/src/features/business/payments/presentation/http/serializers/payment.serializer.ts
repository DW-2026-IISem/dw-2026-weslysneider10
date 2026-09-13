import { Payment } from '../../../domain/entities/payment.entity';
import { PaymentResponseDto } from '../../../application/dto/payment-response.dto';
import { PaymentMapper } from '../../../application/mappers/payment.mapper';

export class PaymentSerializer {
  static serialize(entity: Payment): PaymentResponseDto {
    return PaymentMapper.toResponse(entity);
  }
}
