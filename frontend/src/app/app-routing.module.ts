import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ClientDashboardComponent } from './client/client-dashboard/client-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminUserManagmentComponent } from './admin/admin-user-managment/admin-user-managment.component';
import { AppointmentBookingComponent } from './client/appointment-booking/appointment-booking.component';
import { SalonListComponent } from './client/salon-list/salon-list.component';




const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
