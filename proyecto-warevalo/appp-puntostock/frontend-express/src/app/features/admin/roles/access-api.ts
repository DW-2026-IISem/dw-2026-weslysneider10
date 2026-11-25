import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';

/**
 * Endpoints "en bloque" del panel de accesos: cada uno guarda todas las
 * casillas marcadas en una sola petición (y una sola transacción en el backend).
 */
@Injectable({ providedIn: 'root' })
export class AccessApi {
  private readonly http = inject(HttpClient);
  private readonly api = environment.apiUrl;

  /** GET /api/usuarios/:id/roles */
  getUserRoles(userId: number): Observable<number[]> {
    return this.http
      .get<{ role_ids: number[] }>(`${this.api}/usuarios/${userId}/roles`)
      .pipe(map((response) => response.role_ids));
  }

  /** PUT /api/usuarios/:id/roles — deja al usuario exactamente con estos roles. */
  setUserRoles(userId: number, roleIds: number[]): Observable<number[]> {
    return this.http
      .put<{ role_ids: number[] }>(`${this.api}/usuarios/${userId}/roles`, { role_ids: roleIds })
      .pipe(map((response) => response.role_ids));
  }

  /** GET /api/roles/:id/permisos */
  getRolePermissions(roleId: number): Observable<number[]> {
    return this.http
      .get<{ resource_ids: number[] }>(`${this.api}/roles/${roleId}/permisos`)
      .pipe(map((response) => response.resource_ids));
  }

  /** PUT /api/roles/:id/permisos — deja al rol exactamente con estos recursos. */
  setRolePermissions(
    roleId: number,
    resourceIds: number[],
  ): Observable<{ activated: number; deactivated: number; total_active: number }> {
    return this.http
      .put<{
        result: { activated: number; deactivated: number; total_active: number };
      }>(`${this.api}/roles/${roleId}/permisos`, { resource_ids: resourceIds })
      .pipe(map((response) => response.result));
  }
}
