import {
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';

import {
  AdminUser,
  CreateAdminUser,
  UserStatus,
  UpdateAdminUser,
} from '../user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    SelectModule,
  ],
  templateUrl: './user-form.html',
})
export class UserForm {
  readonly user = input<AdminUser | null>(null);
  readonly resetKey = input(0);
  readonly saving = input(false);

  readonly saved = output<CreateAdminUser | UpdateAdminUser>();
  readonly cancelled = output<void>();

  private readonly fb = inject(NonNullableFormBuilder);

  readonly statusOptions = [
    { label: 'Activo', value: 'active' },
    { label: 'Inactivo', value: 'inactive' },
  ];

  readonly form = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(80),
    ]],
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(150),
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
    ]],
    avatar: [''],
    status: ['active' as UserStatus, Validators.required],
  });

  constructor() {
    effect(() => {
      const current = this.user();
      this.resetKey();

      this.form.reset({
        username: current?.username ?? '',
        email: current?.email ?? '',
        password: '',
        avatar: current?.avatar ?? '',
        status: current?.status ?? 'active',
      });

      if (current) {
        this.form.controls.password.clearValidators();
        this.form.controls.password.disable();
        this.form.controls.status.disable();
      } else {
        this.form.controls.password.enable();
        this.form.controls.password.setValidators([
          Validators.required,
          Validators.minLength(8),
        ]);
        this.form.controls.status.enable();
      }

      this.form.controls.password.updateValueAndValidity();
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const current = this.user();
    const value = this.form.getRawValue();

    if (current) {
      const payload: UpdateAdminUser = {
        username: value.username.trim(),
        email: value.email.trim(),
        avatar: value.avatar.trim() || null,
      };

      this.saved.emit(payload);
      return;
    }

    const payload: CreateAdminUser = {
      username: value.username.trim(),
      email: value.email.trim(),
      password: value.password,
      avatar: value.avatar.trim() || null,
      status: value.status,
    };

    this.saved.emit(payload);
  }
}
