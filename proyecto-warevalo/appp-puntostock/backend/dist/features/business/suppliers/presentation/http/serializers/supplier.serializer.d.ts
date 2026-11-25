import { Supplier } from '../../../domain/entities/supplier.entity';
import { SupplierResponseDto } from '../../../application/dto/supplier-response.dto';
export declare class SupplierSerializer {
    static serialize(entity: Supplier): SupplierResponseDto;
}
