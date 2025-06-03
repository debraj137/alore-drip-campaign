import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerSnoozeComponent } from './date-picker-snooze.component';

describe('DatePickerSnoozeComponent', () => {
  let component: DatePickerSnoozeComponent;
  let fixture: ComponentFixture<DatePickerSnoozeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerSnoozeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerSnoozeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
