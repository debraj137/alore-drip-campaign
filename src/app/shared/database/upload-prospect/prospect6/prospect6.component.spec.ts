import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prospect6Component } from './prospect6.component';

describe('Prospect6Component', () => {
  let component: Prospect6Component;
  let fixture: ComponentFixture<Prospect6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Prospect6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Prospect6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
