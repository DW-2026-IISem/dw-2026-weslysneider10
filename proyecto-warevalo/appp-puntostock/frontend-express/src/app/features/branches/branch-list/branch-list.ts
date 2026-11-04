import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import type { Branch, CreateBranch } from '../../../core/models/branch.model';
import { BranchApi } from '../branch-api';
import { NotificationService } from '../../../core/services/notification.service';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { PageHeader } from '../../../shared/ui/page-header/page-header';

@Component({
  selector: 'app-branch-list',
  standalone: true,
  imports: [FormsModule, ButtonModule, DialogModule, InputTextModule, TableModule, TagModule, HasPermissionDirective, PageHeader],
  templateUrl: './branch-list.html',
})
export class BranchList {
  private readonly api = inject(BranchApi);
  private readonly notifications = inject(NotificationService);

  readonly rows = signal<Branch[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly search = signal('');
  readonly visible = signal(false);
  readonly selected = signal<Branch | null>(null);

  name = '';
  description = '';

  readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    return this.rows().filter(row =>
      [row.name, row.description ?? '', row.status].some(value =>
        value.toLowerCase().includes(q),
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
      error: () => this.notifications.error('No se pudieron cargar las sucursales.'),
      complete: () => this.loading.set(false),
    });
  }

  openCreate(): void {
    this.selected.set(null);
    this.name = '';
    this.description = '';
    this.visible.set(true);
  }

  openEdit(row: Branch): void {
    this.selected.set(row);
    this.name = row.name;
    this.description = row.description ?? '';
    this.visible.set(true);
  }

  save(): void {
    const name = this.name.trim();
    if (!name) {
      this.notifications.warn('El nombre de la sucursal es obligatorio.');
      return;
    }

    const payload: CreateBranch = {
      name,
      description: this.description.trim() || null,
      status: 'active',
    };

    const current = this.selected();
    this.saving.set(true);

    const request = current?.id
      ? this.api.update(current.id, payload)
      : this.api.create(payload);

    request.subscribe({
      next: () => {
        this.notifications.success(current ? 'Sucursal actualizada.' : 'Sucursal creada.');
        this.visible.set(false);
        this.load();
        this.saving.set(false);
      },
      error: () => {
        this.notifications.error('No se pudo guardar la sucursal.');
        this.saving.set(false);
      },
    });
  }

  deactivate(row: Branch): void {
    if (!row.id || !window.confirm(`¿Desactivar la sucursal ${row.name}?`)) return;

    this.api.deactivate(row.id).subscribe({
      next: () => {
        this.notifications.success('Sucursal desactivada.');
        this.load();
      },
      error: () => this.notifications.error('No se pudo desactivar la sucursal.'),
    });
  }
}
