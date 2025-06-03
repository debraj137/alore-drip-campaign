import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prospect4Component } from './prospect4.component';

describe('Prospect4Component', () => {
  let component: Prospect4Component;
  let fixture: ComponentFixture<Prospect4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Prospect4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Prospect4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
