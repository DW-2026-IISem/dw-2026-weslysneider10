import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import type {
  Product,
  CreateProduct,
  UpdateProduct,
  PatchProduct,
} from '../models/product.model';

interface ProductsResponse {
  products: Product[];
}

interface ProductResponse {
  product: Product;
}

interface DeactivateProductResponse {
  message: string;
  product: Product;
}

interface DeleteProductResponse {
  message: string;
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ProductApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/productos`;

  list(): Observable<Product[]> {
    return this.http.get<ProductsResponse>(this.base).pipe(
      map(response => response.products),
    );
  }

  getById(id: number): Observable<Product> {
    return this.http.get<ProductResponse>(`${this.base}/${id}`).pipe(
      map(response => response.product),
    );
  }

  create(payload: CreateProduct): Observable<Product> {
    return this.http.post<ProductResponse>(this.base, payload).pipe(
      map(response => response.product),
    );
  }

  update(id: number, payload: UpdateProduct): Observable<Product> {
    return this.http.put<ProductResponse>(`${this.base}/${id}`, payload).pipe(
      map(response => response.product),
    );
  }

  patch(id: number, payload: PatchProduct): Observable<Product> {
    return this.http.patch<ProductResponse>(`${this.base}/${id}`, payload).pipe(
      map(response => response.product),
    );
  }

  deactivate(id: number): Observable<DeactivateProductResponse> {
    return this.http.patch<DeactivateProductResponse>(
      `${this.base}/${id}/deactivate`,
      {},
    );
  }

  delete(id: number): Observable<DeleteProductResponse> {
    return this.http.delete<DeleteProductResponse>(`${this.base}/${id}`);
  }
}
