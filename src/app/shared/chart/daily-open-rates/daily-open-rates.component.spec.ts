import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyOpenRatesComponent } from './daily-open-rates.component';

describe('DailyOpenRatesComponent', () => {
  let component: DailyOpenRatesComponent;
  let fixture: ComponentFixture<DailyOpenRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyOpenRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyOpenRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
