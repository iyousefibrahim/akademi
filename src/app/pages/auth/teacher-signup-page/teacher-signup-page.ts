import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../features/auth/services/authservice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-teacher-signup-page',
  imports: [
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DividerModule,
    ToastModule,
    FileUploadModule,
  ],
  providers: [MessageService],
  templateUrl: './teacher-signup-page.html',
  styleUrl: './teacher-signup-page.css',
})
export class TeacherSignupPage {
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _messageService = inject(MessageService);
  isLoading = signal<boolean>(false);

  public readonly teacherSignupForm: FormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    full_name: ['', [Validators.required]],
  });

  public readonly onSubmit = async () => {
    if (this.teacherSignupForm.valid) {
      this.isLoading.set(true);
      console.log('Form Data', this.teacherSignupForm.value);

      const { data, error } = await this._authService.teacherSignUp(
        this.teacherSignupForm.value.email!,
        this.teacherSignupForm.value.password!,
        this.teacherSignupForm.value.full_name!,
      );

      console.log('Response Data', data);
      this.isLoading.set(false);
      if (data?.teacher) {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Teacher created successfully',
          life: 3000,
        });
      }
      if (error) {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'Something went wrong',
          life: 3000,
        });
      }
    }
  };
}
