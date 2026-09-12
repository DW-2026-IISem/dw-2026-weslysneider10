import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'SKU-001',
  })
  sku: string;

  @ApiProperty({
    example: 'Arroz Diana 500g',
  })
  name: string;

  @ApiPropertyOptional({
    example: 'Arroz blanco de 500 gramos',
  })
  description?: string;

  @ApiProperty({
    example: 4500.00,
  })
  price: number;

  @ApiProperty({
    example: 100,
  })
  quantity: number;

  @ApiProperty({
    example: true,
  })
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
