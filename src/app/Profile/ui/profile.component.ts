import { Component, OnInit } from '@angular/core';
import { UserInfoComponent } from './component/user-info/user-info.component';
import { DividerModule } from 'primeng/divider';
import { ProfileCardComponent } from './component/profile-card/profile-card.component';
import { ProfileMenuComponent } from './component/profile-menu/profile-menu.component';
import { jwtDecode } from 'jwt-decode';
import { User, UserControllerService } from '../../Swagger/configurations';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UserInfoComponent, DividerModule, ProfileCardComponent, ProfileMenuComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [UserControllerService],
})
export class ProfileComponent implements OnInit {
  currentUser!: User;

  constructor(private userService: UserControllerService) {}

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
      console.log('Decoded token:', decoded);

      const userEmail = decoded?.sub;
      if (!userEmail) {
        console.warn('No email found in token');
        return;
      }

      this.userService.getUserByEmail(userEmail).subscribe({
        next: (user) => {
          this.currentUser = user;
          console.log('Current user:', this.currentUser);
        },
        error: (error) => {
          console.error('Failed to get current user:', error);
        },
      });
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  // Utilisation pour récupérer les cookies
  getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  }
}
