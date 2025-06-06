import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationLoaderComponent } from './pagination-loader.component';

describe('PaginationLoaderComponent', () => {
  let component: PaginationLoaderComponent;
  let fixture: ComponentFixture<PaginationLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
