import { Component, Input } from '@angular/core';
import { User } from '../../../../Swagger/models/user';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() currentUser!: User;

  getFirstLetter(lastName?: string): string {
    return lastName ? lastName.charAt(0) : '';
  }
}
