import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationComponent } from './Authentication/ui/authentication.component';
import { HomeComponent } from './Home/ui/home.component';
import { HeaderComponent } from './Header/header.component';
import { ReservationComponent } from './Reservation/ui/reservation.component';
import { FooterComponent } from './Footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AuthenticationComponent,
    HomeComponent,
    HeaderComponent,
    ReservationComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'AirVentureFront';
}
