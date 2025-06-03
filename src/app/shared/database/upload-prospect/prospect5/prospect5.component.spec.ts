import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prospect5Component } from './prospect5.component';

describe('Prospect5Component', () => {
  let component: Prospect5Component;
  let fixture: ComponentFixture<Prospect5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Prospect5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Prospect5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
