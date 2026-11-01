import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {

  LoginRequest as Credentials,
  PermissionsResponse,
  ProfileResponse,
  RefreshRequest,
  SessionTokens,
  UserProfile,
  EffectivePermission,
} from '../../models/auth/session.model';
import { SessionStore } from './session.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly session = inject(SessionStore);
  private readonly baseUrl = `${environment.apiUrl}/sesion`;

  login(credentials: Credentials): Observable<UserProfile> {
    return this.http
      .post<SessionTokens>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap((tokens) => this.session.setTokens(tokens)),
        switchMap(() => this.loadIdentity()),
      );
  }

  loadIdentity(): Observable<UserProfile> {
    return forkJoin({
      profile: this.http.get<ProfileResponse>(`${this.baseUrl}/perfil`),
      permissions: this.http.get<PermissionsResponse>(
        `${environment.apiUrl}/permisos`,
      ),
    }).pipe(
      tap(({ profile, permissions }) => {
        this.session.setProfile(profile.user);
        this.session.setPermissions(permissions.permissions);
      }),
      map(({ profile }) => profile.user),
    );
  }

  refresh(): Observable<SessionTokens> {
    const refreshToken = this.session.refreshToken();

    if (!refreshToken) {
      this.session.clear();
      throw new Error('No existe un refresh token disponible.');
    }

    const body: RefreshRequest = { refresh_token: refreshToken };

    return this.http
      .post<SessionTokens>(`${this.baseUrl}/refresh`, body)
      .pipe(tap((tokens) => this.session.setTokens(tokens)));
  }

  logout(): Observable<void> {
    const refreshToken = this.session.refreshToken();

    if (!refreshToken) {
      this.session.clear();
      return new Observable<void>((subscriber) => {
        subscriber.next();
        subscriber.complete();
      });
    }

    return this.http
      .post(`${this.baseUrl}/logout`, { refresh_token: refreshToken })
      .pipe(
        map(() => undefined),
        tap(() => this.session.clear()),
      );
  }

  clearSession(): void {
    this.session.clear();
  }
}
