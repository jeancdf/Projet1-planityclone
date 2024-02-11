import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent {
  selectedDate!: Date;
  selectedService!: string; // Added for service selection
  selectedTimeSlot!: string;
  services!: any[]; // Assuming services have an id and name
  timeSlots!: string[];
  salonId: string = '12345'; // Example salon ID

  constructor(private http: HttpClient) {
    this.fetchServices(); // Fetch services on component initialization
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
    const dateString = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
    this.http.get<string[]>(`/api/salons/${this.salonId}/available-slots?date=${dateString}`)
      .subscribe(slots => {
        this.timeSlots = slots;
      }, error => {
        console.error('Error fetching time slots', error);
      });
  }

  onSubmit() {
    // Process the booking here
    console.log(`Date: ${this.selectedDate}, Service: ${this.selectedService}, Time Slot: ${this.selectedTimeSlot}`);
    // Add logic to communicate with the backend for booking
  }
}
