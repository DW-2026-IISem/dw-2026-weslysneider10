import { CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

import { Sale } from '../../../core/models/sale.model';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-sale-detail',
  standalone: true,
  imports: [CurrencyPipe, CardModule, TableModule],
  templateUrl: './sale-detail.html'
})
export class SaleDetail {
  readonly sale = input.required<Sale>();
  readonly products = input<Product[]>([]);

  readonly productName = computed(() => {
    const map = new Map(this.products().map(product => [product.id, product.name]));
    return (id: number) => map.get(id) ?? `Producto #${id}`;
  });

  readonly itemCount = computed(() =>
    (this.sale().items ?? []).reduce((sum, item) => sum + Number(item.quantity), 0)
  );
}
