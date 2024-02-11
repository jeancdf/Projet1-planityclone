import { Component } from '@angular/core';

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
  slots: Slot[] = [
    { id: 1, time: '09:00 AM', clientUsername:'john' ,isBooked: false },
    { id: 2, time: '10:00 AM', clientUsername:'bob',isBooked: false },
    { id: 3, time: '11:00 AM', clientUsername:'kate',isBooked: false },
    { id: 4, time: '12:00 PM', clientUsername:'jane',isBooked: false },
    // Initialize with some slots, if necessary
  ];

  newSlotTime: string = ''; 
  newClientUsername: string = ''; 

  addSlot(): void {
    if (this.newSlotTime) {
      const newSlot: Slot = {
        time: this.newSlotTime,
        isBooked: false,
        clientUsername: this.newClientUsername // Assign the client's username to the new slot
      };
      this.slots.push(newSlot);
      this.newSlotTime = ''; // Reset for next input
      this.newClientUsername = ''; // Reset the client username for the next slot
    }
  }

  // Function to remove a slot by id
  removeSlot(slotId: number): void {
    this.slots = this.slots.filter(slot => slot.id !== slotId);
  }

  // Optional: Function to update a slot's booking status
  updateSlotBooking(slotId: number, isBooked: boolean): void {
    const slotIndex = this.slots.findIndex(slot => slot.id === slotId);
    if (slotIndex !== -1) {
      this.slots[slotIndex].isBooked = isBooked;
    }
  }
}
