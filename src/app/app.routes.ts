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
          import('./pages/teacher/teacher-dashboard-page/teacher-dashboard-page').then(
            (p) => p.TeacherDashboardPage,
          ),
      },
      {
        path: 'students',
        loadComponent: () =>
          import('./pages/teacher/teacher-students-page/teacher-students-page').then(
            (p) => p.TeacherStudentsPage,
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
