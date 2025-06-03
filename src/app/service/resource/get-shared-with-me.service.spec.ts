import { TestBed } from '@angular/core/testing';

import { GetSharedWithMeService } from './get-shared-with-me.service';

describe('GetSharedWithMeService', () => {
  let service: GetSharedWithMeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSharedWithMeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
