import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomHighlightComponent } from './custom-highlight.component';

describe('CustomHighlightComponent', () => {
  let component: CustomHighlightComponent;
  let fixture: ComponentFixture<CustomHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomHighlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
