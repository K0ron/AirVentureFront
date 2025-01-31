import { Component, ViewChild } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { RegisterComponentComponent } from '../Authentication/ui/component/register-component/register-component.component';
import { LoginComponentComponent } from '../Authentication/ui/component/login-component/login-component.component';

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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menuOpen = false;
  showModalRegister: boolean = false;
  showModalLogin: boolean = false;
  checked: boolean = false;

  @ViewChild(RegisterComponentComponent) registerComponent!: RegisterComponentComponent;

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

    console.log('LOGIN MODAL STATE', this.showModalRegister);
  }

  toggleModalLogin() {
    this.showModalLogin = !this.showModalLogin;
    this.showModalRegister = false;
    console.log('LOGIN MODAL STATE', this.showModalLogin);
  }
}
