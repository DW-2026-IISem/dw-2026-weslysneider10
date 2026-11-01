import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { PermissionService } from '../services/permissions/permission.service';

export const permissionGuard: CanActivateFn = (route) => {
  const permissions = inject(PermissionService);
  const router = inject(Router);

  const requiredPermission = route.data['permission'] as
    | { method: string; path: string }
    | undefined;

  const requiredRoles = route.data['roles'] as string[] | undefined;

  if (requiredRoles?.length) {
    return permissions.hasAnyRole(requiredRoles)
      ? true
      : router.createUrlTree(['/acceso-denegado']);
  }

  if (!requiredPermission) {
    return router.createUrlTree(['/acceso-denegado']);
  }

  return permissions.hasPermission(
    requiredPermission.method,
    requiredPermission.path,
  )
    ? true
    : router.createUrlTree(['/acceso-denegado']);
};
