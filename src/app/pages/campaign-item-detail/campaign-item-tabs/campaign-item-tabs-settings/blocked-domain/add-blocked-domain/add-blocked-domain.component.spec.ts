import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlockedDomainComponent } from './add-blocked-domain.component';

describe('AddBlockedDomainComponent', () => {
  let component: AddBlockedDomainComponent;
  let fixture: ComponentFixture<AddBlockedDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBlockedDomainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlockedDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
