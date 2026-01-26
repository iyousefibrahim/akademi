import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthFooter } from '../../features/auth/components/auth-footer/auth-footer';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, AuthFooter],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {}
