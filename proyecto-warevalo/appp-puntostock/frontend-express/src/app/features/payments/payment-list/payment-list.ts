import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, forkJoin, of } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import type { CreatePayment, Payment, PaymentMethod } from '../../../core/models/payment.model';
import type { Sale } from '../../../core/models/sale.model';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { NotificationService } from '../../../core/services/notification.service';
import { toApiMessage } from '../../../core/utils/api-error';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { SaleApi } from '../../sales/sale-api';
import { PaymentApi } from '../payment-api';

/** Venta con su estado de cobro (calculado con los pagos completed). */
interface SaleBalance {
  sale: Sale;
  total: number;
  pagado: number;
  saldo: number;
  label: string;
}

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    TableModule,
    TagModule,
    HasPermissionDirective,
    PageHeader,
  ],
  templateUrl: './payment-list.html',
})
export class PaymentList {
  private readonly api = inject(PaymentApi);
  private readonly saleApi = inject(SaleApi);
  private readonly notifications = inject(NotificationService);

  readonly rows = signal<Payment[]>([]);
  readonly sales = signal<Sale[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly search = signal('');
  readonly visible = signal(false);

  readonly saleId = signal<number | null>(null);
  fecha = this.nowLocal();
  metodo: PaymentMethod = 'cash';
  monto: number | null = null;

  readonly metodos = [
    { label: 'Efectivo', value: 'cash' },
    { label: 'Tarjeta', value: 'card' },
    { label: 'Transferencia', value: 'transfer' },
  ];

  /** Saldo de cada venta completada = total - suma de pagos completed. */
  readonly balances = computed<SaleBalance[]>(() => {
    const pagadoPorVenta = new Map<number, number>();
    for (const payment of this.rows()) {
      if (payment.estado !== 'completed') continue;
      pagadoPorVenta.set(
        payment.saleId,
        (pagadoPorVenta.get(payment.saleId) ?? 0) + Number(payment.monto),
      );
    }

    return this.sales()
      .filter((sale) => sale.estado === 'completed')
      .map((sale) => {
        const total = Number(sale.total);
        const pagado = pagadoPorVenta.get(sale.id) ?? 0;
        const saldo = Math.round((total - pagado) * 100) / 100;
        return {
          sale,
          total,
          pagado,
          saldo,
          label: `Venta #${sale.id} · saldo ${saldo.toLocaleString('es-CO')}`,
        };
      });
  });

  /** Ventas que aún tienen saldo pendiente (las únicas que admiten un pago nuevo). */
  readonly pendientes = computed(() => this.balances().filter((item) => item.saldo > 0));

  readonly selectedBalance = computed(() =>
    this.balances().find((item) => item.sale.id === this.saleId()),
  );

  readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    return this.rows().filter((row) =>
      [row.id, row.saleId, row.metodo, row.estado, row.monto].some((value) =>
        String(value).toLowerCase().includes(q),
      ),
    );
  });

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);

    forkJoin({
      payments: this.api.list(),
      // Las ventas solo sirven para el selector y el saldo: si no hay
      // permiso para listarlas, el historial de pagos sigue visible.
      sales: this.saleApi.list().pipe(catchError(() => of([] as Sale[]))),
    }).subscribe({
      next: ({ payments, sales }) => {
        this.rows.set(payments);
        this.sales.set(sales);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.notifications.error(`No se pudieron cargar los pagos. ${toApiMessage(error)}`);
        this.loading.set(false);
      },
    });
  }

  openCreate(): void {
    this.saleId.set(null);
    this.fecha = this.nowLocal();
    this.metodo = 'cash';
    this.monto = null;
    this.visible.set(true);
  }

  /** Al elegir la venta se propone como monto el saldo pendiente completo. */
  onSaleChange(saleId: number | null): void {
    this.saleId.set(saleId);
    this.monto = this.selectedBalance()?.saldo ?? null;
  }

  save(): void {
    const saleId = this.saleId();
    const balance = this.selectedBalance();
    const monto = Number(this.monto);

    if (!saleId || !balance) {
      this.notifications.warn('Selecciona la venta a la que corresponde el pago.');
      return;
    }

    if (!Number.isFinite(monto) || monto <= 0) {
      this.notifications.warn('El monto debe ser mayor que cero.');
      return;
    }

    if (monto > balance.saldo) {
      this.notifications.warn(
        `El monto supera el saldo pendiente de la venta (${balance.saldo.toLocaleString('es-CO')}).`,
      );
      return;
    }

    const payload: CreatePayment = {
      saleId,
      fecha: this.fecha ? new Date(this.fecha).toISOString() : undefined,
      metodo: this.metodo,
      monto,
    };

    this.saving.set(true);
    this.api.create(payload).subscribe({
      next: () => {
        this.notifications.success('Pago registrado correctamente.');
        this.visible.set(false);
        this.saving.set(false);
        this.load();
      },
      error: (error: unknown) => {
        this.notifications.error(toApiMessage(error));
        this.saving.set(false);
      },
    });
  }

  cancelPayment(row: Payment): void {
    if (row.estado === 'cancelled') return;
    if (!window.confirm(`¿Cancelar el pago #${row.id}? Su monto volverá al saldo de la venta.`)) return;

    this.api.cancel(row.id).subscribe({
      next: () => {
        this.notifications.success('Pago cancelado.');
        this.load();
      },
      error: (error: unknown) => this.notifications.error(toApiMessage(error)),
    });
  }

  metodoLabel(metodo: PaymentMethod): string {
    return this.metodos.find((m) => m.value === metodo)?.label ?? metodo;
  }

  /** Fecha/hora local en el formato de <input type="datetime-local">. */
  private nowLocal(): string {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  }
}
