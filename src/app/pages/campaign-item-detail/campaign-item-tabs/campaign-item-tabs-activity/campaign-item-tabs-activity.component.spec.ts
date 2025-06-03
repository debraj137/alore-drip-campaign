import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignItemTabsActivityComponent } from './campaign-item-tabs-activity.component';

describe('CampaignItemTabsActivityComponent', () => {
  let component: CampaignItemTabsActivityComponent;
  let fixture: ComponentFixture<CampaignItemTabsActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignItemTabsActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignItemTabsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
