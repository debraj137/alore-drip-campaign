import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-editor-screen',
  templateUrl: './alert-editor-screen.component.html',
  styleUrls: ['./alert-editor-screen.component.scss']
})
export class AlertEditorScreenComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlertEditorScreenComponent>,
  ) { }

  ngOnInit(): void {
  }

}
