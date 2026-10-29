import { Component, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import type { ProductType, ProductTypePayload } from '../../../core/models/product-type.model';
import { ProductTypeApi } from '../product-type-api';
import { NotificationService } from '../../../core/services/notification.service';
import { filterRows } from '../../../core/utils/filter-rows';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { StatusTag } from '../../../shared/ui/status-tag/status-tag';
import { ProductTypeForm } from '../product-type-form/product-type-form';

@Component({
  selector: 'app-product-type-list',
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    TableModule,
    TagModule,
    PageHeader,
    StatusTag,
    ProductTypeForm,
  ],
  templateUrl: './product-type-list.html',
})
export class ProductTypeList {
  private readonly api = inject(ProductTypeApi);
  private readonly notifications = inject(NotificationService);

  readonly rows = signal<ProductType[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly filter = signal('');
  readonly dialogVisible = signal(false);
  readonly editing = signal<ProductType | null>(null);
  readonly resetKey = signal(0);

  readonly visibleRows = computed(() =>
    filterRows(this.rows(), this.filter(), row => [
      row.name,
      row.description,
    ]),
  );

  readonly title = computed(() =>
    this.editing() ? 'Editar tipo de producto' : 'Nuevo tipo de producto',
  );

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);

    this.api.list()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: rows => this.rows.set(rows),
        error: () => this.notifications.error(
          'No fue posible cargar los tipos de producto. Verifica el backend y el contrato de la API.',
        ),
      });
  }

  openCreate(): void {
    this.editing.set(null);
    this.resetKey.update(value => value + 1);
    this.dialogVisible.set(true);
  }

  openEdit(row: ProductType): void {
    this.editing.set(row);
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    if (this.saving()) return;

    this.dialogVisible.set(false);
    this.editing.set(null);
  }

  save(payload: ProductTypePayload): void {
    if (this.saving()) return;

    const current = this.editing();
    this.saving.set(true);

    const request = current?.id
      ? this.api.update(current.id, payload)
      : this.api.create(payload);

    request
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          this.dialogVisible.set(false);
          this.editing.set(null);
          this.notifications.success(
            current
              ? 'Tipo de producto actualizado.'
              : 'Tipo de producto creado.',
          );
          this.load();
        },
        error: () => this.notifications.error(
          'No fue posible guardar. Revisa los datos y la respuesta del backend.',
        ),
      });
  }

  deactivate(row: ProductType): void {
    if (!row.id) {
      this.notifications.error('El tipo de producto no tiene un identificador válido.');
      return;
    }

    const accepted = window.confirm(
      `¿Deseas desactivar el tipo de producto "${row.name}"?`,
    );

    if (!accepted) return;

    this.api.deactivate(row.id).subscribe({
      next: () => {
        this.notifications.success('Tipo de producto desactivado.');
        this.load();
      },
      error: () => this.notifications.error(
        'No fue posible desactivar el tipo de producto.',
      ),
    });
  }
}
