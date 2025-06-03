import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBccComponent } from './list-bcc.component';

describe('ListBccComponent', () => {
  let component: ListBccComponent;
  let fixture: ComponentFixture<ListBccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
