import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent {

  constructor(private router: Router) { }



  salons = [
    { id: '1', name: 'Salon 1' },
    { id: '2', name: 'Salon 2' },
    // Add more salons as needed
  ];

  goToBooking(salonId: string) {
    this.router.navigate(['/appointment-booking', salonId]); // Adjust the path as per your route configuration
  }

}
