import { Status } from '../../../../../common/enums/status.enum';
import { Supplier } from '../../domain/entities/supplier.entity';
import { SupplierResponseDto } from '../dto/supplier-response.dto';
import { SupplierModel } from '../../infrastructure/persistence/models/supplier.model';

export class SupplierMapper {
  static toDomain(model: SupplierModel): Supplier {
    return Supplier.reconstitute({
      id: model.id,
      nit: model.nit,
      businessName: model.businessName,
      contactName: model.contactName ?? undefined,
      phone: model.phone ?? undefined,
      email: model.email ?? undefined,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Supplier): SupplierResponseDto {
    return {
      id: entity.id!,
      nit: entity.nit,
      businessName: entity.businessName,
      contactName: entity.contactName,
      phone: entity.phone,
      email: entity.email,
      status: entity.status,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Supplier): Partial<SupplierModel> {
    return {
      id: entity.id,
      nit: entity.nit,
      businessName: entity.businessName,
      contactName: entity.contactName ?? null,
      phone: entity.phone ?? null,
      email: entity.email ?? null,
      status: entity.status ?? Status.ACTIVE,
    };
  }
}
