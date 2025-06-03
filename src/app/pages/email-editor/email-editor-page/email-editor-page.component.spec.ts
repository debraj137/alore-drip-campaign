import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEditorPageComponent } from './email-editor-page.component';

describe('EmailEditorPageComponent', () => {
  let component: EmailEditorPageComponent;
  let fixture: ComponentFixture<EmailEditorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailEditorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
