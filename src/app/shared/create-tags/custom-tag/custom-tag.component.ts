import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-custom-tag',
  templateUrl: './custom-tag.component.html',
  styleUrls: ['./custom-tag.component.scss']
})
export class CustomTagComponent implements OnInit {

  tagField: any[] = [
    {name : 'Company Size', value : 1},
    {name: 'Industry', value: 2},
    {name: 'Geography', value: 3},
    {name: 'Job Title', value: 4}
  ]

  @Output() customTagData = new EventEmitter<any>();

  tagControl: FormControl = new FormControl()
  tagContentControl: FormControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<CustomTagComponent>,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.dialogRef.close({
      "tagType" : this.tagControl.value,
      "tagValue" : this.tagContentControl.value
    })
  }

  tagContentValue(i: any) {
    let value = this.tagField[i].name;
    this.tagControl.setValue(value);
  }

}
