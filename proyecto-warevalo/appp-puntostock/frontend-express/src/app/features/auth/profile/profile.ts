import { Component, inject, signal } from '@angular/core';

import { AuthService } from '../../../core/services/auth/auth.service';
import { SessionStore } from '../../../core/services/auth/session.store';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
})
export class Profile {
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  readonly session = inject(SessionStore);
  readonly loading = signal(false);

  reload(): void {
    this.loading.set(true);

    this.auth.loadIdentity().subscribe({
      next: () => this.notifications.success('Perfil actualizado.'),
      error: () => this.notifications.error('No se pudo consultar el perfil.'),
      complete: () => this.loading.set(false),
    });
  }
}
