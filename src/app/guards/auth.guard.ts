import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/authservice';

/**
 * Auth Guard - Protects routes that require authentication
 * Redirects to signin page if user is not authenticated
 */
export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Load fresh auth state
  await authService.loadAuthState();

  // Check if user is authenticated using cached state
  if (!authService.isAuthenticated) {
    console.warn('No active session, redirecting to signin');
    router.navigate(['/signin'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  return true;
};
