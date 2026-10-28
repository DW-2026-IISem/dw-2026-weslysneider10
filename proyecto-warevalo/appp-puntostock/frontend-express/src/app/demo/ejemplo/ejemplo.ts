import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

interface Producto {
  nombre: string;
  precio: number;
  activo: boolean;
}

function productoInicial(): Producto {
  return {
    nombre: 'Café molido 500 g',
    precio: 18000,
    activo: true,
  };
}

@Component({
  selector: 'app-ejemplo',
  standalone: true,
  host: {
    class: 'block',
  },
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TagModule,
    InputTextModule,
    MessageModule,
  ],
  templateUrl: './ejemplo.html',
  styleUrl: './ejemplo.css',
})
export class Ejemplo {
  readonly producto = signal<Producto>(productoInicial());

  readonly iva = computed(() => this.producto().precio * 1.19);

  readonly estadoTexto = computed(() =>
    this.producto().activo ? 'Activo' : 'Inactivo'
  );

  readonly estadoSeverity = computed<
    'success' | 'danger'
  >(() => (this.producto().activo ? 'success' : 'danger'));

  readonly vistaPrevia = computed(
    () => `Vista previa: ${this.producto().nombre}`
  );

  constructor() {
    effect(() => {
      console.log(
        '[ejemplo]',
        this.producto().nombre,
        'precio',
        this.producto().precio
      );
    });
  }

  protected aumentarPrecio(): void {
    this.producto.update((producto) => ({
      ...producto,
      precio: producto.precio + 1000,
    }));
  }

  protected disminuirPrecio(): void {
    this.producto.update((producto) => ({
      ...producto,
      precio: Math.max(0, producto.precio - 1000),
    }));
  }

  protected cambiarEstado(): void {
    this.producto.update((producto) => ({
      ...producto,
      activo: !producto.activo,
    }));
  }

  protected cambiarNombre(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.producto.update((producto) => ({
      ...producto,
      nombre: input.value,
    }));
  }

  protected reiniciar(): void {
    this.producto.set(productoInicial());
  }
}
