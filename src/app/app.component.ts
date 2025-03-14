import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationComponent } from './Authentication/ui/authentication.component';
import { HomeComponent } from './Home/ui/home.component';
import { HeaderComponent } from './Header/header.component';
import { ReservationComponent } from './Reservation/ui/reservation.component';
import { FooterComponent } from './Footer/footer.component';
import { PaymentComponent } from './Payment/ui/payment.component';
import { ProfileComponent } from './Profile/ui/profile.component';
import { MenuComponent } from './Menu/menu.component';

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
    PaymentComponent,
    ProfileComponent,
    MenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'AirVentureFront';
}
