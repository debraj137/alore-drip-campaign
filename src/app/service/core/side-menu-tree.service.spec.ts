import { TestBed } from '@angular/core/testing';

import { SideMenuTreeService } from './side-menu-tree.service';

describe('SideMenuTreeService', () => {
  let service: SideMenuTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideMenuTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
