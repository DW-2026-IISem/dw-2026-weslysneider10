import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AssignmentApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/asignaciones-rol`;

  getAll(): Observable<{ assignments: any[] }> {
    return this.http.get<{ assignments: any[] }>(this.url);
  }

  create(userId: number, roleId: number): Observable<unknown> {
    return this.http.post(this.url, {
      user_id: userId,
      role_id: roleId
    });
  }
}
