import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridEmailFieldComponent } from './ag-grid-email-field.component';

describe('AgGridEmailFieldComponent', () => {
  let component: AgGridEmailFieldComponent;
  let fixture: ComponentFixture<AgGridEmailFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridEmailFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridEmailFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
