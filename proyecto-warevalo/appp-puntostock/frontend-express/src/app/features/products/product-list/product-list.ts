import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import type { Product, ProductPayload } from '../../../core/models/product.model';
import type { ProductType } from '../../../core/models/product-type.model';
import { NotificationService } from '../../../core/services/notification.service';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { ProductTypeApi } from '../../product-types/product-type-api';
import { ProductApi } from '../product-api';
import { ProductForm } from '../product-form/product-form';
import { toApiMessage } from '../../../core/utils/api-error';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TableModule,
    TagModule,
    HasPermissionDirective,
    PageHeader,
    ProductForm,
  ],
  templateUrl: './product-list.html',
})
export class ProductList {
  private readonly api = inject(ProductApi);
  private readonly typesApi = inject(ProductTypeApi);
  private readonly notifications = inject(NotificationService);

  readonly rows = signal<Product[]>([]);
  readonly types = signal<ProductType[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly search = signal('');
  readonly dialogVisible = signal(false);
  readonly selectedProduct = signal<Product | null>(null);
  readonly formResetKey = signal(0);

  readonly typeName = computed(() => {
    const map = new Map<number, string>(
      this.types()
        .filter((type) => type.id !== undefined)
        .map((type) => [type.id as number, type.name]),
    );

    return (id: number) => map.get(id) ?? `Tipo #${id}`;
  });

  readonly filteredRows = computed(() => {
    const query = this.search().trim().toLocaleLowerCase();

    if (!query) {
      return this.rows();
    }

    return this.rows().filter((product) =>
      [product.sku, product.name, this.typeName()(product.productTypeId)].some((value) =>
        value.toLocaleLowerCase().includes(query),
      ),
    );
  });

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    // Cargar productos independientemente de los tipos.
    this.api.list()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: products => this.rows.set(products),
        error: (error: unknown) => {
          const message = this.getErrorMessage(error);
          this.error.set(message);
          this.notifications.error(message);
        },
      });

    // Los tipos son información complementaria.
    // Si falla su consulta, los productos siguen mostrándose.
    this.typesApi.list()
      .pipe(catchError(() => of([] as ProductType[])))
      .subscribe({
        next: types => {
          this.types.set(types.filter(type => type.status === 'active'));
        },
      });
  }

  openCreate(): void {
    this.selectedProduct.set(null);
    this.formResetKey.update((value) => value + 1);
    this.dialogVisible.set(true);
  }

  openEdit(product: Product): void {
    this.selectedProduct.set(product);
    this.formResetKey.update((value) => value + 1);
    this.dialogVisible.set(true);
  }

  save(payload: ProductPayload): void {
    this.saving.set(true);

    const current = this.selectedProduct();
    const request = current ? this.api.update(current.id, payload) : this.api.create(payload);

    request.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        this.dialogVisible.set(false);
        this.notifications.success(
          current ? 'Producto actualizado correctamente.' : 'Producto creado correctamente.',
        );
        this.load();
      },
      error: (error: unknown) => {
        this.notifications.error(this.getErrorMessage(error));
      },
    });
  }

  deactivate(product: Product): void {
    if (product.status !== 'active') {
      return;
    }

    if (!window.confirm(`¿Deseas desactivar el producto "${product.name}"?`)) {
      return;
    }

    this.api.deactivate(product.id).subscribe({
      next: () => {
        this.notifications.success('Producto desactivado correctamente.');
        this.load();
      },
      error: (error: unknown) => {
        this.notifications.error(this.getErrorMessage(error));
      },
    });
  }

  private getErrorMessage(error: unknown): string {
    return toApiMessage(error);
  }

}
