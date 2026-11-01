import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssignmentApi } from '../assignment-api';

@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './assignment-list.html'
})
export class AssignmentList implements OnInit {
  private readonly api = inject(AssignmentApi);

  assignments: any[] = [];
  userId: number | null = null;
  roleId: number | null = null;
  error = '';

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.getAll().subscribe({
      next: response => this.assignments = response.assignments,
      error: () => this.error = 'No se pudieron cargar las asignaciones.'
    });
  }

  save(): void {
    if (!this.userId || !this.roleId) {
      this.error = 'Debes ingresar el ID del usuario y del rol.';
      return;
    }

    this.api.create(this.userId, this.roleId).subscribe({
      next: () => {
        this.error = '';
        this.userId = null;
        this.roleId = null;
        this.load();
      },
      error: () => this.error = 'No se pudo crear la asignación.'
    });
  }
}
