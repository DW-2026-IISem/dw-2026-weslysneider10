import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../../../core/services/auth/auth.service';
import { PermissionService } from '../../../core/services/permissions/permission.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly permissions = inject(PermissionService);
  private readonly notifications = inject(NotificationService);

  identifier = '';
  password = '';
  readonly loading = signal(false);

  submit(): void {
    if (!this.identifier.trim() || !this.password) {
      this.notifications.warn('Ingresa tu usuario o correo y tu contraseña.');
      return;
    }

    this.loading.set(true);

    this.auth
      .login({
        identifier: this.identifier.trim(),
        password: this.password,
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.notifications.success('Bienvenido a PuntoStock.');

          const destination = this.permissions.hasRole('ADMIN')
            ? '/dashboard'
            : '/clientes';

          void this.router.navigateByUrl(destination);
        },
        error: (error) => {
          const message =
            error?.error?.message ?? 'No fue posible completar el inicio de sesión.';
          this.notifications.error(message);
        },
      });
  }
}
