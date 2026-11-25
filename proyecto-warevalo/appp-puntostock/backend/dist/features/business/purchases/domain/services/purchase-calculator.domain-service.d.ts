export interface PurchaseItemInput {
    quantityOrdered: number;
    unitCost: number;
}
export interface PurchaseTotals {
    subtotal: number;
    tax: number;
    total: number;
}
export declare class PurchaseCalculatorDomainService {
    calculateSubtotal(items: PurchaseItemInput[]): number;
    calculateTotals(items: PurchaseItemInput[], tax?: number): PurchaseTotals;
}
