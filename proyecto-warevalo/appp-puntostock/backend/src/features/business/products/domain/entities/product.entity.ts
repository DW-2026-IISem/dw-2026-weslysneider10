export interface ProductProps {
  id?: number;
  sku: string;
  name: string;
  description?: string;
  price: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product {
  id?: number;

  sku: string;

  name: string;

  description?: string;

  price: number;

  isActive: boolean;

  createdAt?: Date;

  updatedAt?: Date;

  private constructor(props: ProductProps) {
    this.id = props.id;
    this.sku = props.sku;
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: ProductProps): Product {
    if (!props.sku?.trim()) {
      throw new Error('El SKU es obligatorio');
    }

    if (!props.name?.trim()) {
      throw new Error('El nombre es obligatorio');
    }

    if (props.price < 0) {
      throw new Error('El precio no puede ser negativo');
    }

    return new Product({
      ...props,
      sku: props.sku.trim(),
      name: props.name.trim(),
    });
  }

  static reconstitute(props: ProductProps): Product {
    return new Product(props);
  }

  update(props: Partial<ProductProps>): void {
    if (props.sku !== undefined) {
      if (!props.sku.trim()) {
        throw new Error('El SKU es obligatorio');
      }

      this.sku = props.sku.trim();
    }

    if (props.name !== undefined) {
      if (!props.name.trim()) {
        throw new Error('El nombre es obligatorio');
      }

      this.name = props.name.trim();
    }

    if (props.description !== undefined) {
      this.description = props.description;
    }

    if (props.price !== undefined) {
      if (props.price < 0) {
        throw new Error('El precio no puede ser negativo');
      }

      this.price = props.price;
    }

    if (props.isActive !== undefined) {
      this.isActive = props.isActive;
    }
  }
}
