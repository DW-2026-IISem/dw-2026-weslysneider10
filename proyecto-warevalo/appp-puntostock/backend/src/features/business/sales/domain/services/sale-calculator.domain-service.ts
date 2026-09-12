import { Injectable } from '@nestjs/common';

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

@Injectable()
export class SaleCalculatorDomainService {
  calculate(
    props: SaleCalculatorProps,
  ): SaleCalculatorResult {
    const subtotal = props.items.reduce(
      (sum, item) =>
        sum + item.quantity * item.unitPrice,
      0,
    );

    const tax = props.tax ?? 0;
    const discounts = props.discounts ?? 0;
    const total = subtotal + tax - discounts;

    return {
      subtotal,
      tax,
      discounts,
      total,
    };
  }
}
