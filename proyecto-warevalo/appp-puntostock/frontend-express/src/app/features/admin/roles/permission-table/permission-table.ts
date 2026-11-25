import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

import { ResourceI } from '../../resources/resource.model';

/** Nombre legible del módulo según el primer segmento de la ruta (/api/<módulo>/...). */
const MODULE_LABELS: Record<string, string> = {
  clientes: 'Clientes',
  sucursales: 'Sucursales',
  'tipos-producto': 'Tipos de producto',
  productos: 'Productos',
  proveedores: 'Proveedores',
  inventarios: 'Inventario',
  compras: 'Compras',
  ventas: 'Ventas',
  pagos: 'Pagos',
  devoluciones: 'Devoluciones',
  usuarios: 'Usuarios',
  roles: 'Roles',
  recursos: 'Recursos',
  'asignaciones-rol': 'Asignaciones usuario-rol',
  'concesiones-rol': 'Concesiones rol-recurso',
};

export function moduleOf(resource: ResourceI): string {
  return resource.path.split('/')[2] ?? 'otros';
}

export function moduleLabel(key: string): string {
  return MODULE_LABELS[key] ?? key;
}

interface Group {
  key: string;
  label: string;
  rows: ResourceI[];
}

/** Cambio emitido por la tabla: marcar (checked=true) o desmarcar estos ids. */
export interface PermissionToggle {
  ids: number[];
  checked: boolean;
}

/**
 * Tabla de permisos con casillas: una fila por recurso (método + ruta),
 * agrupada por módulo, con buscador, filtro de módulo y "solo marcados".
 *
 * - `checked`: ids marcados (editables).
 * - `locked`: ids que ya vienen concedidos por un rol -> se muestran marcados
 *   y bloqueados, con el nombre del rol en la columna "Origen".
 * - `disabled`: toda la tabla en solo lectura.
 *
 * No guarda nada: emite `toggled` y el padre decide.
 */
@Component({
  selector: 'app-permission-table',
  standalone: true,
  imports: [FormsModule, InputTextModule, SelectModule],
  templateUrl: './permission-table.html',
})
export class PermissionTable {
  readonly resources = input.required<ResourceI[]>();
  readonly checked = input.required<Set<number>>();
  readonly locked = input<Map<number, string[]>>(new Map());
  readonly disabled = input(false);
  /** Texto de "Origen" para las filas marcadas que no vienen de un rol. */
  readonly ownLabel = input('Individual');

  readonly toggled = output<PermissionToggle>();

  readonly search = signal('');
  readonly moduleFilter = signal<string | null>(null);
  readonly onlyChecked = signal(false);

  readonly activeResources = computed(() =>
    this.resources().filter((resource) => resource.status === 'active'),
  );

  readonly moduleOptions = computed(() => {
    const keys = [...new Set(this.activeResources().map(moduleOf))];
    return [
      { label: 'Todos los módulos', value: null as string | null },
      ...keys.map((key) => ({ label: moduleLabel(key), value: key as string | null })),
    ];
  });

  readonly groups = computed<Group[]>(() => {
    const q = this.search().trim().toLowerCase();
    const mod = this.moduleFilter();
    const only = this.onlyChecked();
    const map = new Map<string, Group>();

    for (const resource of this.activeResources()) {
      const key = moduleOf(resource);
      if (mod && key !== mod) continue;
      if (only && !this.isOn(resource)) continue;
      if (
        q &&
        ![resource.description, resource.path, resource.method, moduleLabel(key)].some((v) =>
          (v ?? '').toLowerCase().includes(q),
        )
      ) {
        continue;
      }
      if (!map.has(key)) map.set(key, { key, label: moduleLabel(key), rows: [] });
      map.get(key)!.rows.push(resource);
    }
    return [...map.values()];
  });

  readonly totalOn = computed(
    () => this.activeResources().filter((resource) => this.isOn(resource)).length,
  );

  readonly visibleCount = computed(() =>
    this.groups().reduce((sum, group) => sum + group.rows.length, 0),
  );

  isLocked(resource: ResourceI): boolean {
    return this.locked().has(resource.id!);
  }

  isOn(resource: ResourceI): boolean {
    return this.isLocked(resource) || this.checked().has(resource.id!);
  }

  origin(resource: ResourceI): string {
    const roles = this.locked().get(resource.id!);
    if (roles?.length) return `Rol ${roles.join(', ')}`;
    return this.checked().has(resource.id!) ? this.ownLabel() : '—';
  }

  /** Filas editables (no bloqueadas) de un conjunto. */
  private editable(rows: ResourceI[]): number[] {
    return rows.filter((row) => !this.isLocked(row)).map((row) => row.id!);
  }

  toggleRow(resource: ResourceI, checked: boolean): void {
    if (this.disabled() || this.isLocked(resource)) return;
    this.toggled.emit({ ids: [resource.id!], checked });
  }

  toggleGroup(group: Group, checked: boolean): void {
    if (this.disabled()) return;
    this.toggled.emit({ ids: this.editable(group.rows), checked });
  }

  /** Marca o desmarca todas las filas visibles (respeta filtros). */
  toggleVisible(checked: boolean): void {
    if (this.disabled()) return;
    this.toggled.emit({ ids: this.editable(this.groups().flatMap((g) => g.rows)), checked });
  }

  /** En un módulo: solo las consultas (GET) quedan marcadas. */
  onlyReads(group: Group): void {
    if (this.disabled()) return;
    const editable = group.rows.filter((row) => !this.isLocked(row));
    this.toggled.emit({
      ids: editable.filter((r) => r.method.toUpperCase() === 'GET').map((r) => r.id!),
      checked: true,
    });
    this.toggled.emit({
      ids: editable.filter((r) => r.method.toUpperCase() !== 'GET').map((r) => r.id!),
      checked: false,
    });
  }

  groupState(group: Group): 'all' | 'some' | 'none' {
    const on = group.rows.filter((row) => this.isOn(row)).length;
    if (on === 0) return 'none';
    return on === group.rows.length ? 'all' : 'some';
  }

  groupOn(group: Group): number {
    return group.rows.filter((row) => this.isOn(row)).length;
  }

  methodClass(method: string): string {
    switch (method.toUpperCase()) {
      case 'GET':
        return 'bg-sky-100 text-sky-800';
      case 'POST':
        return 'bg-emerald-100 text-emerald-800';
      case 'PUT':
      case 'PATCH':
        return 'bg-amber-100 text-amber-800';
      case 'DELETE':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  }
}
