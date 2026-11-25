import { Supplier } from '../../domain/entities/supplier.entity';
import { SupplierResponseDto } from '../dto/supplier-response.dto';
import { SupplierModel } from '../../infrastructure/persistence/models/supplier.model';
export declare class SupplierMapper {
    static toDomain(model: SupplierModel): Supplier;
    static toResponse(entity: Supplier): SupplierResponseDto;
    static toPersistence(entity: Supplier): Partial<SupplierModel>;
}
