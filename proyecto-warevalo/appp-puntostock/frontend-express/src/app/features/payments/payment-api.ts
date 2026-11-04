import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Payment, CreatePayment, UpdatePayment } from '../../core/models/payment.model';

interface PaymentsResponse {
  payments: Payment[];
}

interface PaymentResponse {
  payment: Payment;
}

@Injectable({ providedIn: 'root' })
export class PaymentApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/pagos`;

  list(): Observable<Payment[]> {
    return this.http.get<PaymentsResponse>(this.base)
      .pipe(map(response => response.payments));
  }

  getById(id: number): Observable<Payment> {
    return this.http.get<PaymentResponse>(`${this.base}/${id}`)
      .pipe(map(response => response.payment));
  }

  create(payload: CreatePayment): Observable<Payment> {
    return this.http.post<PaymentResponse>(this.base, payload)
      .pipe(map(response => response.payment));
  }

  update(id: number, payload: UpdatePayment): Observable<Payment> {
    return this.http.put<PaymentResponse>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.payment));
  }

  cancel(id: number): Observable<Payment> {
    return this.http.patch<{ payment: Payment }>(`${this.base}/${id}/cancel`, {})
      .pipe(map(response => response.payment));
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
