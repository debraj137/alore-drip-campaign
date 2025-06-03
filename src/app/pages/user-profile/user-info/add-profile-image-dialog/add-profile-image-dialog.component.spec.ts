import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfileImageDialogComponent } from './add-profile-image-dialog.component';

describe('AddProfileImageDialogComponent', () => {
  let component: AddProfileImageDialogComponent;
  let fixture: ComponentFixture<AddProfileImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProfileImageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfileImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
