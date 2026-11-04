import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { finalize } from 'rxjs';
import { MenuItem } from 'primeng/api';

import { Header } from '../header/header';
import { Aside } from '../aside/aside';
import { Footer } from '../footer/footer';
import { PermissionService } from '../../core/services/permissions/permission.service';
import { SessionStore } from '../../core/services/auth/session.store';
import { AuthService } from '../../core/services/auth/auth.service';

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
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly currentRole = computed(() => {
    const permissions = this.session.permissions();

    if (permissions.some(p => p.role_name.toUpperCase() === 'ADMIN')) {
      return 'ADMINISTRADOR';
    }

    if (permissions.some(p => p.role_name.toUpperCase() === 'SELLER')) {
      return 'VENDEDOR';
    }

    if (permissions.some(p => p.role_name.toUpperCase() === 'FUNCIONARIO')) {
      return 'FUNCIONARIO';
    }

    return 'USUARIO';
  });

  readonly menuItems = computed<MenuItem[]>(() => {
    if (!this.session.authenticated()) {
      return [];
    }

    const isAdmin = this.permissions.hasRole('ADMIN');
    const can = (method: string, path: string): boolean =>
      isAdmin || this.permissions.hasPermission(method, path);

    const items: MenuItem[] = [
      {
        label: 'Principal',
        items: [
          {
            label: 'Mi perfil',
            icon: 'pi pi-user',
            routerLink: '/perfil',
          },
        ],
      },
    ];

    const commercialItems: MenuItem[] = [];

    if (can('GET', '/api/clientes')) {
      commercialItems.push({
        label: 'Clientes',
        icon: 'pi pi-users',
        routerLink: '/clientes',
      });
    }

    if (can('GET', '/api/productos')) {
      commercialItems.push({
        label: 'Productos',
        icon: 'pi pi-box',
        routerLink: '/productos',
      });
    }

    if (can('GET', '/api/tipos-producto')) {
      commercialItems.push({
        label: 'Tipos de producto',
        icon: 'pi pi-tags',
        routerLink: '/tipos-producto',
      });
    }

    if (can('GET', '/api/sucursales')) {
      commercialItems.push({
        label: 'Sucursales',
        icon: 'pi pi-building',
        routerLink: '/sucursales',
      });
    }

    if (commercialItems.length) {
      items.push({
        label: 'Gestión comercial',
        items: commercialItems,
      });
    }

    const operationItems: MenuItem[] = [];

    if (can('GET', '/api/ventas')) {
      operationItems.push({
        label: 'Ventas',
        icon: 'pi pi-receipt',
        routerLink: '/ventas',
      });
    }

    if (can('POST', '/api/ventas')) {
      operationItems.push({
        label: 'Nueva venta',
        icon: 'pi pi-plus-circle',
        routerLink: '/ventas/nueva',
      });
    }

    if (can('GET', '/api/compras')) {
      operationItems.push({
        label: 'Compras',
        icon: 'pi pi-shopping-cart',
        routerLink: '/compras',
      });
    }

    if (can('GET', '/api/inventarios')) {
      operationItems.push({
        label: 'Inventario',
        icon: 'pi pi-warehouse',
        routerLink: '/inventario',
      });
    }

    if (can('GET', '/api/pagos')) {
      operationItems.push({
        label: 'Pagos',
        icon: 'pi pi-wallet',
        routerLink: '/pagos',
      });
    }

    if (can('GET', '/api/devoluciones')) {
      operationItems.push({
        label: 'Devoluciones',
        icon: 'pi pi-refresh',
        routerLink: '/devoluciones',
      });
    }

    if (operationItems.length) {
      items.push({
        label: 'Operaciones',
        items: operationItems,
      });
    }

    const reportItems: MenuItem[] = [];

    if (can('GET', '/api/dashboard')) {
      reportItems.push({
        label: 'Dashboard',
        icon: 'pi pi-chart-bar',
        routerLink: '/dashboard',
      });
    }

    if (can('GET', '/api/detalle-ventas')) {
      reportItems.push({
        label: 'Detalle de ventas',
        icon: 'pi pi-list',
        routerLink: '/ventas/detalle',
      });
    }

    if (reportItems.length) {
      items.push({
        label: 'Informes',
        items: reportItems,
      });
    }

    if (isAdmin) {
      items.push({
        label: 'Administración',
        items: [
          {
            label: 'Usuarios',
            icon: 'pi pi-users',
            routerLink: '/admin/usuarios',
          },
          {
            label: 'Roles',
            icon: 'pi pi-id-card',
            routerLink: '/admin/roles',
          },
          {
            label: 'Recursos',
            icon: 'pi pi-server',
            routerLink: '/admin/recursos',
          },
          {
            label: 'Asignaciones',
            icon: 'pi pi-user-plus',
            routerLink: '/admin/asignaciones',
          },
          {
            label: 'Permisos',
            icon: 'pi pi-lock',
            routerLink: '/admin/permisos',
          },
        ],
      });
    }

    return items;
  });

  logout(): void {
    this.auth.logout()
      .pipe(
        finalize(() => {
          this.session.clear();
          void this.router.navigateByUrl('/login');
        }),
      )
      .subscribe({
        error: (error) => {
          console.error('Error al cerrar sesión en el servidor:', error);
        },
      });
  }

  toggleSidebar(): void {
    this.sidebarVisible.update(visible => !visible);
  }

  closeSidebar(): void {
    this.sidebarVisible.set(false);
  }
}
