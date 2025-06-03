import { TestBed } from '@angular/core/testing';

import { GetFavoriteService } from './get-favorite.service';

describe('GetFavoriteService', () => {
  let service: GetFavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
