import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRatesComponent } from './open-rates.component';

describe('OpenRatesComponent', () => {
  let component: OpenRatesComponent;
  let fixture: ComponentFixture<OpenRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
