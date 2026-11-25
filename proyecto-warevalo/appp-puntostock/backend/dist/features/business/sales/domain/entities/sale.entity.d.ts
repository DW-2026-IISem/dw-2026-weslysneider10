import { Status } from '../../../../../common/enums/status.enum';
export interface SaleItemProps {
    id?: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    total: number;
    saleId?: number;
}
export declare class SaleItem {
    id?: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    total: number;
    saleId?: number;
    private constructor();
    static create(props: Omit<SaleItemProps, 'id' | 'total' | 'saleId'>): SaleItem;
    static reconstitute(props: SaleItemProps): SaleItem;
}
export interface SaleProps {
    id?: number;
    saleDate: Date;
    subtotal: number;
    tax: number;
    discounts: number;
    total: number;
    status?: Status;
    clientId: number;
    items?: SaleItem[];
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Sale {
    id?: number;
    saleDate: Date;
    subtotal: number;
    tax: number;
    discounts: number;
    total: number;
    status: Status;
    clientId: number;
    items: SaleItem[];
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<SaleProps, 'id' | 'status' | 'subtotal' | 'total' | 'createdAt' | 'updatedAt'> & {
        subtotal: number;
        total: number;
    }): Sale;
    static reconstitute(props: SaleProps): Sale;
    cancel(): void;
}
