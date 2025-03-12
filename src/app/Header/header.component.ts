import { Component, OnInit, ViewChild } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { RegisterComponentComponent } from '../Authentication/ui/component/register-component/register-component.component';
import { LoginComponentComponent } from '../Authentication/ui/component/login-component/login-component.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    IconField,
    InputIcon,
    CommonModule,
    DialogModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RegisterComponentComponent,
    LoginComponentComponent,
    SearchBarComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  showModalRegister: boolean = false;
  showModalLogin: boolean = false;
  checked: boolean = false;
  isLoggedIn: boolean = false;

  @ViewChild(RegisterComponentComponent) registerComponent!: RegisterComponentComponent;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = this.getCookie('token');
    if (token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  getCookie(name: string): string | null {
    const value = `;${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  resetRegisterForm() {
    if (this.registerComponent) {
      this.registerComponent.registerForm.reset({
        role: '',
      });
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleModalRegister() {
    this.showModalRegister = !this.showModalRegister;
    this.showModalLogin = false;
    if (!this.showModalRegister) {
      this.resetRegisterForm();
    }
  }

  toggleModalLogin() {
    this.showModalLogin = !this.showModalLogin;
    this.showModalRegister = false;
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
