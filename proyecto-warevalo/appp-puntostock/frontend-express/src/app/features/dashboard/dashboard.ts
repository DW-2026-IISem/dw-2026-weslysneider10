import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Client } from '../../core/models/client.model';
import { Product } from '../../core/models/product.model';
import { ProductApi } from '../products/product-api';
import { SaleApi } from '../sales/sale-api';

interface BackendSale {
  id: number;
  clientId: number;
  branchId: number;
  fecha: string | Date;
  subtotal: number | string;
  impuestos: number | string;
  total: number | string;
  estado: 'completed' | 'cancelled';
  createdAt?: string | Date;
}

interface InventoryRecord {
  id: number;
  branchId: number;
  productId: number;
  quantity: number;
  minStock: number;
}

interface LowStockProduct extends InventoryRecord {
  productName: string;
}

interface DashboardData {
  clients: Client[];
  types: unknown[];
  inventories: InventoryRecord[];
  products: Product[];
  sales: BackendSale[];
}

type Money = number | string | null | undefined;

function toNumber(value: Money): number {
  if (value === null || value === undefined) {
    return 0;
  }

  return typeof value === 'number'
    ? value
    : Number.parseFloat(value) || 0;
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
    TagModule,
  ],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly productApi = inject(ProductApi);
  private readonly saleApi = inject(SaleApi);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly clients = signal<Client[]>([]);
  readonly products = signal<Product[]>([]);
  readonly sales = signal<BackendSale[]>([]);
  readonly inventories = signal<InventoryRecord[]>([]);
  readonly typeCount = signal(0);

  readonly lowStock = computed<LowStockProduct[]>(() => {
    const products = this.products();

    return this.inventories().map((inventory) => {
      const product = products.find(
        (item) => item.id === inventory.productId,
      );

      return {
        ...inventory,
        productName: product?.name ?? `Producto #${inventory.productId}`,
      };
    });
  });

  readonly revenue = computed(() =>
    this.sales()
      .filter((sale) => sale.estado === 'completed')
      .reduce((sum, sale) => sum + toNumber(sale.total), 0),
  );

  readonly completedSales = computed(() =>
    this.sales().filter((sale) => sale.estado === 'completed').length,
  );

  readonly latestSales = computed(() =>
    [...this.sales()]
      .sort(
        (a, b) =>
          new Date(b.fecha ?? b.createdAt ?? 0).getTime() -
          new Date(a.fecha ?? a.createdAt ?? 0).getTime(),
      )
      .slice(0, 5),
  );

  ngOnInit(): void {
    forkJoin({
      clients: this.http
        .get<{ clients: Client[] }>(`${environment.apiUrl}/clientes`)
        .pipe(
          catchError(() => {
            this.error.set('No fue posible cargar los clientes.');
            return of({ clients: [] as Client[] });
          }),
        ),

      types: this.http
        .get<{ productTypes: unknown[] }>(
          `${environment.apiUrl}/tipos-producto`,
        )
        .pipe(
          catchError(() => {
            this.error.set('No fue posible cargar los tipos de producto.');
            return of({ productTypes: [] as unknown[] });
          }),
        ),

      inventories: this.http
        .get<{ inventories: InventoryRecord[] }>(
          `${environment.apiUrl}/inventarios/low-stock`,
        )
        .pipe(
          catchError(() => {
            this.error.set('No fue posible cargar los productos con stock bajo. Verifica los permisos de inventario.');
            return of({ inventories: [] as InventoryRecord[] });
          }),
        ),

      products: this.productApi.list().pipe(
        catchError(() => {
          this.error.set('No fue posible cargar los productos.');
          return of([] as Product[]);
        }),
      ),

      sales: this.saleApi.list().pipe(
        catchError(() => {
          this.error.set('No fue posible cargar las ventas.');
          return of([] as BackendSale[]);
        }),
      ),
    }).subscribe({
      next: ({ clients, types, inventories, products, sales }) => {
        this.clients.set(clients.clients ?? []);
        this.typeCount.set(types.productTypes?.length ?? 0);
        this.inventories.set(inventories.inventories ?? []);
        this.products.set(products);
        this.sales.set(sales as unknown as BackendSale[]);
        this.loading.set(false);
      },

      error: () => {
        this.error.set('No fue posible cargar el Dashboard.');
        this.loading.set(false);
      },
    });
  }

  statusLabel(status: string): string {
    return status === 'completed'
      ? 'Completada'
      : status === 'cancelled'
        ? 'Cancelada'
        : status;
  }

  statusSeverity(
    status: string,
  ): 'success' | 'danger' | 'secondary' {
    return status === 'completed'
      ? 'success'
      : status === 'cancelled'
        ? 'danger'
        : 'secondary';
  }
}
