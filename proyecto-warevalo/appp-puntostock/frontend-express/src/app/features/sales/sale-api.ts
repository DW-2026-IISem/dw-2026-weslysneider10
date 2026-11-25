import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Sale, SaleCreatePayload } from '../../core/models/sale.model';

/**
 * Cliente HTTP de /api/ventas.
 * Usa los mismos nombres de campo que el backend: no hay traducción.
 */
@Injectable({ providedIn: 'root' })
export class SaleApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/ventas`;

  list(): Observable<Sale[]> {
    return this.http
      .get<{ sales: Sale[] }>(this.baseUrl)
      .pipe(map((response) => response.sales ?? []));
  }

  get(id: number): Observable<Sale> {
    return this.http
      .get<{ sale: Sale }>(`${this.baseUrl}/${id}`)
      .pipe(map((response) => response.sale));
  }

  create(payload: SaleCreatePayload): Observable<Sale> {
    return this.http
      .post<{ sale: Sale }>(this.baseUrl, payload)
      .pipe(map((response) => response.sale));
  }

  /** Cancela la venta; el backend repone el stock en inventories. */
  cancel(id: number): Observable<Sale> {
    return this.http
      .patch<{ sale: Sale }>(`${this.baseUrl}/${id}/cancel`, {})
      .pipe(map((response) => response.sale));
  }
}
