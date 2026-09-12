import { Status } from '../../../../../common/enums/status.enum';
import { isValidNit } from '../validators/supplier-nit.validator';
import { isValidEmail } from '../validators/supplier-email.validator';
import { isValidPhone } from '../validators/supplier-phone.validator';

export interface SupplierProps {
  id?: number;
  nit: string;
  businessName: string;
  contactName?: string;
  phone?: string;
  email?: string;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Supplier {
  id?: number;
  nit: string;
  businessName: string;
  contactName?: string;
  phone?: string;
  email?: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: SupplierProps) {
    this.id = props.id;
    this.nit = props.nit;
    this.businessName = props.businessName;
    this.contactName = props.contactName;
    this.phone = props.phone;
    this.email = props.email;
    this.status = props.status ?? Status.ACTIVE;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<SupplierProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Supplier {
    if (!props.nit?.trim()) {
      throw new Error('El NIT del proveedor es requerido');
    }

    if (!isValidNit(props.nit)) {
      throw new Error('El NIT del proveedor no es válido');
    }

    if (!props.businessName?.trim()) {
      throw new Error('La razón social del proveedor es requerida');
    }

    if (props.email && !isValidEmail(props.email)) {
      throw new Error('El email del proveedor no es válido');
    }

    if (props.phone && !isValidPhone(props.phone)) {
      throw new Error('El teléfono del proveedor no es válido');
    }

    return new Supplier(props);
  }

  static reconstitute(props: SupplierProps): Supplier {
    return new Supplier(props);
  }

  update(
    props: Partial<
      Omit<SupplierProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>
    >,
  ): void {
    if (props.nit !== undefined) {
      if (!props.nit.trim() || !isValidNit(props.nit)) {
        throw new Error('El NIT del proveedor no es válido');
      }
      this.nit = props.nit;
    }

    if (props.businessName !== undefined) {
      if (!props.businessName.trim()) {
        throw new Error('La razón social del proveedor es requerida');
      }
      this.businessName = props.businessName;
    }

    if (props.contactName !== undefined) {
      this.contactName = props.contactName;
    }

    if (props.phone !== undefined) {
      if (props.phone && !isValidPhone(props.phone)) {
        throw new Error('El teléfono del proveedor no es válido');
      }
      this.phone = props.phone;
    }

    if (props.email !== undefined) {
      if (props.email && !isValidEmail(props.email)) {
        throw new Error('El email del proveedor no es válido');
      }
      this.email = props.email;
    }
  }

  deactivate(): void {
    this.status = Status.INACTIVE;
  }
}
