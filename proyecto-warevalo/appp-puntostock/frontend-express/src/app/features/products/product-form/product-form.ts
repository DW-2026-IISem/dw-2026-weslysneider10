import { Component, effect, inject, input, output } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import type { RecordStatus } from '../../../core/models/common.model';
import type {
  Product,
  ProductPayload,
} from '../../../core/models/product.model';
import type { ProductType } from '../../../core/models/product-type.model';

@Component({
  selector: 'app-product-form',
  host: { class: 'block' },
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    MessageModule,
    SelectModule,
  ],
  templateUrl: './product-form.html',
})
export class ProductForm {
  readonly product = input<Product | null>(null);
  readonly productTypes = input<ProductType[]>([]);
  readonly saving = input(false);

  readonly saved = output<ProductPayload>();
  readonly cancelled = output<void>();

  private readonly fb = inject(NonNullableFormBuilder);

  readonly statusOptions = [
    { label: 'Activo', value: 'active' },
    { label: 'Inactivo', value: 'inactive' },
  ];

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    brand: ['', [Validators.required, Validators.maxLength(120)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    min_stock: [0, [Validators.required, Validators.min(0)]],
    quantity: [0, [Validators.required, Validators.min(0)]],
    product_type_id: [null as number | null, Validators.required],
    status: ['active' as RecordStatus, Validators.required],
  });

  constructor() {
    effect(() => {
      const current = this.product();
      this.form.reset({
        name: current?.name ?? '',
        brand: current?.brand ?? '',
        price: Number(current?.price ?? 0),
        min_stock: current?.min_stock ?? 0,
        quantity: current?.quantity ?? 0,
        product_type_id: current?.product_type_id ?? null,
        status: current?.status ?? 'active',
      });

      if (current) {
        this.form.controls.status.disable();
      } else {
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

    if (
      value.product_type_id === null ||
      !this.productTypes().some(
        (type) => type.id === value.product_type_id && type.status === 'active',
      )
    ) {
      this.form.controls.product_type_id.markAsTouched();
      return;
    }

    this.saved.emit({
      name: value.name.trim(),
      brand: value.brand.trim(),
      price: Number(value.price),
      min_stock: Number(value.min_stock),
      quantity: Number(value.quantity),
      product_type_id: value.product_type_id,
      ...(this.product() ? {} : { status: value.status }),
    });
  }
}
