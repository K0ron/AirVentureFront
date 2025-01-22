import { Component } from '@angular/core';
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

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleModalRegister() {
    this.showModalRegister = !this.showModalRegister;
  }

  toggleModalLogin() {
    this.showModalLogin = !this.showModalLogin;
  }
}
