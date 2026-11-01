import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PermissionApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/concesiones-rol`;

  getAll(): Observable<{ grants: any[] }> {
    return this.http.get<{ grants: any[] }>(this.url);
  }

  create(roleId: number, resourceId: number): Observable<unknown> {
    return this.http.post(this.url, {
      role_id: roleId,
      resource_id: resourceId
    });
  }
}
