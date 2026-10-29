import { Component, computed, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';

import type { Client, CreateClient } from '../../../core/models/client.model';
import { ClientApi } from '../../../core/services/client-api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { filterRows } from '../../../core/utils/filter-rows';
import { toApiMessage } from '../../../core/utils/api-error';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { StatusTag } from '../../../shared/ui/status-tag/status-tag';
import { ClientForm } from '../client-form/client-form';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    TableModule,
    PageHeader,
    EmptyState,
    StatusTag,
    ClientForm,
  ],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList {
  private readonly api = inject(ClientApi);
  private readonly notifications = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  readonly clients = signal<Client[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly search = signal('');
  readonly dialogVisible = signal(false);
  readonly selectedClient = signal<Client | null>(null);
  readonly resetKey = signal(0);

  readonly filteredClients = computed(() =>
    filterRows(this.clients(), this.search(), (client) => [
      client.id,
      client.name,
      client.email,
      client.phone,
      client.address,
      client.status,
    ]),
  );

  constructor() {
    this.loadClients();
  }

  loadClients(): void {
    this.loading.set(true);

    this.api.list()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (clients) => this.clients.set(clients),
        error: (error: unknown) => {
          this.notifications.error(toApiMessage(error), 'No se pudieron cargar los clientes');
        },
      });
  }

  openCreate(): void {
    this.selectedClient.set(null);
    this.resetKey.update((value) => value + 1);
    this.dialogVisible.set(true);
  }

  openEdit(client: Client): void {
    this.selectedClient.set(client);
    this.resetKey.update((value) => value + 1);
    this.dialogVisible.set(true);
  }

  saveClient(payload: CreateClient): void {
    const current = this.selectedClient();

    this.saving.set(true);
    const request = current?.id
      ? this.api.update(current.id, payload)
      : this.api.create(payload);

    request.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: (client) => {
        this.notifications.success(
          current ? 'Cliente actualizado correctamente.' : 'Cliente creado correctamente.',
        );
        this.dialogVisible.set(false);

        if (current) {
          this.clients.update((rows) =>
            rows.map((row) => row.id === client.id ? client : row),
          );
        } else {
          this.clients.update((rows) => [client, ...rows]);
        }
      },
      error: (error: unknown) => {
        this.notifications.error(toApiMessage(error), 'No se pudo guardar el cliente');
      },
    });
  }

  deactivateClient(client: Client): void {
    if (!client.id) {
      this.notifications.warn('El cliente no tiene un identificador válido.');
      return;
    }

    this.confirmation.confirm({
      header: 'Desactivar cliente',
      message: `¿Deseas desactivar a ${client.name}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, desactivar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.api.deactivate(client.id!).subscribe({
          next: () => {
            this.notifications.success('El cliente fue desactivado correctamente.');
            this.loadClients();
          },
          error: (error: unknown) => {
            this.notifications.error(toApiMessage(error), 'No se pudo desactivar el cliente');
          },
        });
      },
    });
  }

  closeDialog(): void {
    if (!this.saving()) {
      this.dialogVisible.set(false);
    }
  }

  errorMessage(error: unknown): string {
    return error instanceof HttpErrorResponse
      ? toApiMessage(error)
      : 'Ocurrió un error inesperado.';
  }
}
