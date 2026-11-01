import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';

import { AuthService } from '../services/auth/auth.service';
import { SessionStore } from '../services/auth/session.store';

let refreshing = false;
const refreshSubject = new BehaviorSubject<string | null>(null);

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const session = inject(SessionStore);
  const auth = inject(AuthService);

  const authEndpoints = [
    '/sesion/login',
    '/sesion/refresh',
    '/sesion/logout',
  ];

  const isAuthEndpoint = authEndpoints.some((endpoint) =>
    request.url.includes(endpoint),
  );

  const accessToken = session.accessToken();

  const authenticatedRequest =
    accessToken && !isAuthEndpoint
      ? request.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      : request;

  return next(authenticatedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status !== 401 ||
        isAuthEndpoint ||
        !session.refreshToken()
      ) {
        return throwError(() => error);
      }

      if (!refreshing) {
        refreshing = true;
        refreshSubject.next(null);

        return auth.refresh().pipe(
          switchMap((tokens) => {
            refreshing = false;
            refreshSubject.next(tokens.access_token);

            return next(
              request.clone({
                setHeaders: {
                  Authorization: `Bearer ${tokens.access_token}`,
                },
              }),
            );
          }),
          catchError((refreshError) => {
            refreshing = false;
            refreshSubject.next(null);
            auth.clearSession();
            return throwError(() => refreshError);
          }),
        );
      }

      return refreshSubject.pipe(
        filter((token): token is string => token !== null),
        take(1),
        switchMap((token) =>
          next(
            request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ),
        ),
      );
    }),
  );
};
