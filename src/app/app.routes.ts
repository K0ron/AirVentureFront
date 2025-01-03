import { Routes } from '@angular/router';
import path from 'node:path';
import { ActivityComponent } from './Activity/ui/activity.component';
import { AuthenticationComponent } from './Authentication/ui/authentication.component';
import { ReservationComponent } from './Reservation/ui/reservation.component';
import { ProfileComponent } from './Profile/ui/profile.component';
import { PaymentComponent } from './Payment/ui/payment.component';
import { HomeComponent } from './Home/ui/home.component';

export const routes: Routes = [
    {path: "login", component: AuthenticationComponent},
    {path: "home", component: HomeComponent},
    {path: "activity", component: ActivityComponent},
    {path: "reservation/:id", component: ReservationComponent},
    {path: "profile", component: ProfileComponent},
    {path: "payment", component: PaymentComponent},
    {path: "", redirectTo: '/home', pathMatch: "full"} 
];
