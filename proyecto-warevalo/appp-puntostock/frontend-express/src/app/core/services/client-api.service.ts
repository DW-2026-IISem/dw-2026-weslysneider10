import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Client, CreateClient, UpdateClient } from '../models/client.model';

interface ClientsResponse {
  clients: Client[];
}

interface ClientResponse {
  client: Client;
}

@Injectable({ providedIn: 'root' })
export class ClientApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/clientes`;

  list(filters?: { isActive?: boolean }): Observable<Client[]> {
    let params = new HttpParams();

    if (filters?.isActive !== undefined) {
      params = params.set('isActive', String(filters.isActive));
    }

    return this.http.get<ClientsResponse>(this.base, { params }).pipe(
      map(response => response.clients),
    );
  }

  getById(id: number): Observable<Client> {
    return this.http.get<ClientResponse>(`${this.base}/${id}`).pipe(
      map(response => response.client),
    );
  }

  create(payload: CreateClient): Observable<Client> {
    return this.http.post<ClientResponse>(this.base, payload).pipe(
      map(response => response.client),
    );
  }

  update(id: number, payload: UpdateClient): Observable<Client> {
    return this.http.put<ClientResponse>(`${this.base}/${id}`, payload).pipe(
      map(response => response.client),
    );
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
