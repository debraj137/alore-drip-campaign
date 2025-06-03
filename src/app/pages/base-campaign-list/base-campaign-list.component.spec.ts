import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCampaignListComponent } from './base-campaign-list.component';

describe('BaseCampaignListComponent', () => {
  let component: BaseCampaignListComponent;
  let fixture: ComponentFixture<BaseCampaignListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseCampaignListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCampaignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
