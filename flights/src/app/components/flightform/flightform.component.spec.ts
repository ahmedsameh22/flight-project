import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightformComponent } from './flightform.component';

describe('FlightformComponent', () => {
  let component: FlightformComponent;
  let fixture: ComponentFixture<FlightformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
