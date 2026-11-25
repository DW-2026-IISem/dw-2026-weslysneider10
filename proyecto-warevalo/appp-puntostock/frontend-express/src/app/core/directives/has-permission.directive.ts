import {
  Directive,
  EmbeddedViewRef,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input,
} from '@angular/core';

import { PermissionService } from '../services/permissions/permission.service';

interface PermissionRequirement {
  method: string;
  path: string;
}

const DENIED_TITLE = 'No tienes permiso para esta acción. Pídeselo al administrador.';

/**
 * *appHasPermission="{ method, path }"
 *
 * Política "ve todo, hace solo lo asignado": el elemento SIEMPRE se muestra;
 * si el usuario no tiene la concesión (method, path), queda deshabilitado,
 * atenuado y con un candado + tooltip explicando por qué.
 *
 * Es solo experiencia de usuario: la seguridad real la aplica el backend
 * (authorize responde 403 aunque alguien habilite el botón a mano).
 */
@Directive({
  selector: '[appHasPermission]',
  standalone: true,
})
export class HasPermissionDirective {
  readonly appHasPermission = input.required<PermissionRequirement>();

  private readonly permissionService = inject(PermissionService);
  private readonly template = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  private view: EmbeddedViewRef<unknown> | null = null;
  private denied = false;

  /**
   * Bloquea el clic en fase de captura cuando no hay permiso. Se ejecuta antes
   * que los (click) del elemento y de sus hijos, así que funciona aunque el
   * botón tenga su propio [disabled] que Angular vuelva a poner en false.
   */
  private readonly blockClick = (event: Event): void => {
    if (!this.denied) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  constructor() {
    effect(() => {
      const requirement = this.appHasPermission();
      const allowed = this.permissionService.hasPermission(requirement.method, requirement.path);

      if (!this.view) {
        this.view = this.viewContainer.createEmbeddedView(this.template);
      }

      this.denied = !allowed;
      for (const node of this.view.rootNodes) {
        if (node instanceof HTMLElement) {
          this.apply(node, allowed);
        }
      }
    });
  }

  private apply(element: HTMLElement, allowed: boolean): void {
    // <p-button> envuelve un <button>; un <button pButton> es el propio botón.
    const button =
      element instanceof HTMLButtonElement ? element : element.querySelector('button');

    // Solo se deshabilita; nunca se habilita aquí, para no pisar el [disabled]
    // propio del botón (ej. "ya cancelado").
    if (button && !allowed) {
      button.disabled = true;
    }

    if (!element.dataset['permissionGuarded']) {
      element.addEventListener('click', this.blockClick, true);
      element.dataset['permissionGuarded'] = 'true';
    }

    element.classList.toggle('permission-denied', !allowed);
    element.style.opacity = allowed ? '' : '0.55';
    element.style.cursor = allowed ? '' : 'not-allowed';

    if (allowed) {
      element.removeAttribute('title');
      element.removeAttribute('aria-disabled');
      element.querySelector(':scope > .permission-lock')?.remove();
    } else {
      element.setAttribute('title', DENIED_TITLE);
      element.setAttribute('aria-disabled', 'true');
      if (!element.querySelector(':scope > .permission-lock')) {
        const lock = document.createElement('i');
        lock.className = 'pi pi-lock permission-lock';
        lock.style.fontSize = '0.7rem';
        lock.style.marginLeft = '0.35rem';
        element.appendChild(lock);
      }
    }
  }
}
