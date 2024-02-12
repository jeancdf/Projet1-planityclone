import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-reservations',
  templateUrl: './client-reservations.component.html',
  styleUrls: ['./client-reservations.component.css']
})
export class ClientReservationsComponent implements OnInit {
  clientReservations: any;

  constructor(private dataService: DataService, private toastr: ToastrService) {}

  ngOnInit() {
    this.fetchClientReservations();
  }

  fetchClientReservations() {
    this.dataService.fetchClientReservation().subscribe(
      (response: any) => {
        this.clientReservations = response.data;
        if (this.clientReservations.length === 0) {
          this.toastr.info('No reservations found for this client.');
        }
      },
      (error: any) => {
        console.error('Error fetching client reservations', error);
        this.toastr.error('Failed to fetch client reservations.');
      }
    );
  }
}
