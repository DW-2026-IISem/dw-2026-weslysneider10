import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { Header } from '../header/header';
import { Aside } from '../aside/aside';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-shell',
  host: {
    class: 'block min-h-dvh',
  },
  imports: [RouterOutlet, Header, Aside, Footer],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {
  readonly appName = 'PuntoStock Express';
  readonly sidebarVisible = signal(true);

  readonly menuItems: MenuItem[] = [
    {
      label: 'Principal',
      items: [
        {
          label: 'Inicio',
          icon: 'pi pi-home',
          routerLink: '/construir',
        },
      ],
    },
    {
      label: 'Gestión comercial',
      items: [
        { label: 'Clientes', icon: 'pi pi-users', disabled: true },
        { label: 'Productos', icon: 'pi pi-box', disabled: true },
        { label: 'Tipos de producto', icon: 'pi pi-tags', disabled: true },
        { label: 'Proveedores', icon: 'pi pi-truck', disabled: true },
      ],
    },
    {
      label: 'Operaciones',
      items: [
        { label: 'Inventario', icon: 'pi pi-warehouse', disabled: true },
        { label: 'Compras', icon: 'pi pi-shopping-cart', disabled: true },
        { label: 'Ventas', icon: 'pi pi-receipt', disabled: true },
        { label: 'Pagos', icon: 'pi pi-wallet', disabled: true },
        { label: 'Devoluciones', icon: 'pi pi-refresh', disabled: true },
      ],
    },
  ];

  toggleSidebar(): void {
    this.sidebarVisible.update((visible) => !visible);
  }

  closeSidebar(): void {
    this.sidebarVisible.set(false);
  }
}
