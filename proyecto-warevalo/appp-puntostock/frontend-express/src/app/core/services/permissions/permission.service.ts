import { Injectable, inject } from '@angular/core';
import { EffectivePermission } from '../../models/auth/session.model';
import { SessionStore } from '../auth/session.store';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private readonly session = inject(SessionStore);

  hasPermission(method: string, path: string): boolean {
    const permissions = this.session.permissions();

    return permissions.some((permission) => this.matchesPermission(permission, method, path));
  }

  hasRole(role: string): boolean {
    return this.session
      .permissions()
      .some((permission) => permission.role_name.toUpperCase() === role.toUpperCase());
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some((role) => this.hasRole(role));
  }

  getPermissions(): EffectivePermission[] {
    return this.session.permissions();
  }

  private matchesPermission(
    permission: EffectivePermission,
    method: string,
    path: string,
  ): boolean {
    return (
      permission.method.toUpperCase() === method.toUpperCase() &&
      this.normalizePath(permission.path) === this.normalizePath(path)
    );
  }

  private normalizePath(path: string): string {
    return path.replace(/\/+$/, '');
  }
}
