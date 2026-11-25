import { Component, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import type { RecordStatus } from '../../../core/models/common.model';
import type { Product, ProductPayload } from '../../../core/models/product.model';
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
    sku: ['', [Validators.required, Validators.maxLength(60)]],
    name: ['', [Validators.required, Validators.maxLength(120)]],
    description: ['', [Validators.maxLength(255)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    productTypeId: [null as number | null, Validators.required],
    status: ['active' as RecordStatus, Validators.required],
  });

  constructor() {
    effect(() => {
      const current = this.product();
      this.form.reset({
        sku: current?.sku ?? '',
        name: current?.name ?? '',
        description: current?.description ?? '',
        price: Number(current?.price ?? 0),
        productTypeId: current?.productTypeId ?? null,
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
      value.productTypeId === null ||
      !this.productTypes().some(
        (type) => type.id === value.productTypeId && type.status === 'active',
      )
    ) {
      this.form.controls.productTypeId.markAsTouched();
      return;
    }

    this.saved.emit({
      sku: value.sku.trim(),
      name: value.name.trim(),
      description: value.description.trim() || null,
      price: Number(value.price),
      productTypeId: value.productTypeId,
      ...(this.product() ? {} : { status: value.status }),
    });
  }
}
