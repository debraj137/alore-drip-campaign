import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCampaignDetailComponent } from './base-campaign-detail.component';

describe('BaseCampaignDetailComponent', () => {
  let component: BaseCampaignDetailComponent;
  let fixture: ComponentFixture<BaseCampaignDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseCampaignDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCampaignDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
