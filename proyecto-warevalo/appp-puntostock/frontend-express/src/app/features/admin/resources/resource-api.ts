import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResourceI } from './resource.model';

@Injectable({ providedIn: 'root' })
export class ResourceApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/recursos`;

  getAll(): Observable<{ resources: ResourceI[] }> {
    return this.http.get<{ resources: ResourceI[] }>(this.url);
  }

  create(resource: ResourceI): Observable<{ resource: ResourceI }> {
    return this.http.post<{ resource: ResourceI }>(this.url, resource);
  }
}
