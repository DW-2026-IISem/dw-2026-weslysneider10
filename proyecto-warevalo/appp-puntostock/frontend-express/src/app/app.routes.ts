import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'construir',
    loadComponent: () =>
      import('./features/construir/construir').then((m) => m.Construir),
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
        path: 'clientes',
        loadComponent: () =>
          import('./features/clients/client-list/client-list').then(
            (m) => m.ClientList,
          ),
      },
      {
        path: 'tipos-producto',
        title: 'Tipos de producto · PuntoStock',
        loadComponent: () =>
          import('./features/product-types/product-type-list/product-type-list').then(
            (m) => m.ProductTypeList,
          ),
      },
      {
        path: 'productos',
        title: 'Productos · PuntoStock',
        loadComponent: () =>
          import('./features/products/product-list/product-list').then(
            (m) => m.ProductList,
          ),
      },
      {
        path: 'ventas',
        title: 'Ventas · PuntoStock',
        loadComponent: () =>
          import('./features/sales/sale-list/sale-list').then(
            (m) => m.SaleList,
          ),
      },
      {
        path: 'ventas/nueva',
        title: 'Nueva venta · PuntoStock',
        loadComponent: () =>
          import('./features/sales/sale-form/sale-form').then(
            (m) => m.SaleForm,
          ),
      },

    {
      path: 'dashboard',
      title: 'Dashboard',
      loadComponent: () =>
        import('./features/dashboard/dashboard').then((m) => m.Dashboard),
    },

    {
      path: 'detalle-ventas',
      title: 'Detalle de ventas',
      loadComponent: () =>
        import('./features/product-sales/product-sale-list/product-sale-list').then((m) => m.ProductSaleList),
    },
    ],
  },
  {
    path: '**',
    redirectTo: 'construir',
  },
];
