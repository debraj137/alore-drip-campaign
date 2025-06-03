import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperLayoutComponent } from './stepper-layout.component';

describe('StepperLayoutComponent', () => {
  let component: StepperLayoutComponent;
  let fixture: ComponentFixture<StepperLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
