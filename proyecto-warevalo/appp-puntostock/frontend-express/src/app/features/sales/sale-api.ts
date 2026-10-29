import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Sale, SaleCreatePayload } from '../../core/models/sale.model';

@Injectable({ providedIn: 'root' })
export class SaleApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/ventas`;

  list(): Observable<Sale[]> {
    return this.http.get<{ sales: Sale[] } | Sale[]>(this.baseUrl).pipe(
      map(response => Array.isArray(response) ? response : response.sales)
    );
  }

  get(id: number): Observable<Sale> {
    return this.http.get<{ sale: Sale } | Sale>(`${this.baseUrl}/${id}`).pipe(
      map(response => 'sale' in response ? response.sale : response)
    );
  }

  create(payload: SaleCreatePayload): Observable<Sale> {
    return this.http.post<{ sale: Sale } | Sale>(this.baseUrl, payload).pipe(
      map(response => 'sale' in response ? response.sale : response)
    );
  }
}
