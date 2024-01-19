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

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminAnalyticsComponent } from './admin/admin-analytics/admin-analytics.component';
import { SignupComponent } from './signup/signup.component';

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
    AdminUserManagmentComponent,
    AdminAnalyticsComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatNativeDateModule
  ],
  providers: [
    AuthGuard,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
