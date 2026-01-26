import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/authservice';

/**
 * Role Guard - Protects routes based on user roles
 * Checks if the authenticated user has the required role
 * Redirects to appropriate page if role doesn't match
 */
export const roleGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  await authService.loadAuthState();

  const requiredRoles = route.data['roles'] as string[] | undefined;

  if (!requiredRoles || requiredRoles.length === 0) {
    console.warn('No roles specified in route data');
    return true;
  }

  // Check if user is authenticated
  if (!authService.isAuthenticated) {
    console.warn('No active session for role check, redirecting to signin');
    router.navigate(['/signin']);
    return false;
  }

  // Get user role from cached state
  const userRole = authService.role;

  if (!userRole) {
    console.warn('User has no role assigned');
    router.navigate(['/signin']);
    return false;
  }

  // Check if user has one of the required roles
  if (requiredRoles.includes(userRole)) {
    return true;
  }

  // User doesn't have required role, redirect based on their actual role
  console.warn(
    `User role '${userRole}' not authorized for this route. Required: ${requiredRoles.join(', ')}`,
  );

  // Redirect to appropriate dashboard based on user's role
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
      router.navigate(['/signin']);
  }

  return false;
};
