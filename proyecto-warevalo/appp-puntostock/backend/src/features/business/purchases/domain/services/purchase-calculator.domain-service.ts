export interface PurchaseItemInput {
  quantityOrdered: number;
  unitCost: number;
}

export interface PurchaseTotals {
  subtotal: number;
  tax: number;
  total: number;
}

export class PurchaseCalculatorDomainService {
  calculateSubtotal(items: PurchaseItemInput[]): number {
    return items.reduce(
      (sum, item) => sum + item.quantityOrdered * item.unitCost,
      0,
    );
  }

  calculateTotals(items: PurchaseItemInput[], tax = 0): PurchaseTotals {
    const subtotal = this.calculateSubtotal(items);
    const total = subtotal + tax;

    return { subtotal, tax, total };
  }
}
