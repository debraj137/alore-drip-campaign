import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEditorSidebarComponent } from './email-editor-sidebar.component';

describe('EmailEditorSidebarComponent', () => {
  let component: EmailEditorSidebarComponent;
  let fixture: ComponentFixture<EmailEditorSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailEditorSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
