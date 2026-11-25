import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';

import { SessionStore } from '../../../../core/services/auth/session.store';
import { NotificationService } from '../../../../core/services/notification.service';
import { toApiMessage } from '../../../../core/utils/api-error';
import { PageHeader } from '../../../../shared/ui/page-header/page-header';
import { ResourceApi } from '../../resources/resource-api';
import { ResourceI } from '../../resources/resource.model';
import { UserApi } from '../../users/user-api';
import { AdminUser, UserStatus } from '../../users/user.model';
import { AccessApi } from '../access-api';
import {
  PermissionTable,
  PermissionToggle,
  moduleLabel,
  moduleOf,
} from '../permission-table/permission-table';
import { RoleApi } from '../role-api';
import { RoleI } from '../role.model';

type Tab = 'usuarios' | 'permisos' | 'roles';
type Step = 1 | 2 | 3;

/** Rol que no se edita desde el panel: siempre tiene todos los permisos. */
const ADMIN_ROLE = 'ADMIN';

/** Contenido de la ventana emergente de confirmación. */
interface SuccessDialog {
  title: string;
  message: string;
  details: Array<{ label: string; value: string }>;
  /** Permisos por módulo (ej. Clientes: 2). Vacío = todos (ADMIN). */
  modules: Array<{ label: string; count: number }>;
  /** Muestra el botón "Crear otro usuario". */
  offerNewUser: boolean;
}

const EMPTY_USER = {
  username: '',
  email: '',
  password: '',
  avatar: '',
  status: 'active' as UserStatus,
};

/**
 * Panel de roles y accesos (/admin/roles) — solo ADMIN.
 *
 * Pestaña "Usuarios y accesos": asistente en tres pasos.
 *   1. Datos   -> crea el usuario (o edita uno existente).
 *   2. Rol     -> elige un rol existente o crea uno nuevo para él.
 *   3. Permisos-> tabla con todos los permisos: se marca qué puede hacer
 *                 ese rol. Al guardar, se guardan los permisos del rol y
 *                 se asigna el rol al usuario.
 *
 * Pestaña "Permisos por rol": la misma tabla para editar cualquier rol.
 * Pestaña "Roles": crear y listar roles.
 */
@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    MessageModule,
    SelectModule,
    TagModule,
    PageHeader,
    PermissionTable,
  ],
  templateUrl: './role-list.html',
})
export class RoleList implements OnInit {
  private readonly roleApi = inject(RoleApi);
  private readonly userApi = inject(UserApi);
  private readonly resourceApi = inject(ResourceApi);
  private readonly accessApi = inject(AccessApi);
  private readonly session = inject(SessionStore);
  private readonly notifications = inject(NotificationService);

  readonly tab = signal<Tab>('usuarios');
  /** Ventana emergente "¡Listo!" tras guardar. null = cerrada. */
  readonly success = signal<SuccessDialog | null>(null);
  readonly loading = signal(true);
  readonly error = signal('');

  readonly roles = signal<RoleI[]>([]);
  readonly users = signal<AdminUser[]>([]);
  readonly resources = signal<ResourceI[]>([]);
  /** Permisos de cada rol (role_id -> resource_ids). */
  readonly rolePerms = signal<Map<number, Set<number>>>(new Map());

  readonly activeRoles = computed(() => this.roles().filter((role) => role.status === 'active'));
  readonly currentUserId = computed(() => this.session.profile()?.id ?? null);

  // ═══════════════ Asistente de usuario ═══════════════
  readonly step = signal<Step>(1);
  /** null = usuario nuevo. */
  readonly selectedUserId = signal<number | null>(null);
  readonly selectedUser = computed(() => this.users().find((u) => u.id === this.selectedUserId()));
  readonly editingSelf = computed(
    () => this.selectedUserId() !== null && this.selectedUserId() === this.currentUserId(),
  );

  form = { ...EMPTY_USER };
  readonly savingData = signal(false);

  /** Paso 2: 'existing' = elegir un rol; 'new' = crear uno para este usuario. */
  readonly roleMode = signal<'existing' | 'new'>('new');
  readonly chosenRoleId = signal<number | null>(null);
  readonly chosenRole = computed(() => this.roles().find((r) => r.id === this.chosenRoleId()));
  readonly chosenIsAdmin = computed(() => this.chosenRole()?.name.toUpperCase() === ADMIN_ROLE);
  newUserRole = { name: '', description: '' };
  readonly savingRoleStep = signal(false);

