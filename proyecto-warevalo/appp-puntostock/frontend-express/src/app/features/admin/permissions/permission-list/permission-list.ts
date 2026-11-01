import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PermissionApi } from '../permission-api';

@Component({
  selector: 'app-permission-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './permission-list.html',
})
export class PermissionList implements OnInit {
  private readonly api = inject(PermissionApi);

  grants: any[] = [];
  roleId: number | null = null;
  resourceId: number | null = null;
  error = '';

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.getAll().subscribe({
      next: (response) => (this.grants = response.grants),
      error: () => (this.error = 'No se pudieron cargar los permisos.'),
    });
  }

  save(): void {
    if (!this.roleId || !this.resourceId) {
      this.error = 'Debes ingresar el ID del rol y del recurso.';
      return;
    }

    this.api.create(this.roleId, this.resourceId).subscribe({
      next: () => {
        this.error = '';
        this.roleId = null;
        this.resourceId = null;
        this.load();
      },
      error: () => (this.error = 'No se pudo crear la concesión.'),
    });
  }
}
