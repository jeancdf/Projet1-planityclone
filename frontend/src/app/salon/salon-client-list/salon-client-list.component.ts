import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-salon-client-list',
  templateUrl: './salon-client-list.component.html',
  styleUrls: ['./salon-client-list.component.css']
})
export class SalonClientListComponent {
  salonClients: any[] = [];


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fetchReservations();
  }
  fetchReservations(){
    this.dataService.fetchReservation().subscribe((reservation: any) => {
      // Filter out reservations with status false
      this.salonClients = reservation.data.filter((r: any) => r.reservation.status !== false);
    }, (error: any) => {
      console.error('Error fetching reservations', error);
      this.toastr.error('Failed to fetch reservations.');
    });
  }
}

