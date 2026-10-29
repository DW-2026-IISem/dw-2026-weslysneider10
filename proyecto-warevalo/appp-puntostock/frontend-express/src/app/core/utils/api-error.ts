import { HttpErrorResponse } from '@angular/common/http';

interface ApiErrorBody {
  error?: string;
  message?: string | string[];
  detail?: string;
}

export function toApiMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return 'No se pudo conectar con el backend. Verifica que esté activo en http://localhost:3000.';
    }

    if (error.status === 401) {
      return 'La sesión no es válida o ha expirado. Inicia sesión nuevamente.';
    }

    if (error.status === 403) {
      return 'No tienes permisos para realizar esta operación.';
    }

    const body = error.error as ApiErrorBody | string | null;

    if (typeof body === 'string' && body.trim()) {
      return body;
    }

    if (body && typeof body === 'object') {
      const message = body.message ?? body.error;

      if (Array.isArray(message)) {
        return message.join('. ');
      }

      if (message) {
        return body.detail ? `${message} — ${body.detail}` : message;
      }
    }

    return error.message || 'Ocurrió un error al comunicarse con la API.';
  }

  return error instanceof Error
    ? error.message
    : 'Ocurrió un error inesperado.';
}
