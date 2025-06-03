import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalFieldComponent } from './personal-field.component';

describe('PersonalFieldComponent', () => {
  let component: PersonalFieldComponent;
  let fixture: ComponentFixture<PersonalFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
