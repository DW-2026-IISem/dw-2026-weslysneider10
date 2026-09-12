import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { Status } from '../../../../../common/enums/status.enum';

export class ProductTypeResponseDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Electrónica',
  })
  name: string;

  @ApiPropertyOptional({
    example: 'Dispositivos electrónicos y accesorios',
  })
  description?: string;

  @ApiProperty({
    enum: Status,
    example: Status.ACTIVE,
  })
  status: Status;

  @ApiProperty({
    example: '2026-08-24T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2026-08-24T12:00:00.000Z',
  })
  updatedAt: Date;
}
