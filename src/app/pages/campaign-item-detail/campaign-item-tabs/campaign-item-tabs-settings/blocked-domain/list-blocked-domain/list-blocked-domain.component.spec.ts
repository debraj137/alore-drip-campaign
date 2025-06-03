import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBlockedDomainComponent } from './list-blocked-domain.component';

describe('ListBlockedDomainComponent', () => {
  let component: ListBlockedDomainComponent;
  let fixture: ComponentFixture<ListBlockedDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBlockedDomainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBlockedDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
