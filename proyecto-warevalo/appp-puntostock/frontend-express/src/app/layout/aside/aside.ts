import { Location } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-aside',
  host: {
    class: 'block h-full',
  },
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {
  private readonly location = inject(Location);

  readonly appName = input('PuntoStock Express');
  readonly items = input<MenuItem[]>([]);
  readonly navigated = output<void>();

  readonly expandedSections = signal<string[]>([
    'Principal',
    'Gestión comercial',
    'Operaciones',
    'Informes',
    'Administración',
  ]);

  toggleSection(label: string): void {
    this.expandedSections.update(sections =>
      sections.includes(label)
        ? sections.filter(section => section !== label)
        : [...sections, label],
    );
  }

  isExpanded(label: string): boolean {
    return this.expandedSections().includes(label);
  }

  onNavigation(): void {
    this.navigated.emit();
  }

  goBack(): void {
    this.location.back();
  }
}
