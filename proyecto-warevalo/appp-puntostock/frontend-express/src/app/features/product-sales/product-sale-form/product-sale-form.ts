import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';

import { ProductSale, ProductSalePayload } from '../../../core/models/product-sale.model';
import { Sale } from '../../../core/models/sale.model';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-sale-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputNumberModule,
    SelectModule
  ],
  templateUrl: './product-sale-form.html'
})
export class ProductSaleForm {
  private readonly fb = inject(FormBuilder);

  readonly line = input<ProductSale | null>(null);
  readonly sales = input<Sale[]>([]);
  readonly products = input<Product[]>([]);
  readonly saved = output<ProductSalePayload>();
  readonly cancelled = output<void>();

  readonly form = this.fb.group({
    sale_id: [null as number | null, Validators.required],
    product_id: [null as number | null, Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    status: ['active' as 'active' | 'inactive', Validators.required]
  });

  constructor() {
    effect(() => {
      const current = this.line();

      this.form.reset({
        sale_id: current?.sale_id ?? null,
        product_id: current?.product_id ?? null,
        quantity: current?.quantity ?? 1,
        status: current?.status ?? 'active'
      });

      if (current) {
        this.form.controls.sale_id.disable();
        this.form.controls.product_id.disable();
        this.form.controls.status.disable();
      } else {
        this.form.controls.sale_id.enable();
        this.form.controls.product_id.enable();
        this.form.controls.status.enable();
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (value.sale_id === null || value.product_id === null) {
      return;
    }

    this.saved.emit({
      sale_id: value.sale_id,
      product_id: value.product_id,
      quantity: Number(value.quantity),
      ...(this.line() ? {} : { status: value.status ?? undefined })
    });
  }
}
