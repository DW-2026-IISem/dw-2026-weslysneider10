export class ProductResponseDto {
  id: number;

  sku: string;

  name: string;

  description?: string;

  price: number;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}
