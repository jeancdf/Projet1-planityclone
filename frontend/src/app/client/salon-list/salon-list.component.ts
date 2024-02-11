import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-salon-list',
  templateUrl: './salon-list.component.html',
  styleUrls: ['./salon-list.component.css']
})
export class SalonListComponent {

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.fetchSalons();
  }
  

  salons = [
    { id: '1', name: 'Elegant Styles' },
    { id: '2', name: 'Modern Cuts' },
    { id: '3', name: 'The Classic Barber' },
    { id: '4', name: 'Salon 4' },
    { id: '5', name: 'Salon 5' },
    { id: '6', name: 'Salon 6' },
    { id: '7', name: 'Salon 7' },
    { id: '8', name: 'Salon 8' },

  ];

  selectSalon(salonId: string) {

    // Redirect to the booking page
    this.router.navigate(['/appointment-booking', salonId]);
  }

  fetchSalons() {
    // Fetch salons from the backend
    this.dataService.getSalons()
      .subscribe(salons => {
        this.salons = salons;
      }, error => {
        console.error('Error fetching salons', error);
      });

  }
}
