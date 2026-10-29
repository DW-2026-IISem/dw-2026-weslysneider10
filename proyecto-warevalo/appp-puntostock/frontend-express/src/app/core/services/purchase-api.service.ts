import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import type {
  Purchase,
  PurchaseDetail,
  PurchaseStatus,
} from '../models/purchase.model';

export interface CreatePurchaseItem {
  productId: number;
  cantidad: number;
  valorUnitario: number;
  observaciones?: string;
}

export interface CreatePurchasePayload {
  supplierId: number;
  branchId: number;
  impuestos?: number;
  items: CreatePurchaseItem[];
}

export interface ReceivePurchasePayload {
  items: Array<{
    productId: number;
    cantidad: number;
  }>;
}

export interface PurchaseWithDetails extends Purchase {
  details?: PurchaseDetail[];
}

interface PurchasesResponse {
  purchases: Purchase[];
}

interface PurchaseResponse {
  purchase: PurchaseWithDetails;
}

@Injectable({ providedIn: 'root' })
export class PurchaseApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/compras`;

  list(filters?: {
    supplierId?: number;
    branchId?: number;
    estado?: PurchaseStatus;
  }): Observable<Purchase[]> {
    let params = new HttpParams();

    if (filters?.supplierId !== undefined) {
      params = params.set('supplierId', String(filters.supplierId));
    }

    if (filters?.branchId !== undefined) {
      params = params.set('branchId', String(filters.branchId));
    }

    if (filters?.estado) {
      params = params.set('estado', filters.estado);
    }

    return this.http.get<PurchasesResponse>(this.base, { params }).pipe(
      map(response => response.purchases),
    );
  }

  getById(id: number): Observable<PurchaseWithDetails> {
    return this.http.get<PurchaseResponse>(`${this.base}/${id}`).pipe(
      map(response => response.purchase),
    );
  }

  create(payload: CreatePurchasePayload): Observable<PurchaseWithDetails> {
    return this.http.post<PurchaseResponse>(this.base, payload).pipe(
      map(response => response.purchase),
    );
  }

  receive(
    id: number,
    payload: ReceivePurchasePayload,
  ): Observable<PurchaseWithDetails> {
    return this.http.patch<PurchaseResponse>(
      `${this.base}/${id}/receive`,
      payload,
    ).pipe(map(response => response.purchase));
  }

  cancel(id: number): Observable<PurchaseWithDetails> {
    return this.http.patch<PurchaseResponse>(
      `${this.base}/${id}/cancel`,
      {},
    ).pipe(map(response => response.purchase));
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
