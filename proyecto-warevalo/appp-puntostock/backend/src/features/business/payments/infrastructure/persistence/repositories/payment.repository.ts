import { Injectable } from '@nestjs/common';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util';
import { Payment } from '../../../domain/entities/payment.entity';
import { PaymentStatus } from '../../../domain/enums/payment-status.enum';
import { PaymentReferenceType } from '../../../domain/enums/payment-reference-type.enum';
import {
  IPaymentRepository,
  PaymentFindAllParams,
} from '../../../domain/interfaces/payment-repository.interface';
import { PaymentMapper } from '../../../application/mappers/payment.mapper';
import { PaymentModel } from '../models/payment.model';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  async create(payment: Payment): Promise<Payment> {
    const model = await PaymentModel.create(
      PaymentMapper.toPersistence(payment),
    );
    return PaymentMapper.toDomain(model);
  }

  async updateStatus(
    id: number,
    status: Payment['status'],
  ): Promise<Payment> {
    await PaymentModel.update({ status }, { where: { id } });
    const updated = await PaymentModel.findByPk(id);
    return PaymentMapper.toDomain(updated!);
  }

  async findById(id: number): Promise<Payment | null> {
    const model = await PaymentModel.findByPk(id);
    return model ? PaymentMapper.toDomain(model) : null;
  }

  async findAll(params: PaymentFindAllParams) {
    const { page, limit, offset } = normalizePagination(
      params.page,
      params.limit,
    );

    const where: Record<string, unknown> = {};
    if (params.referenceType) {
      where.referenceType = params.referenceType;
    }
    if (params.referenceId) {
      where.referenceId = params.referenceId;
    }

    const { rows, count } = await PaymentModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['paymentDate', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row) => PaymentMapper.toDomain(row)),
      count,
      page,
      limit,
    );
  }

  async findByReference(
    referenceType: PaymentReferenceType,
    referenceId: number,
  ): Promise<Payment[]> {
    const rows = await PaymentModel.findAll({
      where: { referenceType, referenceId },
      order: [['paymentDate', 'ASC']],
    });
    return rows.map((row) => PaymentMapper.toDomain(row));
  }

  async sumConfirmedByReference(
    referenceType: PaymentReferenceType,
    referenceId: number,
  ): Promise<number> {
    const result = await PaymentModel.sum('amount', {
      where: {
        referenceType,
        referenceId,
        status: PaymentStatus.CONFIRMED,
      },
    });
    return result ?? 0;
  }
}
