import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBccModalComponent } from './add-bcc-modal.component';

describe('AddBccModalComponent', () => {
  let component: AddBccModalComponent;
  let fixture: ComponentFixture<AddBccModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBccModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBccModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
