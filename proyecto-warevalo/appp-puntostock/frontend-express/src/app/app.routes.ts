import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { permissionGuard } from './core/guards/permission.guard';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar sesión · PuntoStock',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'construir',
    loadComponent: () =>
      import('./features/construir/construir').then((m) => m.Construir),
  },
  {
    path: 'acceso-denegado',
    title: 'Acceso denegado · PuntoStock',
    loadComponent: () =>
      import('./features/auth/forbidden/forbidden').then((m) => m.Forbidden),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/shell/shell').then((m) => m.Shell),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'construir',
      },
      {
        path: 'perfil',
        title: 'Mi perfil · PuntoStock',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/auth/profile/profile').then((m) => m.Profile),
      },
      {
        path: 'clientes',
        title: 'Clientes · PuntoStock',
        canActivate: [authGuard, permissionGuard],
        data: {
          permission: {
            method: 'GET',
            path: '/api/clientes',
          },
        },
        loadComponent: () =>
          import('./features/clients/client-list/client-list').then(
            (m) => m.ClientList,
          ),
      },
      {
        path: 'tipos-producto',
        title: 'Tipos de producto · PuntoStock',
        canActivate: [authGuard, permissionGuard],
        data: {
          permission: {
            method: 'GET',
            path: '/api/tipos-producto',
          },
        },
        loadComponent: () =>
          import('./features/product-types/product-type-list/product-type-list').then(
            (m) => m.ProductTypeList,
          ),
      },
      {
        path: 'productos',
        title: 'Productos · PuntoStock',
        canActivate: [authGuard, permissionGuard],
        data: {
          permission: {
            method: 'GET',
            path: '/api/productos',
          },
        },
        loadComponent: () =>
          import('./features/products/product-list/product-list').then(
            (m) => m.ProductList,
          ),
      },
      {
        path: 'ventas',
        title: 'Ventas · PuntoStock',
        canActivate: [authGuard, permissionGuard],
        data: {
          permission: {
            method: 'GET',
            path: '/api/ventas',
          },
        },
        loadComponent: () =>
          import('./features/sales/sale-list/sale-list').then(
            (m) => m.SaleList,
          ),
      },
      {
        path: 'ventas/nueva',
        title: 'Nueva venta · PuntoStock',
        canActivate: [authGuard, permissionGuard],
        data: {
          permission: {
            method: 'POST',
            path: '/api/ventas',
          },
        },
        loadComponent: () =>
          import('./features/sales/sale-form/sale-form').then(
            (m) => m.SaleForm,
          ),
      },
      {
        path: 'dashboard',
        title: 'Dashboard · PuntoStock',
        canActivate: [authGuard, permissionGuard],
        data: {
          roles: ['ADMIN'],
        },
        loadComponent: () =>
          import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'detalle-ventas',
        title: 'Detalle de ventas · PuntoStock',
        canActivate: [authGuard, permissionGuard],
        data: {
          roles: ['ADMIN'],
        },
        loadComponent: () =>
          import('./features/product-sales/product-sale-list/product-sale-list').then(
            (m) => m.ProductSaleList,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'construir',
  },
];
