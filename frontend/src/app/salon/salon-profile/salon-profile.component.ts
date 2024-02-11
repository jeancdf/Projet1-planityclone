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
      this.availableServices = services;
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
    // Map selected IDs back to service objects if necessary
    this.salon.services = this.availableServices.filter((service: any) => this.selectedServiceIds.includes(service.id));
    console.log('Updated salon data:', this.salon);
    // Here, implement the actual save logic, possibly using this.dataService
    this.toggleEditMode();
  }
}
