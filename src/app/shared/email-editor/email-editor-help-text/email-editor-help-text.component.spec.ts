import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEditorHelpTextComponent } from './email-editor-help-text.component';

describe('EmailEditorHelpTextComponent', () => {
  let component: EmailEditorHelpTextComponent;
  let fixture: ComponentFixture<EmailEditorHelpTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailEditorHelpTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditorHelpTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
