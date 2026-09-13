import { ReturnStatus } from '../enums/return-status.enum';

export interface ReturnLineProps {
  id?: number;
  returnId?: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  total: number;
}

export class ReturnLine {
  id?: number;
  returnId?: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  total: number;

  private constructor(props: ReturnLineProps) {
    this.id = props.id;
    this.returnId = props.returnId;
    this.productId = props.productId;
    this.quantity = props.quantity;
    this.unitPrice = props.unitPrice;
    this.total = props.total;
  }

  static create(props: Omit<ReturnLineProps, 'id' | 'total' | 'returnId'>): ReturnLine {
    if (props.quantity <= 0) {
      throw new Error('La cantidad a devolver debe ser mayor a 0');
    }

    if (props.unitPrice <= 0) {
      throw new Error('El precio unitario debe ser mayor a 0');
    }

    const total = props.quantity * props.unitPrice;

    return new ReturnLine({ ...props, total });
  }

  static reconstitute(props: ReturnLineProps): ReturnLine {
    return new ReturnLine(props);
  }
}

export interface ReturnProps {
  id?: number;
  returnDate: Date;
  reason: string;
  saleId: number;
  status?: ReturnStatus;
  subtotal: number;
  total: number;
  lines?: ReturnLine[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Return {
  id?: number;
  returnDate: Date;
  reason: string;
  saleId: number;
  status: ReturnStatus;
  subtotal: number;
  total: number;
  lines: ReturnLine[];
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: ReturnProps) {
    this.id = props.id;
    this.returnDate = props.returnDate;
    this.reason = props.reason;
    this.saleId = props.saleId;
    this.status = props.status ?? ReturnStatus.COMPLETED;
    this.subtotal = props.subtotal;
    this.total = props.total;
    this.lines = props.lines ?? [];
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<ReturnProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Return {
    if (!props.reason?.trim()) {
      throw new Error('El motivo de la devolución es requerido');
    }

    if (!props.lines?.length) {
      throw new Error('La devolución debe tener al menos una línea');
    }

    return new Return(props);
  }

  static reconstitute(props: ReturnProps): Return {
    return new Return(props);
  }

  cancel(): void {
    this.status = ReturnStatus.CANCELLED;
  }
}
