import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoleApi } from '../role-api';
import { RoleI } from '../role.model';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './role-list.html',
})
export class RoleList implements OnInit {
  private readonly api = inject(RoleApi);

  roles: RoleI[] = [];
  name = '';
  description = '';
  error = '';
  loading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;

    this.api.getAll().subscribe({
      next: (response) => {
        this.roles = response.roles;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los roles.';
        this.loading = false;
      },
    });
  }

  save(): void {
    if (!this.name.trim()) {
      this.error = 'El nombre del rol es obligatorio.';
      return;
    }

    this.api
      .create({
        name: this.name.trim().toUpperCase(),
        description: this.description.trim(),
        status: 'active',
      })
      .subscribe({
        next: () => {
          this.name = '';
          this.description = '';
          this.error = '';
          this.load();
        },
        error: () => (this.error = 'No se pudo crear el rol.'),
      });
  }
}
