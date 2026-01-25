import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent() {
      return import('./layouts/auth-layout/auth-layout').then((p) => p.AuthLayout);
    },
    children: [
      {
        path: '',
        redirectTo: 'teacher-signup',
        pathMatch: 'full',
      },
      {
        path: 'teacher-signup',
        loadComponent: () =>
          import('./pages/auth/teacher-signup-page/teacher-signup-page').then(
            (p) => p.TeacherSignupPage,
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found').then((p) => p.NotFound),
  },
];
