export interface ReturnLineInput {
  quantity: number;
  unitPrice: number;
}

export interface ReturnTotals {
  subtotal: number;
  total: number;
}

export class ReturnCalculatorDomainService {
  calculateSubtotal(lines: ReturnLineInput[]): number {
    return lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
  }

  calculateTotals(lines: ReturnLineInput[]): ReturnTotals {
    const subtotal = this.calculateSubtotal(lines);

    return { subtotal, total: subtotal };
  }
}
