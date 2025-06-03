import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProspectDatabaseComponent } from './add-prospect-database.component';

describe('AddProspectDatabaseComponent', () => {
  let component: AddProspectDatabaseComponent;
  let fixture: ComponentFixture<AddProspectDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProspectDatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProspectDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
