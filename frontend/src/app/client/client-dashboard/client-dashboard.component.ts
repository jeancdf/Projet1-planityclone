import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent {

  salons: any;
  constructor(private router: Router, private dataService: DataService) {
    this.dataService.getSalons()
      .subscribe(salons => {
        this.salons = salons.data;
      }, error => {
        console.error('Error fetching salons', error);
      });
  }



  goToBooking(salonId: string) {
    this.router.navigate(['/appointment-booking', salonId]);
  }

}
