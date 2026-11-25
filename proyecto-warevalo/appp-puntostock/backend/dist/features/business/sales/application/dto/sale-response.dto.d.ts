import { Status } from '../../../../../common/enums/status.enum';
export declare class SaleItemResponseDto {
    id: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    total: number;
}
export declare class SaleResponseDto {
    id: number;
    saleDate: Date;
    subtotal: number;
    tax: number;
    discounts: number;
    total: number;
    status: Status;
    clientId: number;
    items: SaleItemResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}
