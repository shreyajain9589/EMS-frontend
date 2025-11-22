import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  // Check if token exists in localStorage
  const authData = localStorage.getItem('employeeApp');

  if (authData) {
    const parsed = JSON.parse(authData);

    // Very basic check: token exists
    if (parsed.token) {
      return true; // allow route access
    }
  }

  // No token → redirect to login
  router.navigate(['/login']);
  return false;
};
