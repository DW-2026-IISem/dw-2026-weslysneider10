import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { environment } from '../../../../environments/environment';
import { Branch } from '../../../core/models/branch.model';
import { Client } from '../../../core/models/client.model';
import { Sale, SaleStatus } from '../../../core/models/sale.model';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { toApiMessage } from '../../../core/utils/api-error';
import { BranchApi } from '../../branches/branch-api';
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
    TagModule,
    HasPermissionDirective,
  ],
  templateUrl: './sale-list.html',
})
export class SaleList {
  private readonly http = inject(HttpClient);
  private readonly saleApi = inject(SaleApi);
  private readonly branchApi = inject(BranchApi);
  private readonly router = inject(Router);

  readonly rows = signal<Sale[]>([]);
  readonly clients = signal<Client[]>([]);
  readonly branches = signal<Branch[]>([]);
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

  readonly branchNames = computed(
    () => new Map(this.branches().map((branch) => [branch.id as number, branch.name])),
  );

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');

    // Clientes y sucursales solo aportan nombres: si el usuario no tiene
    // permiso para listarlos, se muestran los ids y las ventas siguen visibles.
    forkJoin({
      sales: this.saleApi.list(),
      clients: this.http
        .get<{ clients: Client[] }>(`${environment.apiUrl}/clientes`)
        .pipe(catchError(() => of({ clients: [] as Client[] }))),
      branches: this.branchApi.list().pipe(catchError(() => of([] as Branch[]))),
    }).subscribe({
      next: ({ sales, clients, branches }) => {
        this.rows.set(sales);
        this.clients.set(clients.clients ?? []);
        this.branches.set(branches);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.error.set(`No fue posible cargar las ventas. ${toApiMessage(error)}`);
        this.loading.set(false);
      },
    });
  }

  newSale(): void {
    this.router.navigate(['/ventas/nueva']);
  }

  clientName(clientId: number): string {
    return this.clientNames().get(clientId) ?? `Cliente #${clientId}`;
  }

  branchName(branchId: number): string {
    return this.branchNames().get(branchId) ?? `Sucursal #${branchId}`;
  }

  statusLabel(estado: SaleStatus): string {
    return estado === 'completed' ? 'Completada' : 'Cancelada';
  }

  statusSeverity(estado: SaleStatus): 'success' | 'danger' {
    return estado === 'completed' ? 'success' : 'danger';
  }

  viewSale(sale: Sale): void {
    this.router.navigate(['/ventas', sale.id]);
  }
}
