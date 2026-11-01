import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { Header } from '../header/header';
import { Aside } from '../aside/aside';
import { Footer } from '../footer/footer';
import { PermissionService } from '../../core/services/permissions/permission.service';
import { SessionStore } from '../../core/services/auth/session.store';

@Component({
  selector: 'app-shell',
  host: { class: 'block min-h-dvh' },
  imports: [RouterOutlet, Header, Aside, Footer],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {
  readonly appName = 'PuntoStock Express';
  readonly sidebarVisible = signal(true);

  private readonly permissions = inject(PermissionService);
  private readonly session = inject(SessionStore);

  readonly menuItems = computed<MenuItem[]>(() => {
    const authenticated = this.session.authenticated();

    if (!authenticated) {
      return [
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
      ];
    }

    const items: MenuItem[] = [
      {
        label: 'Principal',
        items: [
          {
            label: 'Inicio',
            icon: 'pi pi-home',
            routerLink: '/construir',
          },
          {
            label: 'Mi perfil',
            icon: 'pi pi-user',
            routerLink: '/perfil',
          },
        ],
      },
    ];

    const commercialItems: MenuItem[] = [];

    if (this.permissions.hasPermission('GET', '/api/clientes')) {
      commercialItems.push({
        label: 'Clientes',
        icon: 'pi pi-users',
        routerLink: '/clientes',
      });
    }

    if (this.permissions.hasPermission('GET', '/api/productos')) {
      commercialItems.push({
        label: 'Productos',
        icon: 'pi pi-box',
        routerLink: '/productos',
      });
    }

    if (this.permissions.hasPermission('GET', '/api/tipos-producto')) {
      commercialItems.push({
        label: 'Tipos de producto',
        icon: 'pi pi-tags',
        routerLink: '/tipos-producto',
      });
    }

    if (commercialItems.length > 0) {
      items.push({
        label: 'Gestión comercial',
        items: commercialItems,
      });
    }

    const operationItems: MenuItem[] = [];

    if (this.permissions.hasPermission('GET', '/api/ventas')) {
      operationItems.push({
        label: 'Ventas',
        icon: 'pi pi-receipt',
        routerLink: '/ventas',
      });
    }

    if (this.permissions.hasPermission('POST', '/api/ventas')) {
      operationItems.push({
        label: 'Nueva venta',
        icon: 'pi pi-plus-circle',
        routerLink: '/ventas/nueva',
      });
    }

    if (this.permissions.hasPermission('GET', '/api/compras')) {
      operationItems.push({
        label: 'Compras',
        icon: 'pi pi-shopping-cart',
        routerLink: '/compras',
      });
    }

    if (this.permissions.hasPermission('GET', '/api/inventario')) {
      operationItems.push({
        label: 'Inventario',
        icon: 'pi pi-warehouse',
        routerLink: '/inventario',
      });
    }

    if (this.permissions.hasPermission('GET', '/api/pagos')) {
      operationItems.push({
        label: 'Pagos',
        icon: 'pi pi-wallet',
        routerLink: '/pagos',
      });
    }

    if (this.permissions.hasPermission('GET', '/api/devoluciones')) {
      operationItems.push({
        label: 'Devoluciones',
        icon: 'pi pi-refresh',
        routerLink: '/devoluciones',
      });
    }

    if (operationItems.length > 0) {
      items.push({
        label: 'Operaciones',
        items: operationItems,
      });
    }

    if (this.permissions.hasRole('ADMIN')) {
      items.push({
        label: 'Informes',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-chart-bar',
            routerLink: '/dashboard',
          },
          {
            label: 'Detalle de ventas',
            icon: 'pi pi-list',
            routerLink: '/detalle-ventas',
          },
        ],
      });
    }

    return items;
  });

  toggleSidebar(): void {
    this.sidebarVisible.update((visible) => !visible);
  }

  closeSidebar(): void {
    this.sidebarVisible.set(false);
  }
}
