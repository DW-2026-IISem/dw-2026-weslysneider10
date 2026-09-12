export enum PurchaseStatus {
  PENDING = 'PENDING',
  PARTIALLY_RECEIVED = 'PARTIALLY_RECEIVED',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED',
}

export interface PurchaseItemProps {
  id?: number;
  purchaseId?: number;
  productId: number;
  quantityOrdered: number;
  quantityReceived?: number;
  unitCost: number;
  total: number;
}

export class PurchaseItem {
  id?: number;
  purchaseId?: number;
  productId: number;
  quantityOrdered: number;
  quantityReceived: number;
  unitCost: number;
  total: number;

  private constructor(props: PurchaseItemProps) {
    this.id = props.id;
    this.purchaseId = props.purchaseId;
    this.productId = props.productId;
    this.quantityOrdered = props.quantityOrdered;
    this.quantityReceived = props.quantityReceived ?? 0;
    this.unitCost = props.unitCost;
    this.total = props.total;
  }

  static create(
    props: Omit<PurchaseItemProps, 'id' | 'total' | 'purchaseId' | 'quantityReceived'>,
  ): PurchaseItem {
    if (props.quantityOrdered <= 0) {
      throw new Error('La cantidad pedida debe ser mayor a 0');
    }

    if (props.unitCost <= 0) {
      throw new Error('El costo unitario debe ser mayor a 0');
    }

    const total = props.quantityOrdered * props.unitCost;

    return new PurchaseItem({ ...props, total });
  }

  static reconstitute(props: PurchaseItemProps): PurchaseItem {
    return new PurchaseItem(props);
  }

  get pendingQuantity(): number {
    return this.quantityOrdered - this.quantityReceived;
  }

  receive(quantity: number): void {
    if (quantity <= 0) {
      throw new Error('La cantidad a recibir debe ser mayor a 0');
    }

    if (this.quantityReceived + quantity > this.quantityOrdered) {
      throw new Error(
        `La recepción supera lo pedido para el producto ${this.productId}`,
      );
    }

    this.quantityReceived += quantity;
  }
}

export interface PurchaseProps {
  id?: number;
  purchaseDate: Date;
  supplierId: number;
  branchId: number;
  status?: PurchaseStatus;
  subtotal: number;
  tax: number;
  total: number;
  items?: PurchaseItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Purchase {
  id?: number;
  purchaseDate: Date;
  supplierId: number;
  branchId: number;
  status: PurchaseStatus;
  subtotal: number;
  tax: number;
  total: number;
  items: PurchaseItem[];
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: PurchaseProps) {
    this.id = props.id;
    this.purchaseDate = props.purchaseDate;
    this.supplierId = props.supplierId;
    this.branchId = props.branchId;
    this.status = props.status ?? PurchaseStatus.PENDING;
    this.subtotal = props.subtotal;
    this.tax = props.tax;
    this.total = props.total;
    this.items = props.items ?? [];
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<PurchaseProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Purchase {
    if (!props.items?.length) {
      throw new Error('La compra debe tener al menos un item');
    }

    return new Purchase(props);
  }

  static reconstitute(props: PurchaseProps): Purchase {
    return new Purchase(props);
  }

  private recalculateStatus(): void {
    const allReceived = this.items.every(
      (item) => item.quantityReceived >= item.quantityOrdered,
    );
    const anyReceived = this.items.some((item) => item.quantityReceived > 0);

    if (allReceived) {
      this.status = PurchaseStatus.RECEIVED;
    } else if (anyReceived) {
      this.status = PurchaseStatus.PARTIALLY_RECEIVED;
    }
  }

  receiveItems(receipts: { productId: number; quantity: number }[]): void {
    for (const receipt of receipts) {
      const item = this.items.find((i) => i.productId === receipt.productId);
      if (!item) {
        throw new Error(
          `El producto ${receipt.productId} no pertenece a esta compra`,
        );
      }

      item.receive(receipt.quantity);
    }

    this.recalculateStatus();
  }

  cancel(): void {
    this.status = PurchaseStatus.CANCELLED;
  }
}
