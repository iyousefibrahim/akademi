import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent() {
      return import('./layouts/auth-layout/auth-layout').then((p) => p.AuthLayout);
    },
    canActivate: [guestGuard],
    children: [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full',
      },
      {
        path: 'teacher-signup',
        loadComponent: () =>
          import('./pages/auth/teacher-signup-page/teacher-signup-page').then(
            (p) => p.TeacherSignupPage,
          ),
      },
      {
        path: 'signin',
        loadComponent: () =>
          import('./pages/auth/signin-page/signin-page').then((p) => p.SigninPage),
      },
    ],
  },
  {
    path: 'teacher',
    loadComponent() {
      return import('./layouts/teacher-layout/teacher-layout').then((p) => p.TeacherLayout);
    },
    canActivate: [authGuard, roleGuard],
    data: { roles: ['teacher'] },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/teacher/teacher-dashboard/teacher-dashboard').then(
            (p) => p.TeacherDashboard,
          ),
      },
    ],
  },
  {
    path: 'student',
    loadComponent() {
      return import('./layouts/student-layout/student-layout').then((p) => p.StudentLayout);
    },
    canActivate: [authGuard, roleGuard],
    data: { roles: ['student'] },
    children: [],
  },
  {
    path: 'admin',
    loadComponent() {
      return import('./layouts/admin-layout/admin-layout').then((p) => p.AdminLayout);
    },
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] },
    children: [],
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found').then((p) => p.NotFound),
  },
];
