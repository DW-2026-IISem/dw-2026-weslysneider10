export interface ReturnLineInput {
    quantity: number;
    unitPrice: number;
}
export interface ReturnTotals {
    subtotal: number;
    total: number;
}
export declare class ReturnCalculatorDomainService {
    calculateSubtotal(lines: ReturnLineInput[]): number;
    calculateTotals(lines: ReturnLineInput[]): ReturnTotals;
}
