import { Component, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmationService } from 'primeng/api';

import {
  AdminUser,
  CreateAdminUser,
  UpdateAdminUser,
  UserEffectivePermission,
} from '../user.model';
import { UserApi } from '../user-api';
import { UserForm } from '../user-form/user-form';

import { SessionStore } from '../../../../core/services/auth/session.store';
import { NotificationService } from '../../../../core/services/notification.service';
import { PermissionService } from '../../../../core/services/permissions/permission.service';
import { toApiMessage } from '../../../../core/utils/api-error';
import { PageHeader } from '../../../../shared/ui/page-header/page-header';
import { EmptyState } from '../../../../shared/ui/empty-state/empty-state';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    AvatarModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    TableModule,
    TagModule,
    UserForm,
    PageHeader,
    EmptyState,
    HasPermissionDirective,
  ],
  templateUrl: './user-list.html',
})
export class UserList {
  private readonly api = inject(UserApi);
  private readonly notifications = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly session = inject(SessionStore);
  private readonly permissionService = inject(PermissionService);

  readonly users = signal<AdminUser[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly search = signal('');
  readonly dialogVisible = signal(false);
  readonly permissionsVisible = signal(false);
  readonly selectedUser = signal<AdminUser | null>(null);
  readonly permissions = signal<UserEffectivePermission[]>([]);
  readonly permissionsLoading = signal(false);
  readonly resetKey = signal(0);

  readonly filteredUsers = computed(() => {
    const term = this.search().trim().toLowerCase();

    if (!term) return this.users();

    return this.users().filter((user) =>
      [user.id, user.username, user.email, user.status].some((value) =>
        String(value ?? '')
          .toLowerCase()
          .includes(term),
      ),
    );
  });

  readonly permissionRoles = computed(() => {
    const unique = new Map<number, string>();

    for (const permission of this.permissions()) {
      unique.set(permission.role_id, permission.role_name);
    }

    return Array.from(unique.entries()).map(([id, name]) => ({ id, name }));
  });

  constructor() {
    this.loadUsers();
  }

  hasPermission(method: string, path: string): boolean {
    return this.permissionService.hasPermission(method, path);
  }

  isSelf(user: AdminUser): boolean {
    return this.session.profile()?.id === user.id;
  }

  loadUsers(): void {
    this.loading.set(true);

    this.api
      .list()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (users) => this.users.set(users),
        error: (error) =>
          this.notifications.error(toApiMessage(error), 'No se pudieron cargar los usuarios'),
      });
  }

  openCreate(): void {
    this.selectedUser.set(null);
    this.resetKey.update((value) => value + 1);
    this.dialogVisible.set(true);
  }

  openEdit(user: AdminUser): void {
    this.selectedUser.set(user);
    this.resetKey.update((value) => value + 1);
    this.dialogVisible.set(true);
  }

  saveUser(payload: CreateAdminUser | UpdateAdminUser): void {
    const current = this.selectedUser();

    this.saving.set(true);

    const request = current
      ? this.api.update(current.id, payload as UpdateAdminUser)
      : this.api.create(payload as CreateAdminUser);

    request.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: (user) => {
        this.notifications.success(
          current ? 'Usuario actualizado correctamente.' : 'Usuario creado correctamente.',
        );

        this.dialogVisible.set(false);
        this.loadUsers();
      },
      error: (error) =>
        this.notifications.error(toApiMessage(error), 'No se pudo guardar el usuario'),
    });
  }

  deactivateUser(user: AdminUser): void {
    if (this.isSelf(user)) {
      this.notifications.warn('No puedes desactivar tu propia cuenta.');
      return;
    }

    this.confirmation.confirm({
      header: 'Desactivar usuario',
      message: `¿Deseas desactivar al usuario "${user.username}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, desactivar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.api.deactivate(user.id).subscribe({
          next: () => {
            this.notifications.success('Usuario desactivado correctamente.');
            this.loadUsers();
          },
          error: (error) =>
            this.notifications.error(toApiMessage(error), 'No se pudo desactivar el usuario'),
        });
      },
    });
  }

  openPermissions(user: AdminUser): void {
    this.selectedUser.set(user);
    this.permissions.set([]);
    this.permissionsVisible.set(true);
    this.permissionsLoading.set(true);

    this.api
      .getPermissions(user.id)
      .pipe(finalize(() => this.permissionsLoading.set(false)))
      .subscribe({
        next: (permissions) => this.permissions.set(permissions),
        error: (error) =>
          this.notifications.error(toApiMessage(error), 'No se pudieron consultar los permisos'),
      });
  }

  closeDialog(): void {
    if (!this.saving()) {
      this.dialogVisible.set(false);
    }
  }

  methodSeverity(method: string): 'info' | 'success' | 'warn' | 'danger' | 'secondary' {
    switch (method.toUpperCase()) {
      case 'GET':
        return 'info';
      case 'POST':
        return 'success';
      case 'PUT':
      case 'PATCH':
        return 'warn';
      case 'DELETE':
        return 'danger';
      default:
        return 'secondary';
    }
  }
}
