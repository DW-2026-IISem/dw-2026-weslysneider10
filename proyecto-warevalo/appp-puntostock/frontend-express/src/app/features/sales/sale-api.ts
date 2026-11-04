import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Sale, SaleCreatePayload } from '../../core/models/sale.model';

interface ApiSaleDetail {
  id: number;
  saleId: number;
  productId: number;
  cantidad: number;
  valorUnitario: number | string;
  total: number | string;
  observaciones?: string | null;
  product?: { id: number; name: string };
}

interface ApiSale {
  id: number;
  clientId: number;
  branchId: number;
  fecha: string;
  subtotal: number | string;
  impuestos: number | string;
  total: number | string;
  estado: Sale['status'];
  createdAt?: string;
  updatedAt?: string;
  items?: ApiSaleDetail[];
}

@Injectable({ providedIn: 'root' })
export class SaleApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/ventas`;

  private normalize(raw: ApiSale): Sale {
    return {
      id: raw.id,
      client_id: raw.clientId,
      subtotal: raw.subtotal,
      tax: raw.impuestos,
      discounts: 0,
      total: raw.total,
      status: raw.estado,
      date: raw.fecha,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      items: raw.items?.map((item) => ({
        id: item.id,
        product_id: item.productId,
        quantity: item.cantidad,
        unit_price: item.valorUnitario,
        line_total: item.total,
        product: item.product,
      })),
    };
  }

  list(): Observable<Sale[]> {
    return this.http
      .get<{ sales: ApiSale[] } | ApiSale[]>(this.baseUrl)
      .pipe(
        map((response) => {
          const sales = Array.isArray(response)
            ? response
            : response.sales;

          return sales.map((sale) => this.normalize(sale));
        }),
      );
  }

  get(id: number): Observable<Sale> {
    return this.http
      .get<{ sale: ApiSale } | ApiSale>(`${this.baseUrl}/${id}`)
      .pipe(
        map((response) => {
          const sale = 'sale' in response ? response.sale : response;
          return this.normalize(sale);
        }),
      );
  }

  create(payload: SaleCreatePayload): Observable<Sale> {
    return this.http
      .post<{ sale: ApiSale } | ApiSale>(this.baseUrl, payload)
      .pipe(
        map((response) => {
          const sale = 'sale' in response ? response.sale : response;
          return this.normalize(sale);
        }),
      );
  }
}
