import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertEditorScreenComponent } from './alert-editor-screen.component';

describe('AlertEditorScreenComponent', () => {
  let component: AlertEditorScreenComponent;
  let fixture: ComponentFixture<AlertEditorScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertEditorScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertEditorScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
