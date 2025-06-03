import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEditorCreateLinkComponent } from './email-editor-create-link.component';

describe('EmailEditorCreateLinkComponent', () => {
  let component: EmailEditorCreateLinkComponent;
  let fixture: ComponentFixture<EmailEditorCreateLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailEditorCreateLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditorCreateLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
