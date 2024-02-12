import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ClientDashboardComponent } from './client/client-dashboard/client-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { SalonDashboardComponent } from './salon/salon-dashboard/salon-dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminUserManagmentComponent } from './admin/admin-user-managment/admin-user-managment.component';
import { AppointmentBookingComponent } from './client/appointment-booking/appointment-booking.component';
import { SalonListComponent } from './client/salon-list/salon-list.component';
import { SalonProfileComponent } from './salon/salon-profile/salon-profile.component';
import { SalonSlotManagementComponent } from './salon/salon-slot-management/salon-slot-management.component';
import { SignupComponent } from './signup/signup.component';
import { SalonServicesComponent } from './salon/salon-services/salon-services.component';
import { SalonClientListComponent } from './salon/salon-client-list/salon-client-list.component';
import { ClientReservationsComponent } from './client/client-reservations/client-reservations.component';


const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'home', component : SalonListComponent , canActivate: [AuthGuard], data: { role: 'client' }},
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
{ path: 'admin-user-managment', component: AdminUserManagmentComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
{ path: 'client-dashboard', component: ClientDashboardComponent, canActivate: [AuthGuard], data: { role: 'client' } },
{ path: 'salon-dashboard', component: SalonDashboardComponent, canActivate: [AuthGuard], data: { role: 'salon' } },
{ path: 'salon-profile', component: SalonProfileComponent, canActivate: [AuthGuard], data: { role: 'salon' } },
{ path: 'salon-slot-management', component: SalonSlotManagementComponent, canActivate: [AuthGuard], data: { role: 'salon' } },
{ path: 'salon-client-list', component: SalonClientListComponent, canActivate: [AuthGuard], data: { role: 'salon' } },
{ path: 'salonlist', component: SalonListComponent, canActivate: [AuthGuard], data: { role: 'client' } },
{ path: 'salon-services', component: SalonServicesComponent, canActivate: [AuthGuard ], data: { role: 'salon' } },
{ path: 'appointment-booking', component: AppointmentBookingComponent, canActivate: [AuthGuard], data: { role: 'client' } },
{ path: 'appointment-booking/:id', component: AppointmentBookingComponent, canActivate: [AuthGuard], data: { role: 'client' } },
{ path: 'client-reservations', component: ClientReservationsComponent, canActivate: [AuthGuard], data: {role: 'client'}},
{ path: 'salon-client-list', component: SalonClientListComponent , canActivate: [AuthGuard], data: {role: 'salon'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
