import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonProfileComponent } from './salon-profile.component';

describe('SalonProfileComponent', () => {
  let component: SalonProfileComponent;
  let fixture: ComponentFixture<SalonProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalonProfileComponent]
    });
    fixture = TestBed.createComponent(SalonProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
