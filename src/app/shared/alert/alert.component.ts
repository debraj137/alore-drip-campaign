import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IAlertModal {
  title: string;
  isMandatory: boolean;
  message: string;
  isDelete: boolean;
  img: string;
  subHeading: string;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: [
    './alert.component.scss'
  ]
})
export class AlertComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAlertModal,
  ) { }

  ngOnInit(): void {
  }

}
