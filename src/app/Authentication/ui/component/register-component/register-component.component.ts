import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationControllerService } from '../../../../Swagger/configurations';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  emailExistingValidator,
  passwordMatchValidator,
  passwordValidator,
} from '../../../../core/Validators/customValidators';
import { RegisterRequestDto } from '../../../domain/dto/register-request.dto';
import { HttpResponse } from '@angular/common/http';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { User } from '../../../../Swagger/models/user';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordModule, SelectModule, TooltipModule],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.scss',
})
export class RegisterComponentComponent implements OnInit {
  @Output() registerSuccess = new EventEmitter<void>();
  registerForm: FormGroup;
  errorMessage: string = '';
  termsAccepted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationControllerService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, emailExistingValidator([])]],
      password: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', [Validators.required, passwordMatchValidator()]],
      role: ['', Validators.required],
    });
  }
  role = [
    { name: 'Particulier', value: User.RoleEnum.PARTICULAR },
    { name: 'Professionnel', value: User.RoleEnum.PROFESIONAL },
  ];

  ngOnInit() {
    this.termsAccepted = false;
  }

  acceptTerms() {
    this.termsAccepted = !this.termsAccepted;
    console.log('TERMS ACCEPTED ', this.termsAccepted);
  }

  onSubmit() {
    console.log('Form submitted', this.registerForm.value);

    if (this.registerForm.valid && this.termsAccepted == true) {
      const registerDto = new RegisterRequestDto(
        this.registerForm.get('firstName')?.value,
        this.registerForm.get('lastName')?.value,
        this.registerForm.get('email')?.value,
        this.registerForm.get('password')?.value,
        this.registerForm.get('role')?.value
      );
      console.log('registerDto', registerDto);
      this.authService.register(registerDto).subscribe({
        next: (response: HttpResponse<any>) => {
          console.log('Register successful', response);
          this.loginAfterRegistration(
            this.registerForm.get('email')?.value,
            this.registerForm.get('password')?.value
          );
          this.registerSuccess.emit();
        },
        error: (error) => {
          if (this.termsAccepted == false) {
            this.errorMessage = 'You must accept the terms and conditions';
          }
          console.log('register failed', error);
          this.errorMessage = error.error || 'An error occured during register.';
          console.log('Error details:', error.error); // Ajoutez cette ligne pour voir les détails
        },
      });
    }
  }

  private loginAfterRegistration(email: string, password: string) {
    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        console.log('Cookies', document.cookie);
        this.router.navigate(['/activities']);
      },
      error: (error) => {
        console.log('Login failed:', error);
        this.errorMessage = error.error || 'An error occured during login.';
      },
    });
  }
}
