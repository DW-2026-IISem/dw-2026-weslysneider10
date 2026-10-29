import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css',
})
export class EmptyState {
  @Input() title = 'No hay registros';
  @Input() description = 'Todavía no hay información para mostrar.';
}
