export interface RoleI {
  id?: number;
  name: string;
  description: string;
  status: 'active' | 'inactive';
}
