import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HideTableColumnComponent } from './hide-table-column.component';

describe('HideTableColumnComponent', () => {
  let component: HideTableColumnComponent;
  let fixture: ComponentFixture<HideTableColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HideTableColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HideTableColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
