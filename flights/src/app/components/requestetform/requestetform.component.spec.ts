import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestetformComponent } from './requestetform.component';

describe('RequestetformComponent', () => {
  let component: RequestetformComponent;
  let fixture: ComponentFixture<RequestetformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestetformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestetformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
