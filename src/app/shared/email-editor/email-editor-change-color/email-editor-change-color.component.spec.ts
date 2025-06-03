import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEditorChangeColorComponent } from './email-editor-change-color.component';

describe('EmailEditorChangeColorComponent', () => {
  let component: EmailEditorChangeColorComponent;
  let fixture: ComponentFixture<EmailEditorChangeColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailEditorChangeColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditorChangeColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
