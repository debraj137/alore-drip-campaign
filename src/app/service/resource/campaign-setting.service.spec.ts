import { TestBed } from '@angular/core/testing';

import { CampaignSettingService } from './campaign-setting.service';

describe('CampaignSettingService', () => {
  let service: CampaignSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
