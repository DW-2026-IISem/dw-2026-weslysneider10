import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

import { environment } from '../../../../environments/environment';
import { Client } from '../../../core/models/client.model';
import { Product } from '../../../core/models/product.model';
import { SaleCreatePayload } from '../../../core/models/sale.model';
import { NotificationService } from '../../../core/services/notification.service';
import { ProductApi } from '../../products/product-api';
import { SaleApi } from '../sale-api';

interface SaleLine {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-sale-form',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyPipe,
    ButtonModule,
    CardModule,
    InputNumberModule,
    MessageModule,
    SelectModule,
    TableModule
  ],
  templateUrl: './sale-form.html'
})
export class SaleForm {
  private readonly http = inject(HttpClient);
  private readonly productApi = inject(ProductApi);
  private readonly saleApi = inject(SaleApi);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);

  readonly clients = signal<Client[]>([]);
  readonly products = signal<Product[]>([]);
  readonly lines = signal<SaleLine[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal('');

  clientId: number | null = null;
  selectedProductId: number | null = null;
  quantity = 1;
  tax = 0;
  discounts = 0;

  readonly subtotal = computed(() =>
    this.lines().reduce(
      (sum, line) => sum + Number(line.product.price) * line.quantity,
      0
    )
  );

  readonly total = computed(() =>
    Math.max(0, this.subtotal() + Number(this.tax || 0) - Number(this.discounts || 0))
  );

  readonly selectedProduct = computed(() =>
    this.products().find(product => product.id === this.selectedProductId)
  );

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.error.set('');

    forkJoin({
      clients: this.http.get<{ clients: Client[] } | Client[]>(
        `${environment.apiUrl}/clientes`
      ),
      products: this.productApi.list()
    }).subscribe({
      next: ({ clients, products }) => {
        const clientList = Array.isArray(clients) ? clients : clients.clients;

        this.clients.set(clientList.filter(client =>
          String(client.status).toLowerCase() === 'active'
        ));

        this.products.set(products.filter(product =>
          String(product.status).toLowerCase() === 'active' &&
          Number(product.quantity) > 0
        ));

        this.loading.set(false);
      },
      error: () => {
        this.error.set('No fue posible cargar los clientes y productos.');
        this.loading.set(false);
      }
    });
  }

  addLine(): void {
    const product = this.selectedProduct();
    const qty = Number(this.quantity);

    if (!this.clientId) {
      this.error.set('Selecciona un cliente antes de agregar productos.');
      return;
    }

    if (!product) {
      this.error.set('Selecciona un producto.');
      return;
    }

    if (!Number.isInteger(qty) || qty < 1) {
      this.error.set('La cantidad debe ser un número entero mayor que cero.');
      return;
    }

    const existing = this.lines().find(line => line.product.id === product.id);
    const currentQuantity = existing?.quantity ?? 0;

    if (currentQuantity + qty > Number(product.quantity)) {
      this.error.set(
        `Stock insuficiente para ${product.name}. Disponible: ${Number(product.quantity) - currentQuantity}.`
      );
      return;
    }

    if (existing) {
      this.lines.update(lines =>
        lines.map(line =>
          line.product.id === product.id
            ? { ...line, quantity: line.quantity + qty }
            : line
        )
      );
    } else {
      this.lines.update(lines => [...lines, { product, quantity: qty }]);
    }

    this.error.set('');
    this.selectedProductId = null;
    this.quantity = 1;
  }

  removeLine(productId: number): void {
    this.lines.update(lines =>
      lines.filter(line => line.product.id !== productId)
    );
  }

  lineTotal(line: SaleLine): number {
    return Number(line.product.price) * line.quantity;
  }

  save(): void {
    if (!this.clientId) {
      this.error.set('Selecciona un cliente.');
      return;
    }

    if (this.lines().length === 0) {
      this.error.set('Agrega al menos un producto a la venta.');
      return;
    }

    if (Number(this.tax) < 0 || Number(this.discounts) < 0) {
      this.error.set('Los impuestos y descuentos no pueden ser negativos.');
      return;
    }

    if (Number(this.discounts) > this.subtotal() + Number(this.tax)) {
      this.error.set('El descuento no puede superar el subtotal más los impuestos.');
      return;
    }

    const payload: SaleCreatePayload = {
      client_id: this.clientId,
      tax: Number(this.tax || 0),
      discounts: Number(this.discounts || 0),
      items: this.lines().map(line => ({
        product_id: line.product.id,
        quantity: line.quantity
      }))
    };

    this.saving.set(true);
    this.error.set('');

    this.saleApi.create(payload).subscribe({
      next: () => {
        this.notification.success('La venta fue registrada correctamente.');
        this.router.navigate(['/ventas']);
      },
      error: response => {
        this.error.set(
          response?.error?.message ?? 'No fue posible registrar la venta.'
        );
        this.saving.set(false);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/ventas']);
  }
}
