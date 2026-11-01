export interface ResourceI {
  id?: number;
  path: string;
  method: string;
  description: string;
  status: 'active' | 'inactive';
}
