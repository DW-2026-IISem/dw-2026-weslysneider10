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

    /**
     * Política "ve todo, hace solo lo asignado": todas las secciones se
     * muestran. Las que el usuario no puede leer llevan un candado
     * (badge 'lock'); al abrirlas verá el aviso de "sin permiso".
     */
    const entry = (label: string, icon: string, routerLink: string, method: string, path: string): MenuItem => ({
      label,
      icon,
      routerLink,
      badge: isAdmin || this.permissions.hasPermission(method, path) ? undefined : 'lock',
    });

    const items: MenuItem[] = [
      {
        label: 'Principal',
        items: [
          { label: 'Mi perfil', icon: 'pi pi-user', routerLink: '/perfil' },
          entry('Dashboard', 'pi pi-chart-bar', '/dashboard', 'GET', '/api/clientes'),
        ],
      },
      {
        label: 'Gestión comercial',
        items: [
          entry('Clientes', 'pi pi-users', '/clientes', 'GET', '/api/clientes'),
          entry('Productos', 'pi pi-box', '/productos', 'GET', '/api/productos'),
          entry('Tipos de producto', 'pi pi-tags', '/tipos-producto', 'GET', '/api/tipos-producto'),
          entry('Sucursales', 'pi pi-building', '/sucursales', 'GET', '/api/sucursales'),
        ],
      },
      {
        label: 'Operaciones',
        items: [
          entry('Ventas', 'pi pi-receipt', '/ventas', 'GET', '/api/ventas'),
          entry('Nueva venta', 'pi pi-plus-circle', '/ventas/nueva', 'POST', '/api/ventas'),
          entry('Inventario', 'pi pi-warehouse', '/inventario', 'GET', '/api/inventarios'),
          entry('Pagos', 'pi pi-wallet', '/pagos', 'GET', '/api/pagos'),
        ],
      },
    ];

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
            label: 'Roles y accesos',
            icon: 'pi pi-id-card',
            routerLink: '/admin/roles',
          },
          {
            label: 'Recursos',
            icon: 'pi pi-server',
            routerLink: '/admin/recursos',
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
