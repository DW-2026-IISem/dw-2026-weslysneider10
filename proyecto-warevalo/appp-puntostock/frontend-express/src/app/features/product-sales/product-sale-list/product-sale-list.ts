import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProductSaleApi } from '../product-sale-api';

@Component({
  selector: 'app-product-sale-list',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule],
  templateUrl: './product-sale-list.html',
})
export class ProductSaleList implements OnInit {
  private readonly api = inject(ProductSaleApi);

  productSales: any[] = [];
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadProductSales();
  }

  loadProductSales(): void {
    this.loading = true;
    this.errorMessage = '';

    this.api.list().subscribe({
      next: (data: any) => {
        this.productSales = Array.isArray(data)
          ? data
          : data?.data ?? [];
        this.loading = false;
      },
      error: (error: any) => {
        this.errorMessage =
          error?.error?.message ??
          'No se pudieron cargar los detalles de ventas.';
        this.loading = false;
      },
    });
  }
}
