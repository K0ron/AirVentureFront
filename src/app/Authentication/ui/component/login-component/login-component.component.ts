import { CookieService } from './../../../domain/services/cookie.service';
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
  @Output() isLoggedIn = new EventEmitter<boolean>();
  loginForm: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(
    private authService: AuthenticationControllerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
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
        next: (response) => {
          console.log('Login successful', response);
          console.log('Response body', response.token);
          console.log('Cookies', document.cookie);
          console.log('Emitting login success event');

          this.cookieService.setCookie(response.token);

          this.authService.getCurrentUser().subscribe({
            next: (userDate) => {
              console.log('Current user', userDate);
              this.isLoggedIn.emit(true);
            },
            error: (error) => {
              console.error('Failed to get current user:', error);
            },
          });

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
