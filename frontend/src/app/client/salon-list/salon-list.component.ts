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

  salons: any[] = [];
  
  selectSalon(salonId: string) {

    this.router.navigate(['/appointment-booking', salonId]);
  }

  fetchSalons() {
    this.dataService.getSalons()
      .subscribe(salons => {
        this.salons = salons.data;
      }, error => {
        console.error('Error fetching salons', error);
      });

  }
}
