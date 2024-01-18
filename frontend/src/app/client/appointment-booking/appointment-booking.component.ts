import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent {
  selectedDate!: Date;
  selectedTimeSlot!: string;
  timeSlots!: string[]; // Now this will be populated from the API
  salonId: string = '12345'; // Example salon ID, should be set based on user selection

  constructor(private http: HttpClient) {}

  onDateChange() {
    if (this.selectedDate) {
      this.fetchAvailableTimeSlots(this.selectedDate);
    }
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
    console.log(`Date: ${this.selectedDate}, Time Slot: ${this.selectedTimeSlot}`);
    // Add logic to communicate with the backend
  }
}
