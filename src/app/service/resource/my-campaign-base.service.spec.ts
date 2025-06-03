import { TestBed } from '@angular/core/testing';

import { MyCampaignBaseService } from './my-campaign-base.service';

describe('MyCampaignBaseService', () => {
  let service: MyCampaignBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyCampaignBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
