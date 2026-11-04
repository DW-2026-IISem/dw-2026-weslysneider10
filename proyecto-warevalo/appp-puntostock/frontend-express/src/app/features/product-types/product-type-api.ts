import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import type {
  ProductType,
  ProductTypePayload,
} from '../../core/models/product-type.model';

@Injectable({ providedIn: 'root' })
export class ProductTypeApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/tipos-producto`;

  list(): Observable<ProductType[]> {
    return this.http
      .get<{ productTypes: ProductType[] }>(this.base)
      .pipe(map(response => response.productTypes ?? []));
  }

  get(id: number): Observable<ProductType> {
    return this.http
      .get<{ productType: ProductType }>(`${this.base}/${id}`)
      .pipe(map(response => response.productType));
  }

  create(payload: ProductTypePayload): Observable<ProductType> {
    return this.http
      .post<{ productType: ProductType }>(this.base, payload)
      .pipe(map(response => response.productType));
  }

  update(
    id: number,
    payload: Partial<ProductTypePayload>
  ): Observable<ProductType> {
    return this.http
      .patch<{ productType: ProductType }>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.productType));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
