import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../features/auth/services/authservice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin-page',
  imports: [
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    TranslateModule,
    RouterLink,
  ],
  providers: [MessageService],
  templateUrl: './signin-page.html',
  styleUrl: './signin-page.css',
})
export class SigninPage {
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _messageService = inject(MessageService);
  private readonly _router = inject(Router);

  isLoading = signal<boolean>(false);

  public readonly signinForm: FormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public readonly onSubmit = async () => {
    if (this.signinForm.valid) {
      this.isLoading.set(true);
      const { data, error } = await this._authService.signInWithPassword(
        this.signinForm.value.email!,
        this.signinForm.value.password!,
      );
      this.isLoading.set(false);
      console.log('Response Data', data);
      if (data?.user) {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Signed in successfully',
          life: 3000,
        });
        const role = data.session.user?.user_metadata?.['role'];
        switch (role) {
          case 'teacher':
            this._router.navigate(['/teacher']);
            break;
          case 'student':
            this._router.navigate(['/student']);
            break;
          case 'admin':
            this._router.navigate(['/admin']);
            break;
          default:
            this._router.navigate(['/']);
            break;
        }
      }
      if (error) {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'Invalid credentials',
          life: 3000,
        });
      }
    }
  };
}
