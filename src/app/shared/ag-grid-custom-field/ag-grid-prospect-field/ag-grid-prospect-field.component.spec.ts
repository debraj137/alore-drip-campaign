import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridProspectFieldComponent } from './ag-grid-prospect-field.component';

describe('AgGridProspectFieldComponent', () => {
  let component: AgGridProspectFieldComponent;
  let fixture: ComponentFixture<AgGridProspectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridProspectFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridProspectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
