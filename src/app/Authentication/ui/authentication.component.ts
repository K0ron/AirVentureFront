import { Router } from '@angular/router';
import { AuthenticationControllerService } from './../../Swagger/api/authenticationController.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoginRequestDto } from '../domain/dto/login-request.dto';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, DividerModule, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  providers: [AuthenticationControllerService],
})
export class AuthenticationComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

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
          console.log('Login successful:', response);
          console.log('Cookies:', document.cookie);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage = error.error || 'An error occurred during login.';
        },
      });
    }
  }
}
