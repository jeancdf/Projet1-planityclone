import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; 


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
  timeSlots!: string[];
  salonId: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.salonId = params.get('salonId') || 'defaultSalonId';
      this.fetchServices();
    });
  }
  onDateChange() {
    if (this.selectedDate) {
      this.fetchAvailableTimeSlots(this.selectedDate);
    }
  }

  fetchServices() {
    // Fetch services from the backend
    this.http.get<any[]>(`/api/salons/${this.salonId}/services`)
      .subscribe(services => {
        this.services = services;
      }, error => {
        console.error('Error fetching services', error);
      });
  }

  fetchAvailableTimeSlots(date: Date) {
    const dateString = date.toISOString().split('T')[0]; 
    this.http.get<string[]>(`/api/salons/${this.salonId}/available-slots?date=${dateString}`)
      .subscribe(slots => {
        this.timeSlots = slots;
      }, error => {
        console.error('Error fetching time slots', error);
      });
  }

  onSubmit() {

    console.log(`Date: ${this.selectedDate}, Service: ${this.selectedService}, Time Slot: ${this.selectedTimeSlot}`);
  
  }
}
