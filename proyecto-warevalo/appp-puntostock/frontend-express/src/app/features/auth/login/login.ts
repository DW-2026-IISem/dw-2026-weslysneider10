import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
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

    this.auth.login({
      identifier: this.identifier.trim(),
      password: this.password,
    }).subscribe({
      next: () => {
        this.notifications.success('Bienvenido a PuntoStock.');
        this.router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        const message =
          error?.error?.message ?? 'No fue posible iniciar sesión.';
        this.notifications.error(message);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
