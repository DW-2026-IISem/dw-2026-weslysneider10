import { Injectable, signal } from '@angular/core';
import {
  EffectivePermission,
  SessionTokens,
  UserProfile,
} from '../../models/auth/session.model';

@Injectable({ providedIn: 'root' })
export class SessionStore {
  private readonly storageKey = 'puntostock.session';

  readonly accessToken = signal<string | null>(null);
  readonly refreshToken = signal<string | null>(null);
  readonly profile = signal<UserProfile | null>(null);
  readonly permissions = signal<EffectivePermission[]>([]);
  readonly authenticated = signal(false);

  constructor() {
    this.restore();
  }

  setTokens(tokens: SessionTokens): void {
    this.accessToken.set(tokens.access_token);
    this.refreshToken.set(tokens.refresh_token);
    this.authenticated.set(true);

    sessionStorage.setItem(
      this.storageKey,
      JSON.stringify({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      }),
    );
  }

  setAccessToken(accessToken: string): void {
    this.accessToken.set(accessToken);
    this.persist();
  }

  setProfile(profile: UserProfile): void {
    this.profile.set(profile);
  }

  setPermissions(permissions: EffectivePermission[]): void {
    this.permissions.set(permissions);
  }

  clear(): void {
    this.accessToken.set(null);
    this.refreshToken.set(null);
    this.profile.set(null);
    this.permissions.set([]);
    this.authenticated.set(false);
    sessionStorage.removeItem(this.storageKey);
  }

  private restore(): void {
    const saved = sessionStorage.getItem(this.storageKey);

    if (!saved) return;

    try {
      const session = JSON.parse(saved) as {
        access_token?: string;
        refresh_token?: string;
      };

      if (!session.access_token || !session.refresh_token) {
        this.clear();
        return;
      }

      this.accessToken.set(session.access_token);
      this.refreshToken.set(session.refresh_token);
      this.authenticated.set(true);
    } catch {
      this.clear();
    }
  }

  private persist(): void {
    const accessToken = this.accessToken();
    const refreshToken = this.refreshToken();

    if (!accessToken || !refreshToken) {
      this.clear();
      return;
    }

    sessionStorage.setItem(
      this.storageKey,
      JSON.stringify({
        access_token: accessToken,
        refresh_token: refreshToken,
      }),
    );
  }
}
