import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperLayoutHeaderComponent } from './stepper-layout-header.component';

describe('StepperLayoutHeaderComponent', () => {
  let component: StepperLayoutHeaderComponent;
  let fixture: ComponentFixture<StepperLayoutHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperLayoutHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperLayoutHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
