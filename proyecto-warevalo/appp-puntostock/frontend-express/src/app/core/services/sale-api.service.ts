import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Sale, SaleStatus } from '../models/sale.model';

export interface CreateSaleItem {
  productId: number;
  cantidad: number;
  valorUnitario: number;
  observaciones?: string;
}

export interface CreateSalePayload {
  clientId: number;
  branchId: number;
  impuestos?: number;
  items: CreateSaleItem[];
}

interface SalesResponse {
  sales: Sale[];
}

interface SaleResponse {
  sale: Sale;
}

@Injectable({ providedIn: 'root' })
export class SaleApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/ventas`;

  list(filters?: {
    clientId?: number;
    branchId?: number;
    estado?: SaleStatus;
  }): Observable<Sale[]> {
    let params = new HttpParams();

    if (filters?.clientId !== undefined) {
      params = params.set('clientId', String(filters.clientId));
    }

    if (filters?.branchId !== undefined) {
      params = params.set('branchId', String(filters.branchId));
    }

    if (filters?.estado) {
      params = params.set('estado', filters.estado);
    }

    return this.http.get<SalesResponse>(this.base, { params }).pipe(
      map(response => response.sales),
    );
  }

  getById(id: number): Observable<Sale> {
    return this.http.get<SaleResponse>(`${this.base}/${id}`).pipe(
      map(response => response.sale),
    );
  }

  create(payload: CreateSalePayload): Observable<Sale> {
    return this.http.post<SaleResponse>(this.base, payload).pipe(
      map(response => response.sale),
    );
  }

  cancel(id: number): Observable<Sale> {
    return this.http.patch<SaleResponse>(
      `${this.base}/${id}/cancel`,
      {},
    ).pipe(map(response => response.sale));
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
