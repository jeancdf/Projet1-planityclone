import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonDashboardComponent } from './salon-dashboard.component';

describe('SalonDashboardComponent', () => {
  let component: SalonDashboardComponent;
  let fixture: ComponentFixture<SalonDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalonDashboardComponent]
    });
    fixture = TestBed.createComponent(SalonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
