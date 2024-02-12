import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent {
  selectedDate!: Date;
  selectedService!: string;
  selectedTimeSlot!: string;
  services!: any[];
  timeSlots = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00"
  ];
  salonId: any;

  constructor(private dataService: DataService, private http: HttpClient, private route: ActivatedRoute, private toastr: ToastrService ) {


  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.salonId = params.get('id');
    });
    this.dataService.fetchSalonServices(this.salonId)
      .subscribe({
        next: (salons) => {
          this.services = salons.data.services;
          this.toastr.success('Services fetched successfully!');
        },
        error: (error) => {
          console.error('Error fetching salons', error);
          this.toastr.error('Failed to fetch services.');
        }
      });
  }
  onDateChange() {
    // if (this.selectedDate) {
    //   this.fetchAvailableTimeSlots(this.selectedDate);
    // }
  }

  fetchServices() {
    this.dataService.fetchServices(this.salonId).subscribe(
      services => {
        this.services = services;
      }, error => {
        console.error('Error fetching services', error);
      });
  }

  onSubmit() {
    let [hours, minutes] = this.selectedTimeSlot.split(":").map(Number);
    this.selectedDate.setHours(hours, minutes, 0, 0);
    this.dataService.saveReservation(
      this.salonId,
      this.selectedDate
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Reservation saved successfully!');
      },
      error: (error) => {
        console.error('Error saving reservation', error);
        this.toastr.error('Failed to save reservation.');
      }
    });
  }
}
