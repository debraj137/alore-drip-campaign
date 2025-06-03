import { TestBed } from '@angular/core/testing';

import { EmailIntegrationService } from './email-integration.service';

describe('EmailIntegrationService', () => {
  let service: EmailIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
