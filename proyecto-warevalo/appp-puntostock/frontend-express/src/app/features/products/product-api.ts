import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import type {
  Product,
  ProductPayload,
  UpdateProductPayload,
} from '../../core/models/product.model';

type ApiProduct = Partial<Product> & {
  productTypeId?: number;
  minStock?: number;
};

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/productos`;

  private normalize(product: ApiProduct): Product {
    return {
      ...product,
      id: product.id ?? 0,
      product_type_id:
        product.product_type_id ?? product.productTypeId ?? 0,
      min_stock: product.min_stock ?? product.minStock ?? 0,
      quantity: product.quantity ?? 0,
    } as Product;
  }

  list(): Observable<Product[]> {
    return this.http
      .get<{ products: ApiProduct[] }>(this.base)
      .pipe(
        map(response =>
          (response.products ?? []).map(product => this.normalize(product))
        )
      );
  }

  get(id: number): Observable<Product> {
    return this.http
      .get<{ product: ApiProduct }>(`${this.base}/${id}`)
      .pipe(map(response => this.normalize(response.product)));
  }

  create(payload: ProductPayload): Observable<Product> {
    return this.http
      .post<{ product: ApiProduct }>(this.base, payload)
      .pipe(map(response => this.normalize(response.product)));
  }

  update(id: number, payload: UpdateProductPayload): Observable<Product> {
    return this.http
      .patch<{ product: ApiProduct }>(`${this.base}/${id}`, payload)
      .pipe(map(response => this.normalize(response.product)));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
