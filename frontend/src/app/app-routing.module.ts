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


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'salonlist', component : SalonListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent},
  { path: 'admin-user-managment', component: AdminUserManagmentComponent },
  { path: 'client-dashboard', component: ClientDashboardComponent },
  { path: 'salon-dashboard', component: SalonDashboardComponent},
  { path: 'salon-profile', component: SalonProfileComponent },
  { path: 'salon-slot-management', component: SalonSlotManagementComponent },
  { path: 'appointment-booking/:id', component: AppointmentBookingComponent },
  { path: 'salonlist', component: SalonListComponent,  },
];

// { path: '', redirectTo: 'login', pathMatch: 'full' },
// { path: 'home', component : SalonListComponent , canActivate: [AuthGuard], data: { role: 'client' }},
// { path: 'login', component: LoginComponent },
// { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
// { path: 'admin-user-managment', component: AdminUserManagmentComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
// { path: 'client-dashboard', component: ClientDashboardComponent, canActivate: [AuthGuard], data: { role: 'client' } },
// { path: 'salon-dashboard', component: SalonDashboardComponent, canActivate: [AuthGuard], data: { role: 'salon' } },
// { path: 'salon-profile', component: SalonProfileComponent, canActivate: [AuthGuard], data: { role: 'salon' } },
// { path: 'salon-slot-management', component: SalonSlotManagementComponent, canActivate: [AuthGuard], data: { role: 'salon' } },
// { path: 'appointment-booking', component: AppointmentBookingComponent, canActivate: [AuthGuard], data: { role: 'client' } },
// { path: 'salonlist', component: SalonListComponent, canActivate: [AuthGuard], data: { role: 'client' } },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
