import { Supplier } from '../../../domain/entities/supplier.entity';
import { SupplierResponseDto } from '../../../application/dto/supplier-response.dto';
import { SupplierMapper } from '../../../application/mappers/supplier.mapper';

export class SupplierSerializer {
  static serialize(entity: Supplier): SupplierResponseDto {
    return SupplierMapper.toResponse(entity);
  }
}
