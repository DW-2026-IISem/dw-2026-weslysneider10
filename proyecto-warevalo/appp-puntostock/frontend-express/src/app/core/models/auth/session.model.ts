export interface SessionTokens {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface LogoutRequest {
  refresh_token: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  status: 'active' | 'inactive';
}

export interface ProfileResponse {
  user: UserProfile;
}

export interface EffectivePermission {
  resource_id: number;
  method: string;
  path: string;
  description: string | null;
  role_id: number;
  role_name: string;
}

export interface PermissionsResponse {
  permissions: EffectivePermission[];
}
