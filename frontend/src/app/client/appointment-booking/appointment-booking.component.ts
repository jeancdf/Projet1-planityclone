import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; 
import { DataService } from '../../service/data.service'; 


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
  salonId: any;
  
  constructor( private dataService: DataService, private http: HttpClient, private route: ActivatedRoute) {
     
   
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params)
      this.salonId = params.get('id');
      console.log('Salon ID:', this.salonId);
    });
    this.fetchServices();
  }

  onDateChange() {
    if (this.selectedDate) {
      this.fetchAvailableTimeSlots(this.selectedDate);
    }
  }

  fetchServices() {
    this.dataService.fetchServices(this.salonId).subscribe(
      services => {
        this.services = services;
      }, error => {
        console.error('Error fetching services', error);
      });
  }

  fetchAvailableTimeSlots(date: Date) {
    const dateString = new Date (date.toISOString().split('T')[0])
    this.dataService.fetchAvailableTimeSlots(this.salonId, dateString).subscribe(
      slots => {
        this.timeSlots = slots;
      }, error => {
        console.error('Error fetching time slots', error);
      });
  }

  onSubmit() {

    console.log(`Date: ${this.selectedDate}, Service: ${this.selectedService}, Time Slot: ${this.selectedTimeSlot}`);
  
  }
}
