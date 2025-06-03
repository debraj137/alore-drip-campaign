import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignItemTabsAnalyticsComponent } from './campaign-item-tabs-analytics.component';

describe('CampaignItemTabsAnalyticsComponent', () => {
  let component: CampaignItemTabsAnalyticsComponent;
  let fixture: ComponentFixture<CampaignItemTabsAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignItemTabsAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignItemTabsAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
