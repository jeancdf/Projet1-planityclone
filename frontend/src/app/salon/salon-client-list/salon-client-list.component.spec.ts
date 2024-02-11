import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonClientListComponent } from './salon-client-list.component';

describe('SalonClientListComponent', () => {
  let component: SalonClientListComponent;
  let fixture: ComponentFixture<SalonClientListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalonClientListComponent]
    });
    fixture = TestBed.createComponent(SalonClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
