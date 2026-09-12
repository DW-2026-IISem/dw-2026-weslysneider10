import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '../../../../../common/enums/status.enum';

export class SupplierResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '900123456' })
  nit: string;

  @ApiProperty({ example: 'Distribuidora La Guajira SAS' })
  businessName: string;

  @ApiPropertyOptional({ example: 'Carlos Ramírez' })
  contactName?: string;

  @ApiPropertyOptional({ example: '+57 300 1112233' })
  phone?: string;

  @ApiPropertyOptional({ example: 'ventas@distribuidoralaguajira.com' })
  email?: string;

  @ApiProperty({ enum: Status, example: Status.ACTIVE })
  status: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
