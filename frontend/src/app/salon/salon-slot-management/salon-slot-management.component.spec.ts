import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonSlotManagementComponent } from './salon-slot-management.component';

describe('SalonSlotManagementComponent', () => {
  let component: SalonSlotManagementComponent;
  let fixture: ComponentFixture<SalonSlotManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalonSlotManagementComponent]
    });
    fixture = TestBed.createComponent(SalonSlotManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
