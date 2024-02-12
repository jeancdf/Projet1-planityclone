import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

interface Slot {
  id?: number; // Optional: Include if you plan to uniquely identify slots
  time: string;
  isBooked: boolean;
  clientUsername?: string;
}

@Component({
  selector: 'app-salon-slot-management',
  templateUrl: './salon-slot-management.component.html',
  styleUrls: ['./salon-slot-management.component.css']
})
export class SalonSlotManagementComponent {
 reservations : any; 

  newSlotTime: string = ''; 
  newClientUsername: string = '';
  
  constructor( private dataService : DataService) {

  }

  ngOnint(){
    this.fetchReservations
  }

  addSlot(): void {
    if (this.newSlotTime) {
      const newSlot: Slot = {
        time: this.newSlotTime,
        isBooked: false,
        clientUsername: this.newClientUsername // Assign the client's username to the new slot
      };
      this.reservations.push(newSlot);
      this.newSlotTime = ''; // Reset for next input
      this.newClientUsername = ''; // Reset the client username for the next slot
    }
  }

  // Function to remove a slot by id
  removeSlot(slotId: number): void {
    this.reservations = this.reservations.filter((reservation: any) => reservation.id !== slotId);
  }
  
  fetchReservations(){
    this.dataService.fetchReservation.().subscribe((reservation: any) => {
      this.reservations = reservation;
    }, (error: any) => {
      console.error('Error fetching services', error);
    });
  }

  // Optional: Function to update a slot's booking status
  updateSlotBooking(slotId: number, isBooked: boolean): void {
    const slotIndex = this.reservations.findIndex((slot : any) => slot.id === slotId);
    if (slotIndex !== -1) {
      this.reservations[slotIndex].isBooked = isBooked;
    }
  }
}
