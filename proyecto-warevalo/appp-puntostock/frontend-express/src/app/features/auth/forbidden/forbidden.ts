import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="flex min-h-[65vh] items-center justify-center p-6">
      <div class="max-w-lg text-center">
        <div class="mb-4 text-7xl font-bold text-red-500">403</div>

        <h1 class="mb-3 text-2xl font-bold text-slate-800">Acceso denegado</h1>

        <p class="mb-6 text-slate-600">
          No tienes los permisos necesarios para acceder a este recurso. Contacta al administrador
          si consideras que necesitas autorización.
        </p>

        <a
          routerLink="/construir"
          class="inline-flex rounded-lg bg-blue-600 px-5 py-3
                 font-semibold text-white hover:bg-blue-700"
        >
          Volver al inicio
        </a>
      </div>
    </section>
  `,
})
export class Forbidden {}
