import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SalonDashboardComponent } from './salon/salon-dashboard/salon-dashboard.component';
import { SalonSlotManagementComponent } from './salon/salon-slot-management/salon-slot-management.component';
import { SalonProfileComponent } from './salon/salon-profile/salon-profile.component';
import { ClientDashboardComponent } from './client/client-dashboard/client-dashboard.component';
import { SalonListComponent } from './client/salon-list/salon-list.component';
import { AppointmentBookingComponent } from './client/appointment-booking/appointment-booking.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminUserManagmentComponent } from './admin/admin-user-managment/admin-user-managment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SalonDashboardComponent,
    SalonSlotManagementComponent,
    SalonProfileComponent,
    ClientDashboardComponent,
    SalonListComponent,
    AppointmentBookingComponent,
    AdminDashboardComponent,
    AdminUserManagmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
