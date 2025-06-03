import { TestBed } from '@angular/core/testing';

import { SearchCampaignService } from './search-campaign.service';

describe('SearchCampaignService', () => {
  let service: SearchCampaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
