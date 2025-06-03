import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prospect1Component } from './prospect1.component';

describe('Prospect1Component', () => {
  let component: Prospect1Component;
  let fixture: ComponentFixture<Prospect1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Prospect1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Prospect1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
