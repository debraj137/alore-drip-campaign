import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignItemTabsAnalyticsTableComponent } from './campaign-item-tabs-analytics-table.component';

describe('CampaignItemTabsAnalyticsTableComponent', () => {
  let component: CampaignItemTabsAnalyticsTableComponent;
  let fixture: ComponentFixture<CampaignItemTabsAnalyticsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignItemTabsAnalyticsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignItemTabsAnalyticsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
