import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  AdminUser,
  CreateAdminUser,
  UpdateAdminUser,
  UserEffectivePermission,
  UserPermissionsResponse,
} from './user.model';

interface UsersResponse {
  users: AdminUser[];
}

interface UserResponse {
  user: AdminUser;
}

@Injectable({ providedIn: 'root' })
export class UserApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/usuarios`;

  list(): Observable<AdminUser[]> {
    return this.http.get<UsersResponse>(this.base).pipe(
      map(response => response.users),
    );
  }

  getById(id: number): Observable<AdminUser> {
    return this.http.get<UserResponse>(`${this.base}/${id}`).pipe(
      map(response => response.user),
    );
  }

  create(payload: CreateAdminUser): Observable<AdminUser> {
    return this.http.post<UserResponse>(this.base, payload).pipe(
      map(response => response.user),
    );
  }

  update(id: number, payload: UpdateAdminUser): Observable<AdminUser> {
    return this.http.patch<UserResponse>(`${this.base}/${id}`, payload).pipe(
      map(response => response.user),
    );
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  getPermissions(id: number): Observable<UserEffectivePermission[]> {
    return this.http
      .get<UserPermissionsResponse>(`${this.base}/${id}/permisos`)
      .pipe(map(response => response.permissions));
  }
}
