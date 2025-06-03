import { Component, Inject, OnInit } from '@angular/core';
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
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

 
  constructor(
    public dialogRef: MatDialogRef<SuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAlertModal,
  ) { }

  ngOnInit(): void {
  }

}
