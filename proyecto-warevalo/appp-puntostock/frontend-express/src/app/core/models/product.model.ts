export type ProductStatus = 'active' | 'inactive';

export interface Product {
  id?: number;
  sku: string;
  name: string;
  description?: string | null;
  price: number;
  productTypeId: number;
  status: ProductStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateProduct = Omit<
  Product,
  'id' | 'createdAt' | 'updatedAt' | 'status'
> & {
  status?: ProductStatus;
};

/** PUT requiere los campos de actualización completa. */
export type UpdateProduct = Omit<
  Product,
  'id' | 'createdAt' | 'updatedAt' | 'status'
>;

/** PATCH permite enviar solo los campos que se van a modificar. */
export type PatchProduct = Partial<UpdateProduct>;
