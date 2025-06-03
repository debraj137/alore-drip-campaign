import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBlockedEmailComponent } from './list-blocked-email.component';

describe('ListBlockedEmailComponent', () => {
  let component: ListBlockedEmailComponent;
  let fixture: ComponentFixture<ListBlockedEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBlockedEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBlockedEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
