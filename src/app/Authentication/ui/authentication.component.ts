import { Router } from '@angular/router';
import { AuthenticationControllerService } from './../../Swagger/api/authenticationController.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoginRequestDto } from '../domain/dto/login-request.dto';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, DividerModule, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  providers: [AuthenticationControllerService],
})
export class AuthenticationComponent {
  errorMessage: string = '';

  constructor(
    private authService: AuthenticationControllerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  login(loginDto: LoginRequestDto) {
    this.authService.login(loginDto).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Login successful', response);
        console.log('Cookies', document.cookie);
        console.log('Emitting login success event');
        this.router.navigate(['/activities']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = error.error || 'An error occured during login.';
      },
    });
  }
}
