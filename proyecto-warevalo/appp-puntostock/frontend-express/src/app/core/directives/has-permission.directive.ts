import {
  Directive,
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

@Directive({
  selector: '[appHasPermission]',
  standalone: true,
})
export class HasPermissionDirective {
  readonly appHasPermission = input.required<PermissionRequirement>();

  private readonly permissionService = inject(PermissionService);
  private readonly template = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  private visible = false;

  constructor() {
    effect(() => {
      const requirement = this.appHasPermission();

      const allowed = this.permissionService.hasPermission(
        requirement.method,
        requirement.path,
      );

      if (allowed && !this.visible) {
        this.viewContainer.createEmbeddedView(this.template);
        this.visible = true;
      } else if (!allowed && this.visible) {
        this.viewContainer.clear();
        this.visible = false;
      }
    });
  }
}
