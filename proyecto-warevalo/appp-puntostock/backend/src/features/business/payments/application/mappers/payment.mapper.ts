import { Payment } from '../../domain/entities/payment.entity';
import { PaymentResponseDto } from '../dto/payment-response.dto';
import { PaymentModel } from '../../infrastructure/persistence/models/payment.model';

export class PaymentMapper {
  static toDomain(model: PaymentModel): Payment {
    return Payment.reconstitute({
      id: model.id,
      referenceType: model.referenceType,
      referenceId: model.referenceId,
      method: model.method,
      amount: model.amount,
      paymentDate: model.paymentDate,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Payment): PaymentResponseDto {
    return {
      id: entity.id!,
      referenceType: entity.referenceType,
      referenceId: entity.referenceId,
      method: entity.method,
      amount: entity.amount,
      paymentDate: entity.paymentDate,
      status: entity.status,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Payment): Partial<PaymentModel> {
    return {
      id: entity.id,
      referenceType: entity.referenceType,
      referenceId: entity.referenceId,
      method: entity.method,
      amount: entity.amount,
      paymentDate: entity.paymentDate,
      status: entity.status,
    };
  }
}
