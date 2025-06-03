import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationCheckFlowComponent } from './integration-check-flow.component';

describe('IntegrationCheckFlowComponent', () => {
  let component: IntegrationCheckFlowComponent;
  let fixture: ComponentFixture<IntegrationCheckFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegrationCheckFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationCheckFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
