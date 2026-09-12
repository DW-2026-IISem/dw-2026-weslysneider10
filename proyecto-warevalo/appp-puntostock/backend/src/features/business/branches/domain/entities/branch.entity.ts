import { Status } from '../../../../../common/enums/status.enum';

export interface BranchProps {
  id?: number;
  name: string;
  description?: string;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Branch {
  id?: number;
  name: string;
  description?: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: BranchProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.status = props.status ?? Status.ACTIVE;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<BranchProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Branch {
    if (!props.name?.trim()) {
      throw new Error('El nombre de la sucursal es requerido');
    }

    return new Branch(props);
  }

  static reconstitute(props: BranchProps): Branch {
    return new Branch(props);
  }

  update(
    props: Partial<
      Omit<BranchProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>
    >,
  ): void {
    if (props.name !== undefined) {
      if (!props.name.trim()) {
        throw new Error('El nombre de la sucursal es requerido');
      }
      this.name = props.name;
    }

    if (props.description !== undefined) {
      this.description = props.description;
    }
  }

  deactivate(): void {
    this.status = Status.INACTIVE;
  }
}
