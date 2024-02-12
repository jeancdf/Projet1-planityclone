import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-salon-profile',
  templateUrl: './salon-profile.component.html',
  styleUrls: ['./salon-profile.component.css']
})
export class SalonProfileComponent implements OnInit {
  salon: any = {
   
  };
  availableServices: any;
  selectedServiceIds: number[] = [];
  editMode = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.fetchServices();
    this.fetchAllServices();
    this.fetchSalonProfile();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode && this.salon.services) {
      // Only attempt to map over services if it's defined
      this.selectedServiceIds = this.salon.services.map((service: any) => service.id);
    } else if (this.editMode) {
      // If services is not defined, initialize it to an empty array
      this.salon.services = [];
    }
  }
  

  fetchSalonProfile() {
    this.dataService.fetchSalonProfile(this.salon.id).subscribe(profile => {
      this.salon = profile.data;
      // Ensure salon.services is always an array
      if (!this.salon.services) {
        this.salon.services = [];
      }
    }, error => {
      console.error('Error fetching salon profile', error);
    });
  }
  

  fetchAllServices() {
    // Assuming fetchAvailableServices method is implemented in DataService
    this.dataService.fetchAllServices().subscribe(services => {
      this.availableServices = services.data;
    }, error => {
      console.error('Error fetching available services', error);
    });
  }

  fetchServices() {
    this.dataService.fetchServices(this.salon.id).subscribe(services => {
      this.salon.services = services;
    }, error => {
      console.error('Error fetching services', error);
    });
  }

  saveProfile() {
    // Assign selectedServiceIds directly as the services array
    this.salon.services = this.selectedServiceIds;
  
    console.log('Updated salon data to send:', this.salon);
  
    // Send this.salon to the backend with services as an array of IDs
    this.dataService.updateSalonProfile(this.salon.id, this.salon).subscribe(
      updatedProfile => {
        console.log('Updated salon profile:', updatedProfile);
        // Assuming the backend returns the full updated salon object, including services
        // You might need to refresh the services in your component or handle the updated data
        this.salon = updatedProfile.data;
      }, error => {
        console.error('Error updating salon profile', error);
      }
    );
  
    this.toggleEditMode();
  }
  
  
}
