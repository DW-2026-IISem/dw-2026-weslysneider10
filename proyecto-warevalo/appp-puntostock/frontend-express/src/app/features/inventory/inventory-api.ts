import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Inventory, CreateInventory, UpdateInventory } from '../../core/models/inventory.model';

interface InventoriesResponse {
  inventories: Inventory[];
}

interface InventoryResponse {
  inventory: Inventory;
}

@Injectable({ providedIn: 'root' })
export class InventoryApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/inventarios`;

  list(filters?: { branchId?: number; productId?: number }): Observable<Inventory[]> {
    let params = new HttpParams();

    if (filters?.branchId !== undefined) {
      params = params.set('branchId', String(filters.branchId));
    }

    if (filters?.productId !== undefined) {
      params = params.set('productId', String(filters.productId));
    }

    return this.http.get<InventoriesResponse>(this.base, { params })
      .pipe(map(response => response.inventories));
  }

  lowStock(branchId?: number): Observable<Inventory[]> {
    let params = new HttpParams();

    if (branchId !== undefined) {
      params = params.set('branchId', String(branchId));
    }

    return this.http.get<InventoriesResponse>(`${this.base}/low-stock`, { params })
      .pipe(map(response => response.inventories));
  }

  getById(id: number): Observable<Inventory> {
    return this.http.get<InventoryResponse>(`${this.base}/${id}`)
      .pipe(map(response => response.inventory));
  }

  create(payload: CreateInventory): Observable<Inventory> {
    return this.http.post<InventoryResponse>(this.base, payload)
      .pipe(map(response => response.inventory));
  }

  update(id: number, payload: UpdateInventory): Observable<Inventory> {
    return this.http.put<InventoryResponse>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.inventory));
  }

  patch(id: number, payload: Partial<UpdateInventory>): Observable<Inventory> {
    return this.http.patch<InventoryResponse>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.inventory));
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
