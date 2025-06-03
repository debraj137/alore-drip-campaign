import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDbRefreshPopupComponent } from './campaign-db-refresh-popup.component';

describe('CampaignDbRefreshPopupComponent', () => {
  let component: CampaignDbRefreshPopupComponent;
  let fixture: ComponentFixture<CampaignDbRefreshPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignDbRefreshPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDbRefreshPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
