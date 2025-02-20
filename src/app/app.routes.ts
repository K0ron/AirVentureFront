import { Routes } from '@angular/router';
import path from 'node:path';
import { ActivityComponent } from './Activity/ui/activity.component';
import { AuthenticationComponent } from './Authentication/ui/authentication.component';
import { ReservationComponent } from './Reservation/ui/reservation.component';
import { ProfileComponent } from './Profile/ui/profile.component';
import { PaymentComponent } from './Payment/ui/payment.component';
import { HomeComponent } from './Home/ui/home.component';
import { PaymentSuccessComponent } from './Payment/ui/components/payment-success/payment-success.component';
import { PaymentCancelComponent } from './Payment/ui/components/payment-cancel/payment-cancel.component';

export const routes: Routes = [
  { path: 'login', component: AuthenticationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'activities', component: ActivityComponent },
  { path: 'reservation/:id', component: ReservationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'payment/:id', component: PaymentComponent },
  { path: 'success', component: PaymentSuccessComponent },
  { path: 'cancel', component: PaymentCancelComponent },
  { path: '', redirectTo: '/activities', pathMatch: 'full' },
];
