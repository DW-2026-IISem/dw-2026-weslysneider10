import { Component, input, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-aside',
  host: {
    class: 'block h-full',
  },
  imports: [PanelMenuModule],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {
  readonly appName = input('PuntoStock Express');

  /** Opciones que recibe del componente padre. */
  readonly items = input<MenuItem[]>([]);

  /** Avisa al padre cuando se selecciona una opción del menú. */
  readonly navigated = output<void>();

  onNavigationClick(event: Event): void {
    const target = event.target;

    if (
      target instanceof HTMLElement &&
      target.closest('a, button, [role="button"]')
    ) {
      this.navigated.emit();
    }
  }
}
