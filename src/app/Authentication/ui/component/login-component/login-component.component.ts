import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationControllerService } from '../../../../Swagger/api/authenticationController.service';
import { HttpResponse } from '@angular/common/http';
import { PasswordModule } from 'primeng/password';
import { LoginRequestDto } from '../../../domain/dto/login-request.dto';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
  ],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss',
})
export class LoginComponentComponent {
  @Output() loginSuccess = new EventEmitter<void>();
  loginForm: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(
    private authService: AuthenticationControllerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginDto = new LoginRequestDto(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      );
      this.authService.login(loginDto).subscribe({
        next: (response: HttpResponse<any>) => {
          console.log('Login successful', response);
          console.log('Cookies', document.cookie);
          console.log('Emitting login success event');
          this.loginSuccess.emit();
          this.router.navigate(['/activities']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage = error.error || 'An error occured during login.';
        },
      });
    }
  }
}
