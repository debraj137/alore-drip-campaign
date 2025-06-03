import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDailyReportComponent } from './list-daily-report.component';

describe('ListDailyReportComponent', () => {
  let component: ListDailyReportComponent;
  let fixture: ComponentFixture<ListDailyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDailyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDailyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
