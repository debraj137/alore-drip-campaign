import { TestBed } from '@angular/core/testing';

import { GetSharedByMeService } from './get-shared-by-me.service';

describe('GetSharedByMeService', () => {
  let service: GetSharedByMeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSharedByMeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
