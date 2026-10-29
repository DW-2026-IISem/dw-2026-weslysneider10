export type RecordStatus = 'active' | 'inactive';

export interface ApiError {
  message: string | string[];
  statusCode?: number;
  error?: string;
}

export interface ApiMessage {
  message: string;
}
