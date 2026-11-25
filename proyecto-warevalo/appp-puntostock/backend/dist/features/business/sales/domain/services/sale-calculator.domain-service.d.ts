interface SaleCalculatorItem {
    quantity: number;
    unitPrice: number;
}
interface SaleCalculatorProps {
    items: SaleCalculatorItem[];
    tax?: number;
    discounts?: number;
}
interface SaleCalculatorResult {
    subtotal: number;
    tax: number;
    discounts: number;
    total: number;
}
export declare class SaleCalculatorDomainService {
    calculate(props: SaleCalculatorProps): SaleCalculatorResult;
}
export {};
