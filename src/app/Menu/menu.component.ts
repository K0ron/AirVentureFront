import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { User } from '../Swagger/models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [DividerModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Output() toggleMenu = new EventEmitter<void>();
  @Input() userIsPro: boolean = false;

  constructor(private router: Router) {}

  closeMenu() {
    this.toggleMenu.emit();
  }

  goToProfile() {
    this.router.navigate(['/profile']).then(() => {
      this.closeMenu();
    });
  }

  goToActivities() {
    this.router.navigate(['/activities']).then(() => {
      this.closeMenu();
    });
  }

  goToCreateActivity() {
    this.router.navigate(['/create-activity']).then(() => {
      this.closeMenu();
    });
  }
}
