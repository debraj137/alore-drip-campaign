import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridTagComponent } from './ag-grid-tag.component';

describe('AgGridTagComponent', () => {
  let component: AgGridTagComponent;
  let fixture: ComponentFixture<AgGridTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
