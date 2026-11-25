import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import type { Inventory } from '../../../core/models/inventory.model';
import type { Branch } from '../../../core/models/branch.model';
import type { Product } from '../../../core/models/product.model';
import { InventoryApi } from '../inventory-api';
import { BranchApi } from '../../branches/branch-api';
import { ProductApi } from '../../products/product-api';
import { NotificationService } from '../../../core/services/notification.service';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { toApiMessage } from '../../../core/utils/api-error';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [DatePipe, FormsModule, ButtonModule, InputTextModule, TableModule, TagModule, PageHeader],
  templateUrl: './inventory-list.html',
})
export class InventoryList {
  private readonly api = inject(InventoryApi);
  private readonly branchesApi = inject(BranchApi);
  private readonly productsApi = inject(ProductApi);
  private readonly notifications = inject(NotificationService);

  readonly rows = signal<Inventory[]>([]);
  readonly branches = signal<Branch[]>([]);
  readonly products = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly search = signal('');
  readonly lowOnly = signal(false);

  branchId = '';

  readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    return this.rows().filter(row => {
      const branch = this.branchName(row.branchId).toLowerCase();
      const product = this.productName(row.productId).toLowerCase();
      const matchesSearch = !q || `${row.id} ${branch} ${product}`.toLowerCase().includes(q);
      const matchesLow = !this.lowOnly() || row.quantity <= row.minStock;
      return matchesSearch && matchesLow;
    });
  });

  readonly lowCount = computed(() =>
    this.rows().filter(row => row.quantity <= row.minStock).length,
  );

  constructor() {
    this.branchesApi.list().subscribe({
      next: rows => this.branches.set(rows),
      error: (e: unknown) => this.notifications.error(`No se pudieron cargar las sucursales. ${toApiMessage(e)}`),
    });
    this.productsApi.list().subscribe({
      next: rows => this.products.set(rows),
      error: (e: unknown) => this.notifications.error(`No se pudieron cargar los productos. ${toApiMessage(e)}`),
    });
    this.load();
  }

  load(): void {
    this.loading.set(true);
    const id = this.branchId ? Number(this.branchId) : undefined;
    const request = this.lowOnly() ? this.api.lowStock(id) : this.api.list({branchId: id});

    request.subscribe({
      next: rows => this.rows.set(rows),
      error: (e: unknown) => {
        this.notifications.error(`No se pudo cargar el inventario. ${toApiMessage(e)}`);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  branchName(id: number): string {
    return this.branches().find(row => row.id === id)?.name ?? `Sucursal #${id}`;
  }

  productName(id: number): string {
    return this.products().find(row => row.id === id)?.name ?? `Producto #${id}`;
  }

  severity(row: Inventory): 'danger' | 'warn' | 'success' {
    if (row.quantity === 0) return 'danger';
    return row.quantity <= row.minStock ? 'warn' : 'success';
  }
}
