import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { permissionGuard } from './core/guards/permission.guard';
import { Shell } from './layout/shell/shell';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar sesión · PuntoStock',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'construir',
    title: 'Construir · PuntoStock',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/construir/construir').then((m) => m.Construir),
  },
  {
    path: 'access-denied',
    title: 'Acceso denegado · PuntoStock',
    loadComponent: () =>
      import('./features/auth/forbidden/forbidden').then((m) => m.Forbidden),
  },
  {
    path: '',
    component: Shell,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'perfil',
        title: 'Mi perfil · PuntoStock',
        loadComponent: () =>
          import('./features/auth/profile/profile').then((m) => m.Profile),
      },
      {
        path: 'clientes',
        title: 'Clientes · PuntoStock',
        canActivate: [permissionGuard],
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
        canActivate: [permissionGuard],
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
        canActivate: [permissionGuard],
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
        canActivate: [permissionGuard],
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
        canActivate: [permissionGuard],
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
        canActivate: [permissionGuard],
        data: {
          roles: ['ADMIN'],
        },
        loadComponent: () =>
          import('./features/dashboard/dashboard').then(
            (m) => m.Dashboard,
          ),
      },
      {
        path: 'ventas/detalle',
        title: 'Detalle de ventas · PuntoStock',
        canActivate: [permissionGuard],
        data: {
          roles: ['ADMIN'],
        },
        loadComponent: () =>
          import('./features/sales/sale-detail/sale-detail').then(
            (m) => m.SaleDetail,
          ),
      },
      {
        path: 'admin/usuarios',
        title: 'Administración de usuarios · PuntoStock',
        canActivate: [permissionGuard],
        data: {
          permission: {
            method: 'GET',
            path: '/api/usuarios',
          },
        },
        loadComponent: () =>
          import('./features/admin/users/user-list/user-list').then(
            (m) => m.UserList,
          ),
      },
      {
        path: 'admin/roles',
        title: 'Administración de roles · PuntoStock',
        canActivate: [permissionGuard],
        data: {
          roles: ['ADMIN'],
        },
        loadComponent: () =>
          import('./features/admin/roles/role-list/role-list').then(
            (m) => m.RoleList,
          ),
      },
      {
        path: 'admin/recursos',
        title: 'Administración de recursos · PuntoStock',
        canActivate: [permissionGuard],
        data: {
          roles: ['ADMIN'],
        },
        loadComponent: () =>
          import('./features/admin/resources/resource-list/resource-list').then(
            (m) => m.ResourceList,
          ),
      },
      {
        path: 'admin/asignaciones',
        title: 'Asignaciones de roles · PuntoStock',
        canActivate: [permissionGuard],
        data: {
          roles: ['ADMIN'],
        },
        loadComponent: () =>
          import('./features/admin/assignments/assignment-list/assignment-list').then(
            (m) => m.AssignmentList,
          ),
      },
      {
        path: 'admin/permisos',
        title: 'Concesiones de permisos · PuntoStock',
        canActivate: [permissionGuard],
        data: {
          roles: ['ADMIN'],
        },
        loadComponent: () =>
          import('./features/admin/permissions/permission-list/permission-list').then(
            (m) => m.PermissionList,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
