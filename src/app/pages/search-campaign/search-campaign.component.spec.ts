import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCampaignComponent } from './search-campaign.component';

describe('SearchCampaignComponent', () => {
  let component: SearchCampaignComponent;
  let fixture: ComponentFixture<SearchCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCampaignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
