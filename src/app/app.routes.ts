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
import { AuthGuard } from './Authentication/application/AuthGuard';

export const routes: Routes = [
  { path: 'login', component: AuthenticationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'activities', component: ActivityComponent, canActivate: [AuthGuard] },
  { path: 'reservation/:id', component: ReservationComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'payment/:id', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'success', component: PaymentSuccessComponent, canActivate: [AuthGuard] },
  { path: 'cancel', component: PaymentCancelComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/activities', pathMatch: 'full' },
];
