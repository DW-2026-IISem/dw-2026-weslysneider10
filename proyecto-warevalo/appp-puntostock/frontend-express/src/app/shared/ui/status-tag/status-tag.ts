import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-tag',
  standalone: true,
  templateUrl: './status-tag.html',
  styleUrl: './status-tag.css',
})
export class StatusTag {
  @Input() status = '';
  @Input() label = '';

  get displayLabel(): string {
    if (this.label) return this.label;

    const labels: Record<string, string> = {
      active: 'Activo',
      inactive: 'Inactivo',
      completed: 'Completado',
      cancelled: 'Cancelado',
      pending: 'Pendiente',
      partial: 'Parcial',
      received: 'Recibido',
      approved: 'Aprobado',
      rejected: 'Rechazado',
    };

    return labels[this.status.toLowerCase()] ?? this.status;
  }

  get statusClass(): string {
    const status = this.status.toLowerCase();

    if (['active', 'completed', 'received', 'approved'].includes(status)) {
      return 'status-tag--success';
    }

    if (['pending', 'partial'].includes(status)) {
      return 'status-tag--warning';
    }

    if (['inactive', 'cancelled', 'rejected'].includes(status)) {
      return 'status-tag--danger';
    }

    return 'status-tag--neutral';
  }
}
