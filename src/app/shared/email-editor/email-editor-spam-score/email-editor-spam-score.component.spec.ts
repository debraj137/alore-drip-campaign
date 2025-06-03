import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEditorSpamScoreComponent } from './email-editor-spam-score.component';

describe('EmailEditorSpamScoreComponent', () => {
  let component: EmailEditorSpamScoreComponent;
  let fixture: ComponentFixture<EmailEditorSpamScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailEditorSpamScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditorSpamScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
