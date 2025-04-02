import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { MenuComponent } from '../Menu/menu.component';
import { User } from '../Swagger/models/user';
import { jwtDecode } from 'jwt-decode';
import { UserControllerService } from '../Swagger/api/userController.service';

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
    MenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  menuIsOpen: boolean = false;
  showModalRegister: boolean = false;
  showModalLogin: boolean = false;
  checked: boolean = false;
  isLoggedIn: boolean = false;
  currentUser!: User;
  userIsPro: boolean = false;

  @ViewChild(RegisterComponentComponent) registerComponent!: RegisterComponentComponent;

  constructor(private router: Router, private userService: UserControllerService) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.getCurrentUserFromToken();
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
    if (typeof document !== 'undefined') {
      const value = `;${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    }
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
    this.menuIsOpen = !this.menuIsOpen;
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

  getCurrentUserFromToken(): void {
    const token = this.getCookie('token');
    if (!token) {
      console.warn('No token found');
      return;
    }

    try {
      const decoded: any = jwtDecode(token);

      const userEmail = decoded?.sub;
      if (!userEmail) {
        return;
      }

      this.userService.getUserByEmail(userEmail).subscribe({
        next: (user) => {
          this.currentUser = user;
          if (this.currentUser.role === 'PROFESIONAL') {
            this.userIsPro = true;
          }
        },
        error: (error) => {
          console.error('Failed to get current user:', error);
        },
      });
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
}
