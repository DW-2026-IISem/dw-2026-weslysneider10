import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Product, ProductPayload } from '../../core/models/product.model';

/**
 * Cliente HTTP de /api/productos.
 * El frontend usa los mismos nombres de campo que el backend,
 * así que no hace falta traducir nada.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/productos`;

  list(): Observable<Product[]> {
    return this.http
      .get<{ products: Product[] }>(this.base)
      .pipe(map((response) => response.products ?? []));
  }

  get(id: number): Observable<Product> {
    return this.http
      .get<{ product: Product }>(`${this.base}/${id}`)
      .pipe(map((response) => response.product));
  }

  create(payload: ProductPayload): Observable<Product> {
    return this.http
      .post<{ product: Product }>(this.base, payload)
      .pipe(map((response) => response.product));
  }

  /** PUT: el formulario envía el producto completo (sku, name, price, productTypeId...). */
  update(id: number, payload: ProductPayload): Observable<Product> {
    return this.http
      .put<{ product: Product }>(`${this.base}/${id}`, payload)
      .pipe(map((response) => response.product));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
