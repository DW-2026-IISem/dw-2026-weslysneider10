import { Exclude, Expose, Type } from 'class-transformer';

class PurchaseDetailSerializer {
  @Expose()
  id: number;

  @Expose()
  productId: number;

  @Expose()
  quantityOrdered: number;

  @Expose()
  quantityReceived: number;

  @Expose()
  unitCost: number;

  @Expose()
  total: number;
}

@Exclude()
export class PurchaseSerializer {
  @Expose()
  id: number;

  @Expose()
  purchaseDate: Date;

  @Expose()
  supplierId: number;

  @Expose()
  branchId: number;

  @Expose()
  status: string;

  @Expose()
  subtotal: number;

  @Expose()
  tax: number;

  @Expose()
  total: number;

  @Expose()
  @Type(() => PurchaseDetailSerializer)
  items: PurchaseDetailSerializer[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
