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
import { Branch } from '../../../core/models/branch.model';
import { Client } from '../../../core/models/client.model';
import { Inventory } from '../../../core/models/inventory.model';
import { Product } from '../../../core/models/product.model';
import { SaleCreatePayload } from '../../../core/models/sale.model';
import { NotificationService } from '../../../core/services/notification.service';
import { toApiMessage } from '../../../core/utils/api-error';
import { BranchApi } from '../../branches/branch-api';
import { InventoryApi } from '../../inventory/inventory-api';
import { ProductApi } from '../../products/product-api';
import { SaleApi } from '../sale-api';

/** Producto vendible en la sucursal elegida: el producto + su existencia allí. */
interface SellableProduct {
  product: Product;
  /** inventories.quantity de (branchId, productId). */
  available: number;
  /** Texto del selector: "SKU · Nombre (disp. N)". */
  label: string;
}

/** valorUnitario es solo para mostrar el total estimado; el backend fija el precio real. */
interface SaleLine {
  product: Product;
  cantidad: number;
  valorUnitario: number;
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
    TableModule,
  ],
  templateUrl: './sale-form.html',
})
export class SaleForm {
  private readonly http = inject(HttpClient);
  private readonly branchApi = inject(BranchApi);
  private readonly inventoryApi = inject(InventoryApi);
  private readonly productApi = inject(ProductApi);
  private readonly saleApi = inject(SaleApi);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);

  readonly clients = signal<Client[]>([]);
  readonly branches = signal<Branch[]>([]);
  readonly products = signal<Product[]>([]);
  /** Inventario de la sucursal seleccionada. */
  readonly inventory = signal<Inventory[]>([]);
  readonly lines = signal<SaleLine[]>([]);
  readonly loading = signal(true);
  readonly loadingStock = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');

  clientId: number | null = null;
  readonly branchId = signal<number | null>(null);
  readonly selectedProductId = signal<number | null>(null);
  cantidad = 1;
  impuestos = 0;

  /** Productos activos con existencias > 0 en la sucursal elegida. */
  readonly sellable = computed<SellableProduct[]>(() => {
    const stock = new Map(this.inventory().map((row) => [row.productId, Number(row.quantity)]));

    return this.products()
      .filter((product) => product.status === 'active' && (stock.get(product.id) ?? 0) > 0)
      .map((product) => {
        const available = stock.get(product.id) ?? 0;
        return {
          product,
          available,
          label: `${product.sku} · ${product.name} (disp. ${available})`,
        };
      });
  });

  readonly selected = computed(() =>
    this.sellable().find((item) => item.product.id === this.selectedProductId()),
  );

  readonly subtotal = computed(() =>
    this.lines().reduce((sum, line) => sum + line.valorUnitario * line.cantidad, 0),
  );

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.error.set('');

    forkJoin({
      clients: this.http.get<{ clients: Client[] }>(`${environment.apiUrl}/clientes`),
      branches: this.branchApi.list(),
      products: this.productApi.list(),
    }).subscribe({
      next: ({ clients, branches, products }) => {
        this.clients.set((clients.clients ?? []).filter((client) => client.status === 'active'));
        this.branches.set(branches.filter((branch) => branch.status === 'active'));
        this.products.set(products);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.error.set(`No fue posible cargar clientes, sucursales y productos. ${toApiMessage(error)}`);
        this.loading.set(false);
      },
    });
  }

  /**
   * Al cambiar de sucursal se vacía la venta: el stock (y por tanto lo que
   * se puede vender) depende de la sucursal.
   */
  onBranchChange(branchId: number | null): void {
    this.branchId.set(branchId);
    this.lines.set([]);
    this.selectedProductId.set(null);
    this.inventory.set([]);

    if (branchId === null) return;

    this.loadingStock.set(true);
    this.inventoryApi.list({ branchId }).subscribe({
      next: (rows) => {
        this.inventory.set(rows);
        this.loadingStock.set(false);
      },
      error: (error: unknown) => {
        this.error.set(`No fue posible cargar el inventario de la sucursal. ${toApiMessage(error)}`);
        this.loadingStock.set(false);
      },
    });
  }

  addLine(): void {
    const item = this.selected();
    const cantidad = Number(this.cantidad);

    if (!this.branchId()) {
      this.error.set('Selecciona la sucursal antes de agregar productos.');
      return;
    }

    if (!item) {
      this.error.set('Selecciona un producto.');
      return;
    }

    if (!Number.isInteger(cantidad) || cantidad < 1) {
      this.error.set('La cantidad debe ser un número entero mayor que cero.');
      return;
    }

    const existing = this.lines().find((line) => line.product.id === item.product.id);
    const yaAgregado = existing?.cantidad ?? 0;

    if (yaAgregado + cantidad > item.available) {
      this.error.set(
        `Stock insuficiente para ${item.product.name} en esta sucursal. Disponible: ${item.available - yaAgregado}.`,
      );
      return;
    }

    if (existing) {
      this.lines.update((lines) =>
        lines.map((line) =>
          line.product.id === item.product.id
            ? { ...line, cantidad: line.cantidad + cantidad }
            : line,
        ),
      );
    } else {
      this.lines.update((lines) => [
        ...lines,
        { product: item.product, cantidad, valorUnitario: Number(item.product.price) },
      ]);
    }

    this.error.set('');
    this.selectedProductId.set(null);
    this.cantidad = 1;
  }

  removeLine(productId: number): void {
    this.lines.update((lines) => lines.filter((line) => line.product.id !== productId));
  }

  lineTotal(line: SaleLine): number {
    return line.valorUnitario * line.cantidad;
  }

  total(): number {
    return this.subtotal() + Number(this.impuestos || 0);
  }

  save(): void {
    const branchId = this.branchId();

    if (!this.clientId) {
      this.error.set('Selecciona un cliente.');
      return;
    }

    if (!branchId) {
      this.error.set('Selecciona una sucursal.');
      return;
    }

    if (this.lines().length === 0) {
      this.error.set('Agrega al menos un producto a la venta.');
      return;
    }

    if (Number(this.impuestos) < 0) {
      this.error.set('Los impuestos no pueden ser negativos.');
      return;
    }

    const payload: SaleCreatePayload = {
      clientId: this.clientId,
      branchId,
      impuestos: Number(this.impuestos || 0),
      items: this.lines().map((line) => ({
        productId: line.product.id,
        cantidad: line.cantidad,
      })),
    };

    this.saving.set(true);
    this.error.set('');

    this.saleApi.create(payload).subscribe({
      next: (sale) => {
        this.notification.success(`La venta #${sale.id} fue registrada correctamente.`);
        this.router.navigate(['/ventas']);
      },
      error: (error: unknown) => {
        this.error.set(toApiMessage(error));
        this.saving.set(false);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/ventas']);
  }
}
