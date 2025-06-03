import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridHeaderFieldComponent } from './ag-grid-header-field.component';

describe('AgGridHeaderFieldComponent', () => {
  let component: AgGridHeaderFieldComponent;
  let fixture: ComponentFixture<AgGridHeaderFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridHeaderFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridHeaderFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
