import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { environment } from '../../../../environments/environment';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { Branch } from '../../../core/models/branch.model';
import { Client } from '../../../core/models/client.model';
import { Sale } from '../../../core/models/sale.model';
import { NotificationService } from '../../../core/services/notification.service';
import { toApiMessage } from '../../../core/utils/api-error';
import { SaleApi } from '../sale-api';

/**
 * Detalle de una venta (ruta /ventas/:id).
 * El :id llega como input gracias a withComponentInputBinding().
 */
@Component({
  selector: 'app-sale-detail',
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
  templateUrl: './sale-detail.html',
})
export class SaleDetail {
  private readonly http = inject(HttpClient);
  private readonly saleApi = inject(SaleApi);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);

  /** Parámetro :id de la ruta. */
  readonly id = input.required<string>();

  readonly sale = signal<Sale | null>(null);
  readonly clientName = signal('');
  readonly branchName = signal('');
  readonly loading = signal(true);
  readonly cancelling = signal(false);
  readonly error = signal('');

  readonly unidades = computed(() =>
    (this.sale()?.items ?? []).reduce((sum, item) => sum + Number(item.cantidad), 0),
  );

  constructor() {
    effect(() => this.load(Number(this.id())));
  }

  private load(id: number): void {
    this.loading.set(true);
    this.error.set('');

    this.saleApi.get(id).subscribe({
      next: (sale) => {
        this.sale.set(sale);
        this.loading.set(false);
        this.loadNames(sale);
      },
      error: (error: unknown) => {
        this.error.set(toApiMessage(error));
        this.loading.set(false);
      },
    });
  }

  /** Nombres de cliente y sucursal; si no hay permiso para leerlos, se muestra el id. */
  private loadNames(sale: Sale): void {
    this.clientName.set(`Cliente #${sale.clientId}`);
    this.branchName.set(`Sucursal #${sale.branchId}`);

    forkJoin({
      client: this.http
        .get<{ client: Client }>(`${environment.apiUrl}/clientes/${sale.clientId}`)
        .pipe(catchError(() => of(null))),
      branch: this.http
        .get<{ branch: Branch }>(`${environment.apiUrl}/sucursales/${sale.branchId}`)
        .pipe(catchError(() => of(null))),
    }).subscribe(({ client, branch }) => {
      if (client?.client) this.clientName.set(client.client.name);
      if (branch?.branch) this.branchName.set(branch.branch.name);
    });
  }

  cancelSale(): void {
    const sale = this.sale();
    if (!sale || sale.estado === 'cancelled') return;

    if (!window.confirm(`¿Cancelar la venta #${sale.id}? Se repondrá el stock en la sucursal y se anularán sus pagos.`)) {
      return;
    }

    this.cancelling.set(true);
    this.saleApi.cancel(sale.id).subscribe({
      next: (updated) => {
        this.sale.set(updated);
        this.cancelling.set(false);
        this.notification.success(`Venta #${sale.id} cancelada: stock repuesto y pagos anulados.`);
      },
      error: (error: unknown) => {
        this.notification.error(toApiMessage(error));
        this.cancelling.set(false);
      },
    });
  }

  back(): void {
    this.router.navigate(['/ventas']);
  }
}
