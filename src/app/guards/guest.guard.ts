import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/authservice';

/**
 * Guest Guard - Protects auth pages (signin, signup) from authenticated users
 * Redirects authenticated users to their appropriate dashboard based on role
 */
export const guestGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  await authService.loadAuthState();

  // If not authenticated, allow access to auth pages
  if (!authService.isAuthenticated) {
    return true;
  }

  // User is authenticated, redirect to appropriate dashboard based on role
  const userRole = authService.role;

  console.log('Authenticated user trying to access auth page, redirecting to dashboard');

  switch (userRole) {
    case 'teacher':
      router.navigate(['/teacher/dashboard']);
      break;
    case 'student':
      router.navigate(['/student/dashboard']);
      break;
    case 'admin':
      router.navigate(['/admin/dashboard']);
      break;
    default:
      // If no role is assigned, allow access to auth pages
      console.warn('User has no role assigned, allowing access to auth page');
      return true;
  }

  return false;
};
