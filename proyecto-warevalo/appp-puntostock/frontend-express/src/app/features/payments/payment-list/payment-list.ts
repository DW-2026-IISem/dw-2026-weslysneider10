import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import type { Payment, CreatePayment, PaymentMethod } from '../../../core/models/payment.model';
import { PaymentApi } from '../payment-api';
import { NotificationService } from '../../../core/services/notification.service';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { PageHeader } from '../../../shared/ui/page-header/page-header';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, FormsModule, ButtonModule, DialogModule, InputTextModule, TableModule, TagModule, HasPermissionDirective, PageHeader],
  templateUrl: './payment-list.html',
})
export class PaymentList {
  private readonly api = inject(PaymentApi);
  private readonly notifications = inject(NotificationService);

  readonly rows = signal<Payment[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly search = signal('');
  readonly visible = signal(false);

  saleId = '';
  fecha = new Date().toISOString().slice(0, 16);
  metodo: PaymentMethod = 'cash';
  monto = '';

  readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    return this.rows().filter(row =>
      [row.id, row.saleId, row.metodo, row.estado, row.monto].some(value =>
        String(value).toLowerCase().includes(q),
      ),
    );
  });

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.api.list().subscribe({
      next: rows => this.rows.set(rows),
      error: () => {
        this.notifications.error('No se pudieron cargar los pagos.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  openCreate(): void {
    this.saleId = '';
    this.fecha = new Date().toISOString().slice(0, 16);
    this.metodo = 'cash';
    this.monto = '';
    this.visible.set(true);
  }

  save(): void {
    const saleId = Number(this.saleId);
    const monto = Number(this.monto);

    if (!Number.isInteger(saleId) || saleId <= 0 || !Number.isFinite(monto) || monto <= 0) {
      this.notifications.warn('Ingresa un ID de venta y un monto válido.');
      return;
    }

    const payload: CreatePayment = {
      saleId,
      fecha: this.fecha ? new Date(this.fecha).toISOString() : new Date().toISOString(),
      metodo: this.metodo,
      monto,
      estado: 'completed',
    };

    this.saving.set(true);
    this.api.create(payload).subscribe({
      next: () => {
        this.notifications.success('Pago registrado correctamente.');
        this.visible.set(false);
        this.load();
        this.saving.set(false);
      },
      error: () => {
        this.notifications.error('No se pudo registrar el pago. Verifica que la venta exista.');
        this.saving.set(false);
      },
    });
  }

  cancelPayment(row: Payment): void {
    if (!row.id || row.estado === 'cancelled') return;
    if (!window.confirm(`¿Cancelar el pago #${row.id}?`)) return;

    this.api.cancel(row.id).subscribe({
      next: () => {
        this.notifications.success('Pago cancelado.');
        this.load();
      },
      error: () => this.notifications.error('No se pudo cancelar el pago.'),
    });
  }
}
