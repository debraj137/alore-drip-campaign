import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlockedMailComponent } from './add-blocked-mail.component';

describe('AddBlockedMailComponent', () => {
  let component: AddBlockedMailComponent;
  let fixture: ComponentFixture<AddBlockedMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBlockedMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlockedMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
