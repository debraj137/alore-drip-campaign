import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignItemTabsSettingsComponent } from './campaign-item-tabs-settings.component';

describe('CampaignItemTabsSettingsComponent', () => {
  let component: CampaignItemTabsSettingsComponent;
  let fixture: ComponentFixture<CampaignItemTabsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignItemTabsSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignItemTabsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