  /** Paso 3: permisos marcados para el rol elegido. */
  readonly wizardChecked = signal<Set<number>>(new Set());
  readonly savingWizard = signal(false);

  readonly userOptions = computed(() => [
    { label: '➕ Nuevo usuario', value: null as number | null },
    ...this.users().map((user) => ({
      label: `${user.username} · ${user.email}`,
      value: user.id as number | null,
    })),
  ]);

  // ═══════════════ Permisos por rol ═══════════════
  readonly selectedRoleId = signal<number | null>(null);
  readonly roleChecked = signal<Set<number>>(new Set());
  readonly savingPerms = signal(false);
  readonly selectedRole = computed(() =>
    this.roles().find((role) => role.id === this.selectedRoleId()),
  );
  readonly roleIsAdmin = computed(() => this.selectedRole()?.name.toUpperCase() === ADMIN_ROLE);

  // ═══════════════ Roles ═══════════════
  newRole = { name: '', description: '' };
  readonly savingRole = signal(false);

  readonly statusOptions = [
    { label: 'Activo', value: 'active' },
    { label: 'Inactivo', value: 'inactive' },
  ];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading.set(true);
    this.error.set('');

    forkJoin({
      roles: this.roleApi.getAll(),
      users: this.userApi.list(),
      resources: this.resourceApi.getAll(),
    })
      .pipe(
        switchMap(({ roles, users, resources }) => {
          this.roles.set(roles.roles);
          this.users.set(users);
          this.resources.set(resources.resources);
          return this.loadRolePerms(roles.roles);
        }),
      )
      .subscribe({
        next: (permsByRole) => {
          this.rolePerms.set(permsByRole);
          this.loading.set(false);
        },
        error: (error: unknown) => {
          this.error.set(`No se pudieron cargar roles, usuarios y permisos. ${toApiMessage(error)}`);
          this.loading.set(false);
        },
      });
  }

  private loadRolePerms(roles: RoleI[]): Observable<Map<number, Set<number>>> {
    const active = roles.filter((r) => r.status === 'active' && r.id != null);
    if (active.length === 0) return of(new Map());
    return forkJoin(
      active.map((role) =>
        this.accessApi
          .getRolePermissions(role.id!)
          .pipe(map((ids) => [role.id!, new Set(ids)] as [number, Set<number>])),
      ),
    ).pipe(map((pairs) => new Map(pairs)));
  }

  // ─────────────── Paso 1: datos ───────────────
  onUserChange(userId: number | null): void {
    this.selectedUserId.set(userId);
    this.step.set(1);
    this.chosenRoleId.set(null);
    this.wizardChecked.set(new Set());
    this.newUserRole = { name: '', description: '' };

    const user = this.users().find((u) => u.id === userId);
    this.form = user
      ? {
          username: user.username,
          email: user.email,
          password: '',
          avatar: user.avatar ?? '',
          status: user.status,
        }
      : { ...EMPTY_USER };
  }

  private validData(isNew: boolean): boolean {
    if (this.form.username.trim().length < 3) {
      this.notifications.warn('El usuario debe tener al menos 3 caracteres.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email.trim())) {
      this.notifications.warn('Ingresa un email válido.');
      return false;
    }
    if (isNew && this.form.password.length < 8) {
      this.notifications.warn('La contraseña debe tener al menos 8 caracteres.');
      return false;
    }
    return true;
  }

  /** Crea el usuario (nuevo) o guarda sus datos (existente) y pasa al paso 2. */
  saveDataAndContinue(): void {
    const userId = this.selectedUserId();
    if (!this.validData(userId === null)) return;

    this.savingData.set(true);
    const avatar = this.form.avatar.trim() || null;

    const request =
      userId === null
        ? this.userApi.create({
            username: this.form.username.trim(),
            email: this.form.email.trim(),
            password: this.form.password,
            avatar,
            // Activo siempre: un usuario inactivo no puede recibir roles ni iniciar sesión.
            status: 'active',
          })
        : this.userApi.update(userId, {
            username: this.form.username.trim(),
            email: this.form.email.trim(),
            avatar,
          });

    request.subscribe({
      next: (user) => {
        this.savingData.set(false);
        this.users.update((list) =>
          list.some((u) => u.id === user.id)
            ? list.map((u) => (u.id === user.id ? user : u))
            : [...list, user],
        );
        this.notifications.success(
          userId === null
            ? `Usuario "${user.username}" creado. Ahora define su rol.`
            : 'Datos del usuario guardados.',
        );
        this.selectedUserId.set(user.id);
        this.goToRole();
      },
      error: (error: unknown) => {
        this.notifications.error(toApiMessage(error));
        this.savingData.set(false);
      },
    });
  }

  // ─────────────── Paso 2: rol ───────────────
  /** Abre el paso 2; para un usuario existente preselecciona su rol actual. */
  goToRole(): void {
    const userId = this.selectedUserId();
    if (userId === null) return;
    this.step.set(2);

    const user = this.selectedUser();
    // Sugerencia de nombre para un rol propio: el usuario en MAYÚSCULAS.
    if (!this.newUserRole.name && user) {
      this.newUserRole = {
        name: user.username.replace(/[^a-zA-Z0-9]+/g, '_').toUpperCase(),
        description: `Rol de ${user.username}`,
      };
    }

    this.accessApi.getUserRoles(userId).subscribe({
      next: (ids) => {
        if (ids.length > 0) {
          this.roleMode.set('existing');
          this.chosenRoleId.set(ids[0]);
        } else {
          this.roleMode.set('new');
        }
      },
      error: (error: unknown) => this.notifications.error(toApiMessage(error)),
    });
  }

  /** Confirma el rol (creándolo si es nuevo) y pasa a la tabla de permisos. */
  confirmRole(): void {
    if (this.roleMode() === 'existing') {
      const roleId = this.chosenRoleId();
      if (roleId === null) {
        this.notifications.warn('Selecciona un rol.');
        return;
      }
      this.openPermissions(roleId);
      return;
    }

    const name = this.newUserRole.name.trim().toUpperCase();
    if (!name) {
      this.notifications.warn('Escribe el nombre del rol.');
      return;
    }

    this.savingRoleStep.set(true);
    this.roleApi
      .create({ name, description: this.newUserRole.description.trim(), status: 'active' })
      .subscribe({
        next: ({ role }) => {
          this.roles.update((list) => [...list, role]);
          this.rolePerms.update((m) => new Map(m).set(role.id!, new Set()));
          this.notifications.success(`Rol ${role.name} creado. Ahora marca sus permisos.`);
          this.savingRoleStep.set(false);
          this.roleMode.set('existing');
          this.chosenRoleId.set(role.id!);
          this.openPermissions(role.id!);
        },
        error: (error: unknown) => {
          this.notifications.error(toApiMessage(error));
          this.savingRoleStep.set(false);
        },
      });
  }

  private openPermissions(roleId: number): void {
    this.chosenRoleId.set(roleId);
    this.wizardChecked.set(new Set(this.rolePerms().get(roleId) ?? []));
    this.step.set(3);
  }

  // ─────────────── Paso 3: permisos ───────────────
  onWizardToggle(change: PermissionToggle): void {
    this.wizardChecked.update((set) => withIds(set, change.ids, change.checked));
  }

  /** Guarda los permisos del rol y asigna el rol al usuario. */
  finishWizard(): void {
    const userId = this.selectedUserId();
    const roleId = this.chosenRoleId();
    if (userId === null || roleId === null) return;

    const ids = [...this.wizardChecked()];
    // ADMIN no se edita (el backend lo rechaza): solo se le asigna el rol.
    const savePerms$: Observable<unknown> = this.chosenIsAdmin()
      ? of(null)
      : this.accessApi.setRolePermissions(roleId, ids);

    this.savingWizard.set(true);
    savePerms$
      .pipe(switchMap(() => this.accessApi.setUserRoles(userId, [roleId])))
      .subscribe({
        next: () => {
          if (!this.chosenIsAdmin()) {
            this.rolePerms.update((m) => new Map(m).set(roleId, new Set(ids)));
          }
          const user = this.selectedUser();
          const role = this.chosenRole();
          this.success.set({
            title: '¡Listo! Usuario configurado',
            message: `${user?.username} ya puede iniciar sesión. Verá todo el sistema, pero solo podrá hacer lo que se marcó.`,
            details: [
              { label: 'Usuario', value: user?.username ?? '' },
              { label: 'Email', value: user?.email ?? '' },
              { label: 'Rol asignado', value: role?.name ?? '' },
              {
                label: 'Permisos',
                value: this.chosenIsAdmin()
                  ? `Todos (${this.totalPermissions()})`
                  : `${ids.length} de ${this.totalPermissions()}`,
              },
            ],
            modules: this.chosenIsAdmin() ? [] : this.summarizeModules(ids),
            offerNewUser: true,
          });
          this.savingWizard.set(false);
        },
        error: (error: unknown) => {
          this.notifications.error(toApiMessage(error));
          this.savingWizard.set(false);
        },
      });
  }

  newUser(): void {
    this.onUserChange(null);
  }

  /** "Crear otro usuario" desde la ventana emergente. */
  closeSuccessAndNewUser(): void {
    this.success.set(null);
    this.tab.set('usuarios');
    this.newUser();
  }

  /** Cuántos permisos marcados hay por módulo (para el resumen). */
  private summarizeModules(ids: number[]): Array<{ label: string; count: number }> {
    const wanted = new Set(ids);
    const counts = new Map<string, number>();
    for (const resource of this.resources()) {
      if (!wanted.has(resource.id!)) continue;
      const label = moduleLabel(moduleOf(resource));
      counts.set(label, (counts.get(label) ?? 0) + 1);
    }
    return [...counts.entries()].map(([label, count]) => ({ label, count }));
  }

  // ═══════════════ Permisos por rol ═══════════════
  onRoleChange(roleId: number | null): void {
    this.selectedRoleId.set(roleId);
    this.roleChecked.set(new Set(roleId !== null ? (this.rolePerms().get(roleId) ?? []) : []));
  }

  onRolePermToggle(change: PermissionToggle): void {
    this.roleChecked.update((set) => withIds(set, change.ids, change.checked));
  }

  savePermissions(): void {
    const roleId = this.selectedRoleId();
    if (roleId === null || this.roleIsAdmin()) return;

    const ids = [...this.roleChecked()];
    this.savingPerms.set(true);
    this.accessApi.setRolePermissions(roleId, ids).subscribe({
      next: (result) => {
        this.rolePerms.update((m) => new Map(m).set(roleId, new Set(ids)));
        this.success.set({
          title: '¡Listo! Permisos guardados',
          message: `Los usuarios con el rol ${this.selectedRole()?.name} ya tienen estos permisos (al volver a iniciar sesión o refrescar).`,
          details: [
            { label: 'Rol', value: this.selectedRole()?.name ?? '' },
            { label: 'Permisos activos', value: `${result.total_active} de ${this.totalPermissions()}` },
            { label: 'Concedidos ahora', value: String(result.activated) },
            { label: 'Retirados ahora', value: String(result.deactivated) },
          ],
          modules: this.summarizeModules(ids),
          offerNewUser: false,
        });
        this.savingPerms.set(false);
      },
      error: (error: unknown) => {
        this.notifications.error(toApiMessage(error));
        this.savingPerms.set(false);
      },
    });
  }

  // ═══════════════ Roles ═══════════════
  saveRole(): void {
    const name = this.newRole.name.trim().toUpperCase();
    if (!name) {
      this.notifications.warn('El nombre del rol es obligatorio.');
      return;
    }

    this.savingRole.set(true);
    this.roleApi
      .create({ name, description: this.newRole.description.trim(), status: 'active' })
      .subscribe({
        next: ({ role }) => {
          this.notifications.success(`Rol ${role.name} creado. Ahora asígnale permisos.`);
          this.roles.update((list) => [...list, role]);
          this.rolePerms.update((m) => new Map(m).set(role.id!, new Set()));
          this.newRole = { name: '', description: '' };
          this.savingRole.set(false);
          this.tab.set('permisos');
          this.onRoleChange(role.id ?? null);
        },
        error: (error: unknown) => {
          this.notifications.error(toApiMessage(error));
          this.savingRole.set(false);
        },
      });
  }

  rolePermCount(roleId: number | undefined): number {
    return roleId != null ? (this.rolePerms().get(roleId)?.size ?? 0) : 0;
  }

  /** Todos los ids activos (ADMIN se muestra con todo marcado). */
  readonly allIds = computed(
    () => new Set(this.resources().filter((r) => r.status === 'active').map((r) => r.id!)),
  );

  /** Total de permisos activos del catálogo (para "x de N"). */
  readonly totalPermissions = computed(
    () => this.resources().filter((r) => r.status === 'active').length,
  );
}

/** Copia del Set con los ids añadidos o quitados (los signals necesitan una referencia nueva). */
function withIds(set: Set<number>, ids: number[], checked: boolean): Set<number> {
  const next = new Set(set);
  for (const id of ids) {
    if (checked) next.add(id);
    else next.delete(id);
  }
  return next;
}
