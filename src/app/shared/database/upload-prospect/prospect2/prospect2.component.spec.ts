import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prospect2Component } from './prospect2.component';

describe('Prospect2Component', () => {
  let component: Prospect2Component;
  let fixture: ComponentFixture<Prospect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Prospect2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Prospect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
