import { Exclude, Expose, Type } from 'class-transformer';

class ReturnLineSerializer {
  @Expose()
  id: number;

  @Expose()
  productId: number;

  @Expose()
  quantity: number;

  @Expose()
  unitPrice: number;

  @Expose()
  total: number;
}

@Exclude()
export class ReturnSerializer {
  @Expose()
  id: number;

  @Expose()
  returnDate: Date;

  @Expose()
  reason: string;

  @Expose()
  saleId: number;

  @Expose()
  status: string;

  @Expose()
  subtotal: number;

  @Expose()
  total: number;

  @Expose()
  @Type(() => ReturnLineSerializer)
  lines: ReturnLineSerializer[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
