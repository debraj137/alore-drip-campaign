import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWeeklyReportComponent } from './list-weekly-report.component';

describe('ListWeeklyReportComponent', () => {
  let component: ListWeeklyReportComponent;
  let fixture: ComponentFixture<ListWeeklyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWeeklyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWeeklyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
