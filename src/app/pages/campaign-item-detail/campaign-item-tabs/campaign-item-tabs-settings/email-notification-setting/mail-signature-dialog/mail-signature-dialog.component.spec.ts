import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSignatureDialogComponent } from './mail-signature-dialog.component';

describe('MailSignatureDialogComponent', () => {
  let component: MailSignatureDialogComponent;
  let fixture: ComponentFixture<MailSignatureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailSignatureDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSignatureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
