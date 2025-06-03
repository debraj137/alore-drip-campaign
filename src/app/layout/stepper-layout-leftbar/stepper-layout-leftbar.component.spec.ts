import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperLayoutLeftbarComponent } from './stepper-layout-leftbar.component';

describe('StepperLayoutLeftbarComponent', () => {
  let component: StepperLayoutLeftbarComponent;
  let fixture: ComponentFixture<StepperLayoutLeftbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperLayoutLeftbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperLayoutLeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
