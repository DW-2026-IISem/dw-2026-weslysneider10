import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly messages = inject(MessageService);

  success(detail: string, summary = 'Operación exitosa'): void {
    this.messages.add({
      severity: 'success',
      summary,
      detail,
      life: 3000,
    });
  }

  info(detail: string, summary = 'Información'): void {
    this.messages.add({
      severity: 'info',
      summary,
      detail,
      life: 4000,
    });
  }

  warn(detail: string, summary = 'Advertencia'): void {
    this.messages.add({
      severity: 'warn',
      summary,
      detail,
      life: 5000,
    });
  }

  error(detail: string, summary = 'Error'): void {
    this.messages.add({
      severity: 'error',
      summary,
      detail,
      life: 6000,
    });
  }
}
