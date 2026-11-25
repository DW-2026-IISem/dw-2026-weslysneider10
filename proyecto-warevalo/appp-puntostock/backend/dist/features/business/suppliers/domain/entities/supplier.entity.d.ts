import { Status } from '../../../../../common/enums/status.enum';
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
export declare class Supplier {
    id?: number;
    nit: string;
    businessName: string;
    contactName?: string;
    phone?: string;
    email?: string;
    status: Status;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<SupplierProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Supplier;
    static reconstitute(props: SupplierProps): Supplier;
    update(props: Partial<Omit<SupplierProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>>): void;
    deactivate(): void;
}
