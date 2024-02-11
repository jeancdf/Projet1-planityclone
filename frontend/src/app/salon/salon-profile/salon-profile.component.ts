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
  availableServices: any[] = [];
  selectedServiceIds: number[] = [];
  editMode = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.fetchServices();
    this.fetchAllServices();
    this.fetchSalonProfile();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) {

      this.selectedServiceIds = this.salon.services.map((service: any) => service.id);
    }
  }

  fetchSalonProfile() {

    this.dataService.fetchSalonProfile(this.salon.id).subscribe(profile => {
      this.salon = profile.data;
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
    this.salon.services = this.availableServices.filter(service => this.selectedServiceIds.includes(service.id));
    console.log('Updated salon data:', this.salon);
    // Here, implement the actual save logic, possibly using this.dataService
    this.toggleEditMode();
  }
}
