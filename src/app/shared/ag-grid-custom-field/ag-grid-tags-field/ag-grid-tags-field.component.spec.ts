import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridTagsFieldComponent } from './ag-grid-tags-field.component';

describe('AgGridTagsFieldComponent', () => {
  let component: AgGridTagsFieldComponent;
  let fixture: ComponentFixture<AgGridTagsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridTagsFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridTagsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
