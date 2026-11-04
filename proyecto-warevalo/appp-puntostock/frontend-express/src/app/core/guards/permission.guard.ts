import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { PermissionService } from '../services/permissions/permission.service';

export const permissionGuard: CanActivateFn = (route) => {
  const permissions = inject(PermissionService);
  const router = inject(Router);

  const denied = router.createUrlTree(['/access-denied']);

  const requiredPermission = route.data['permission'] as
    { method: string; path: string } | undefined;

  const requiredRoles = route.data['roles'] as string[] | undefined;

  if (requiredRoles?.length) {
    return permissions.hasAnyRole(requiredRoles) ? true : denied;
  }

  if (!requiredPermission) {
    return denied;
  }

  return permissions.hasPermission(
    requiredPermission.method,
    requiredPermission.path,
  )
    ? true
    : denied;
};
