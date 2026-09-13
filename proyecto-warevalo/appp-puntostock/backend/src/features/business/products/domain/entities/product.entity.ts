import { InvalidProductPriceException } from '../exceptions/invalid-product-price.exception';

export interface ProductProps {
  id?: number;
  sku: string;
  name: string;
  description?: string;
  price: number;
  quantity?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type CreatableProductProps = Omit<ProductProps, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>;
type UpdatableProductProps = Partial<CreatableProductProps>;

export class Product {
  id?: number;
  sku: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: ProductProps) {
    this.id = props.id;
    this.sku = props.sku;
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.quantity = props.quantity ?? 0;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: CreatableProductProps): Product {
    if (!props.sku?.trim()) {
      throw new Error('El SKU del producto es requerido');
    }

    if (!props.name?.trim()) {
      throw new Error('El nombre del producto es requerido');
    }

    if (props.price <= 0) {
      throw new InvalidProductPriceException(props.price);
    }

    if (props.quantity !== undefined && props.quantity < 0) {
      throw new Error('La cantidad en stock no puede ser negativa');
    }

    return new Product(props);
  }

  static reconstitute(props: ProductProps): Product {
    return new Product(props);
  }

  update(props: UpdatableProductProps): void {
    if (props.sku !== undefined) {
      if (!props.sku.trim()) {
        throw new Error('El SKU del producto es requerido');
      }

      this.sku = props.sku;
    }

    if (props.name !== undefined) {
      if (!props.name.trim()) {
        throw new Error('El nombre del producto es requerido');
      }

      this.name = props.name;
    }

    if (props.description !== undefined) {
      this.description = props.description;
    }

    if (props.price !== undefined) {
      if (props.price <= 0) {
        throw new InvalidProductPriceException(props.price);
      }

      this.price = props.price;
    }

    if (props.quantity !== undefined) {
      if (props.quantity < 0) {
        throw new Error('La cantidad en stock no puede ser negativa');
      }

      this.quantity = props.quantity;
    }
  }

  deactivate(): void {
    this.isActive = false;
  }

  activate(): void {
    this.isActive = true;
  }
}
