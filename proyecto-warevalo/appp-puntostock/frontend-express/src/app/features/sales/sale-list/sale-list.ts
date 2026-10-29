import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { environment } from '../../../../environments/environment';
import { Client } from '../../../core/models/client.model';
import { Sale } from '../../../core/models/sale.model';
import { NotificationService } from '../../../core/services/notification.service';
import { SaleApi } from '../sale-api';

@Component({
  selector: 'app-sale-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    ButtonModule,
    CardModule,
    MessageModule,
    TableModule,
    TagModule
  ],
  templateUrl: './sale-list.html'
})
export class SaleList {
  private readonly http = inject(HttpClient);
  private readonly saleApi = inject(SaleApi);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);

  readonly rows = signal<Sale[]>([]);
  readonly clients = signal<Client[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');

  readonly clientNames = computed(() => {
    const names = new Map<number, string>();
    for (const client of this.clients()) {
      if (client.id != null) {
        names.set(client.id, client.name);
      }
    }
    return names;
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');

    forkJoin({
      sales: this.saleApi.list(),
      clients: this.http.get<{ clients: Client[] } | Client[]>(
        `${environment.apiUrl}/clientes`
      )
    }).subscribe({
      next: ({ sales, clients }) => {
        this.rows.set(sales);
        this.clients.set(Array.isArray(clients) ? clients : clients.clients);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No fue posible cargar las ventas.');
        this.loading.set(false);
      }
    });
  }

  newSale(): void {
    this.router.navigate(['/ventas/nueva']);
  }

  clientName(clientId: number): string {
    return this.clientNames().get(clientId) ?? `Cliente #${clientId}`;
  }

  statusLabel(status: string): string {
    const value = status.toLowerCase();
    if (value === 'completed' || value === 'active') return 'Completada';
    if (value === 'cancelled' || value === 'inactive') return 'Cancelada';
    return status;
  }

  statusSeverity(status: string): 'success' | 'danger' | 'secondary' {
    const value = status.toLowerCase();
    if (value === 'completed' || value === 'active') return 'success';
    if (value === 'cancelled' || value === 'inactive') return 'danger';
    return 'secondary';
  }

  viewSale(sale: Sale): void {
    this.notification.info(
      `Venta #${sale.id}. La pantalla de detalle se desarrollará en ISS-07.`
    );
  }
}
