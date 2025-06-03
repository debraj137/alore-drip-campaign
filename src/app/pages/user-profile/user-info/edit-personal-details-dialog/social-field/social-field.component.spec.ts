import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialFieldComponent } from './social-field.component';

describe('SocialFieldComponent', () => {
  let component: SocialFieldComponent;
  let fixture: ComponentFixture<SocialFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
