import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResourceApi } from '../resource-api';
import { ResourceI } from '../resource.model';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './resource-list.html'
})
export class ResourceList implements OnInit {
  private readonly api = inject(ResourceApi);

  resources: ResourceI[] = [];
  path = '';
  method = 'GET';
  description = '';
  error = '';

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.getAll().subscribe({
      next: response => this.resources = response.resources,
      error: () => this.error = 'No se pudieron cargar los recursos.'
    });
  }

  save(): void {
    if (!this.path.startsWith('/')) {
      this.error = 'La ruta debe comenzar con /.';
      return;
    }

    this.api.create({
      path: this.path.trim(),
      method: this.method,
      description: this.description.trim(),
      status: 'active'
    }).subscribe({
      next: () => {
        this.path = '';
        this.description = '';
        this.error = '';
        this.load();
      },
      error: () => this.error = 'No se pudo crear el recurso.'
    });
  }
}
