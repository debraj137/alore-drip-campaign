import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameCampaignComponent } from './rename-campaign.component';

describe('RenameCampaignComponent', () => {
  let component: RenameCampaignComponent;
  let fixture: ComponentFixture<RenameCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenameCampaignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
