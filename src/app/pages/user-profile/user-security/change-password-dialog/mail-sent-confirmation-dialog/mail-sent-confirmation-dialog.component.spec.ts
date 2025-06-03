import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSentConfirmationDialogComponent } from './mail-sent-confirmation-dialog.component';

describe('MailSentConfirmationDialogComponent', () => {
  let component: MailSentConfirmationDialogComponent;
  let fixture: ComponentFixture<MailSentConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailSentConfirmationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSentConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
