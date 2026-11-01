export type UserStatus = 'active' | 'inactive';

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  status: UserStatus;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateAdminUser {
  username: string;
  email: string;
  password: string;
  avatar: string | null;
  status: UserStatus;
}

export interface UpdateAdminUser {
  username: string;
  email: string;
  avatar: string | null;
}

export interface UserPermissionsResponse {
  permissions: UserEffectivePermission[];
}

export interface UserEffectivePermission {
  resource_id: number;
  method: string;
  path: string;
  description: string | null;
  role_id: number;
  role_name: string;
}
