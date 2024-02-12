import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';


interface Slot {
  id?: number; 
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
 reservations : any[]= []; 

  newSlotTime: string = ''; 
  newClientUsername: string = '';
  
  constructor( private dataService : DataService, private toastr: ToastrService) {

  }

  ngOnInit(){
    this.fetchReservations()
  }

  addSlot(): void {
    if (this.newSlotTime) {
      const newSlot: Slot = {
        time: this.newSlotTime,
        isBooked: false,
        clientUsername: this.newClientUsername 
      };
      this.reservations.push(newSlot);
      this.newSlotTime = ''; 
      this.newClientUsername = ''; 
    }
  }


  removeSlot(slotId: number): void {
    this.reservations = this.reservations.filter((reservation: any) => reservation.id !== slotId);
  }
  
  fetchReservations(){
    this.dataService.fetchReservation().subscribe((reservation: any) => {

      this.reservations = reservation.data.filter((r: any) => r.reservation.status !== false);
    }, (error: any) => {
      console.error('Error fetching reservations', error);
      this.toastr.error('Failed to fetch reservations.');
    });
  }
  

  acceptReservation(salonId: number, reservationId: number) {
    this.dataService.acceptReservation(salonId, reservationId).subscribe((response: any) => {
      const index = this.reservations.findIndex((r: any) => r.id === reservationId);
      if (index !== -1) {
        this.reservations[index].status = true; 
        this.toastr.success('Reservation accepted successfully!');
      }
    }, (error: any) => {
      console.error('Error accepting reservation', error);
      this.toastr.error('Failed to accept reservation.');
    });
  }
  
  refuseReservation(salonId: number, reservationId: number) {
    this.dataService.refuseReservation(salonId, reservationId).subscribe((response: any) => {
     
      this.reservations = this.reservations.filter((r: any) => r.id !== reservationId);
      this.toastr.success('Reservation refused successfully!');
    }, (error: any) => {
      console.error('Error refusing reservation', error);
      this.toastr.error('Failed to refuse reservation.');
    });
  }
  
  updateSlotBooking(slotId: number, isBooked: boolean): void {
    const slotIndex = this.reservations.findIndex((slot : any) => slot.id === slotId);
    if (slotIndex !== -1) {
      this.reservations[slotIndex].isBooked = isBooked;
    }
  }
}
