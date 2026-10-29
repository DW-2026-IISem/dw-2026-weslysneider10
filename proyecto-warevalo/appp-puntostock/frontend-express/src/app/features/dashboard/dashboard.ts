import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { environment } from '../../../environments/environment';
import { Client } from '../../core/models/client.model';
import { Product } from '../../core/models/product.model';
import { Sale } from '../../core/models/sale.model';
import { HttpClient } from '@angular/common/http';
import { ProductApi } from '../products/product-api';
import { SaleApi } from '../sales/sale-api';

type Money = number | string | null | undefined;

export function toNumber(value: Money): number {
  if (value === null || value === undefined) {
    return 0;
  }
  return typeof value === 'number' ? value : Number.parseFloat(value) || 0;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    RouterLink,
    ButtonModule,
    CardModule,
    MessageModule,
    SkeletonModule,
    TableModule,
    TagModule
  ],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  private readonly http = inject(HttpClient);
  private readonly productApi = inject(ProductApi);
  private readonly saleApi = inject(SaleApi);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly clients = signal<Client[]>([]);
  readonly products = signal<Product[]>([]);
  readonly sales = signal<Sale[]>([]);
  readonly typeCount = signal(0);

  readonly lowStock = computed(() =>
    this.products().filter(product =>
      Number(product.quantity) <= Number(product.min_stock)
    )
  );

  readonly revenue = computed(() =>
    this.sales().reduce((sum, sale) => sum + toNumber(sale.total), 0)
  );

  readonly latestSales = computed(() =>
    [...this.sales()]
      .sort((a, b) =>
        new Date(b.date ?? b.createdAt ?? 0).getTime() -
        new Date(a.date ?? a.createdAt ?? 0).getTime()
      )
      .slice(0, 5)
  );

  ngOnInit(): void {
    forkJoin({
      clients: this.http.get<{ clients: Client[] } | Client[]>(
        `${environment.apiUrl}/clientes`
      ),
      types: this.http.get<{ product_types: unknown[] } | unknown[]>(
        `${environment.apiUrl}/tipos-producto`
      ),
      products: this.productApi.list(),
      sales: this.saleApi.list()
    }).subscribe({
      next: ({ clients, types, products, sales }) => {
        this.clients.set(Array.isArray(clients) ? clients : clients.clients);
        this.typeCount.set(Array.isArray(types) ? types.length : types.product_types.length);
        this.products.set(products);
        this.sales.set(sales);
        this.loading.set(false);
      },
      error: response => {
        this.error.set(response?.error?.message ?? 'No fue posible cargar el dashboard.');
        this.loading.set(false);
      }
    });
  }

  statusLabel(status: string): string {
    return status === 'completed' || status === 'active'
      ? 'Completada'
      : status;
  }
}
