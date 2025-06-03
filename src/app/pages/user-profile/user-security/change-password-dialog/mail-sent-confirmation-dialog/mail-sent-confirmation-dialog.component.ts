import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mail-sent-confirmation-dialog',
  templateUrl: './mail-sent-confirmation-dialog.component.html',
  styleUrls: ['./mail-sent-confirmation-dialog.component.scss']
})
export class MailSentConfirmationDialogComponent implements OnInit {
  
  @Input() email: string = "";
  disabledButton: boolean = false;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MailSentConfirmationDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.email = this.data.email;
  }

}
