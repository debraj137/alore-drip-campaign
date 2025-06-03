import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignItemTabsRepliesComponent } from './campaign-item-tabs-replies.component';

describe('CampaignItemTabsRepliesComponent', () => {
  let component: CampaignItemTabsRepliesComponent;
  let fixture: ComponentFixture<CampaignItemTabsRepliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignItemTabsRepliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignItemTabsRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
