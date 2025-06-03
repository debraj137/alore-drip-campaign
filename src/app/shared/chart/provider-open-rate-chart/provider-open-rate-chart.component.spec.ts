import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderOpenRateChartComponent } from './provider-open-rate-chart.component';

describe('ProviderOpenRateChartComponent', () => {
  let component: ProviderOpenRateChartComponent;
  let fixture: ComponentFixture<ProviderOpenRateChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderOpenRateChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderOpenRateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
