import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';
import { SessionStore } from '../services/auth/session.store';

export const authGuard: CanActivateFn = () => {
  const session = inject(SessionStore);
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!session.authenticated()) {
    return router.createUrlTree(['/login']);
  }

  if (session.profile()) {
    return true;
  }

  return auth.loadIdentity().pipe(
    map(() => true),
    catchError(() => {
      auth.clearSession();
      return of(router.createUrlTree(['/login']));
    }),
  );
};
