import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';

import { watchMediaQuery } from '../../core/utils/media-query';
import { AuthService } from '../../core/services/auth/auth.service';
import { SessionStore } from '../../core/services/auth/session.store';
import { Aside } from '../../layout/aside/aside';
import { Footer } from '../../layout/footer/footer';
import { Header } from '../../layout/header/header';

@Component({
  selector: 'app-construir',
  host: {
    class: 'block',
  },
  imports: [Aside, ButtonModule, CardModule, DrawerModule, Footer, Header],
  templateUrl: './construir.html',
  styleUrl: './construir.css',
})
export class Construir {
  private readonly isDesktop = watchMediaQuery('(min-width: 1024px)');

  private readonly auth = inject(AuthService);
  private readonly session = inject(SessionStore);
  private readonly router = inject(Router);

  readonly sidebarCollapsed = signal(false);
  readonly mobileOpen = signal(false);
  readonly title = signal('Inicio');

  readonly items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      command: () => this.seleccionar('Inicio'),
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      command: () => this.seleccionar('Clientes'),
    },
    {
      label: 'Tipos de producto',
      icon: 'pi pi-tags',
      command: () => this.seleccionar('Tipos de producto'),
    },
    {
      label: 'Productos',
      icon: 'pi pi-box',
      command: () => this.seleccionar('Productos'),
    },
    {
      label: 'Ventas',
      icon: 'pi pi-shopping-cart',
      command: () => this.seleccionar('Ventas'),
    },
  ];

  onMenuToggle(): void {
    if (this.isDesktop()) {
      this.sidebarCollapsed.update((collapsed) => !collapsed);
    } else {
      this.mobileOpen.set(true);
    }
  }

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

  seleccionar(titulo: string): void {
    this.title.set(titulo);
    this.mobileOpen.set(false);
  }
}
