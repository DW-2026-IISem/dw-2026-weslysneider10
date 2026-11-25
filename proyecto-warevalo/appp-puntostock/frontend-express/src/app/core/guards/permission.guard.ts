import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { PermissionService } from '../services/permissions/permission.service';

export const permissionGuard: CanActivateFn = (route) => {
  const permissions = inject(PermissionService);
  const router = inject(Router);

  const denied = router.createUrlTree(['/access-denied']);

  const requiredPermission = route.data['permission'] as
    { method: string; path: string } | undefined;

  // Las pantallas marcadas con roles (administración) siguen siendo exclusivas.

  const requiredRoles = route.data['roles'] as string[] | undefined;

  if (requiredRoles?.length) {
    return permissions.hasAnyRole(requiredRoles) ? true : denied;
  }

  if (!requiredPermission) {
    return denied;
  }

  // Política "ve todo, hace solo lo asignado": las pantallas de negocio se
  // pueden abrir siempre. Si falta el permiso de lectura, la pantalla muestra
  // el aviso del backend (403) y los botones salen bloqueados con candado.
  // La seguridad real la aplica el backend en cada petición.
  return true;
};
