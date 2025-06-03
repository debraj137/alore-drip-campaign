import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerSearchFilterComponent } from './date-picker-search-filter.component';

describe('DatePickerSearchFilterComponent', () => {
  let component: DatePickerSearchFilterComponent;
  let fixture: ComponentFixture<DatePickerSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerSearchFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
