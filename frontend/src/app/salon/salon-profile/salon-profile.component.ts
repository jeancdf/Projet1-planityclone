import { Component } from '@angular/core';


@Component({
  selector: 'app-salon-profile',
  templateUrl: './salon-profile.component.html',
  styleUrls: ['./salon-profile.component.css']
})
export class SalonProfileComponent {
  salon: any = {
    id: 1,
    name: 'Elegant Styles',
    description: 'A professional salon offering a range of hairdressing services...',
    services: [
      { name: 'Haircut', price: 50 },
      { name: 'Coloring', price: 80 },
      // More services...
    ],
    staff: [
      { name: 'Jane Doe', title: 'Senior Stylist' },
      { name: 'John Smith', title: 'Color Specialist' },
      // More staff members...
    ],
    hours: 'Mon-Fri: 9am - 7pm, Sat: 9am - 5pm',
    location: '123 Main Street, Townsville'
    // Additional fields...
  };

  editMode = false;


  toggleEditMode() {
    this.editMode = !this.editMode;
  }


  saveProfile() {
    console.log('Updated salon data:', this.salon);
    // Implement API call to save the updated salon data
    this.toggleEditMode();
  }
}
