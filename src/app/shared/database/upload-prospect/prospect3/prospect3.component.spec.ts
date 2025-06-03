import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prospect3Component } from './prospect3.component';

describe('Prospect3Component', () => {
  let component: Prospect3Component;
  let fixture: ComponentFixture<Prospect3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Prospect3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Prospect3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
