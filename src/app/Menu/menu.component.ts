import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [DividerModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Output() toggleMenu = new EventEmitter<void>();

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
}
