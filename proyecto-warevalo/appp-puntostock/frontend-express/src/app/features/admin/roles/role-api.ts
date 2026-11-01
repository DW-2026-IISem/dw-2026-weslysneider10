import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RoleI } from './role.model';

@Injectable({ providedIn: 'root' })
export class RoleApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/roles`;

  getAll(): Observable<{ roles: RoleI[] }> {
    return this.http.get<{ roles: RoleI[] }>(this.url);
  }

  create(role: RoleI): Observable<{ role: RoleI }> {
    return this.http.post<{ role: RoleI }>(this.url, role);
  }

  update(id: number, role: Partial<RoleI>): Observable<{ role: RoleI }> {
    return this.http.put<{ role: RoleI }>(`${this.url}/${id}`, role);
  }
}
