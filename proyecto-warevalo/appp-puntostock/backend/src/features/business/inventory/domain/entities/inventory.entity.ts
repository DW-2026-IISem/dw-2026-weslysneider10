export interface InventoryProps {
  id?: number;
  branchId: number;
  productId: number;
  quantity: number;
  minStock: number;
  updatedAt?: Date;
}

export class Inventory {
  id?: number;
  branchId: number;
  productId: number;
  quantity: number;
  minStock: number;
  updatedAt?: Date;

  private constructor(props: InventoryProps) {
    this.id = props.id;
    this.branchId = props.branchId;
    this.productId = props.productId;
    this.quantity = props.quantity;
    this.minStock = props.minStock;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<InventoryProps, 'id' | 'updatedAt'>,
  ): Inventory {
    if (props.quantity < 0) {
      throw new Error('La cantidad no puede ser negativa');
    }

    if (props.minStock < 0) {
      throw new Error('El stock mínimo no puede ser negativo');
    }

    return new Inventory(props);
  }

  static reconstitute(props: InventoryProps): Inventory {
    return new Inventory(props);
  }

  update(
    props: Partial<Pick<InventoryProps, 'quantity' | 'minStock'>>,
  ): void {
    if (props.quantity !== undefined) {
      if (props.quantity < 0) {
        throw new Error('La cantidad no puede ser negativa');
      }
      this.quantity = props.quantity;
    }

    if (props.minStock !== undefined) {
      if (props.minStock < 0) {
        throw new Error('El stock mínimo no puede ser negativo');
      }
      this.minStock = props.minStock;
    }
  }

  increaseStock(amount: number): void {
    if (amount <= 0) {
      throw new Error('La cantidad a incrementar debe ser mayor a 0');
    }
    this.quantity += amount;
  }

  decreaseStock(amount: number): void {
    if (amount <= 0) {
      throw new Error('La cantidad a descontar debe ser mayor a 0');
    }
    if (this.quantity - amount < 0) {
      throw new Error('No hay disponibilidad suficiente en esta ubicación');
    }
    this.quantity -= amount;
  }

  isLowStock(): boolean {
    return this.quantity <= this.minStock;
  }
}
