import { Return, ReturnLine } from '../../domain/entities/return.entity';
import { ReturnStatus } from '../../domain/enums/return-status.enum';
import { ReturnLineResponseDto, ReturnResponseDto } from '../dto/return-response.dto';
import { ReturnModel } from '../../infrastructure/persistence/models/return.model';
import { ReturnDetailModel } from '../../infrastructure/persistence/models/return-detail.model';

export class ReturnMapper {
  static toDomain(returnModel: ReturnModel, detailModels: ReturnDetailModel[]): Return {
    const lines = detailModels.map((detail) =>
      ReturnLine.reconstitute({
        id: detail.id,
        returnId: detail.returnId,
        productId: detail.productId,
        quantity: detail.quantity,
        unitPrice: Number(detail.unitPrice),
        total: Number(detail.total),
      }),
    );

    return Return.reconstitute({
      id: returnModel.id,
      returnDate: returnModel.returnDate,
      reason: returnModel.reason,
      saleId: returnModel.saleId,
      status: returnModel.status,
      subtotal: Number(returnModel.subtotal),
      total: Number(returnModel.total),
      lines,
      createdAt: returnModel.createdAt,
      updatedAt: returnModel.updatedAt,
    });
  }

  static toResponse(entity: Return): ReturnResponseDto {
    return {
      id: entity.id!,
      returnDate: entity.returnDate,
      reason: entity.reason,
      saleId: entity.saleId,
      status: entity.status,
      subtotal: entity.subtotal,
      total: entity.total,
      lines: entity.lines.map((line) => ReturnMapper.toLineResponse(line)),
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toLineResponse(line: ReturnLine): ReturnLineResponseDto {
    return {
      id: line.id!,
      productId: line.productId,
      quantity: line.quantity,
      unitPrice: line.unitPrice,
      total: line.total,
    };
  }

  static toPersistence(entity: Return): Partial<ReturnModel> {
    return {
      id: entity.id,
      returnDate: entity.returnDate,
      reason: entity.reason,
      saleId: entity.saleId,
      status: entity.status ?? ReturnStatus.COMPLETED,
      subtotal: entity.subtotal,
      total: entity.total,
    };
  }
}
