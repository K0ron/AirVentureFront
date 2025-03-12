import { Component, OnInit, ViewChild } from '@angular/core';
import { UserInfoComponent } from './component/user-info/user-info.component';
import { DividerModule } from 'primeng/divider';
import { ProfileCardComponent } from './component/profile-card/profile-card.component';
import { ProfileMenuComponent } from './component/profile-menu/profile-menu.component';
import { jwtDecode } from 'jwt-decode';
import {
  AuthenticationControllerService,
  User,
  UserControllerService,
} from '../../Swagger/configurations';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../Header/header.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UserInfoComponent, DividerModule, ProfileCardComponent, ProfileMenuComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [UserControllerService, AuthenticationControllerService],
})
export class ProfileComponent implements OnInit {
  currentUser!: User;
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  constructor(
    private userService: UserControllerService,
    private authService: AuthenticationControllerService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCurrentUserFromToken();
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
        },
        error: (error) => {
          console.error('Failed to get current user:', error);
        },
      });
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  }

  logOut(): void {
    this.authService.loggedOut().subscribe({
      next: (response) => {
        document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;';
        if (this.headerComponent) {
          this.headerComponent.isLoggedIn = false;
        }
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.error('Logout failed:', error);
      },
    });
  }
}
