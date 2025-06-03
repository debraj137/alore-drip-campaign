import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailyReportComponent } from './add-daily-report.component';

describe('AddDailyReportComponent', () => {
  let component: AddDailyReportComponent;
  let fixture: ComponentFixture<AddDailyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDailyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDailyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
