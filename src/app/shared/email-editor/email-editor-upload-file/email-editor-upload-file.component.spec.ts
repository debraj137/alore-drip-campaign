import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEditorUploadFileComponent } from './email-editor-upload-file.component';

describe('EmailEditorUploadFileComponent', () => {
  let component: EmailEditorUploadFileComponent;
  let fixture: ComponentFixture<EmailEditorUploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailEditorUploadFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditorUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
