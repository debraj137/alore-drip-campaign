import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-company-field',
  templateUrl: './company-field.component.html',
  styleUrls: ['./company-field.component.scss']
})
export class CompanyFieldComponent implements OnInit {
  
  companyName = new FormControl();
  jobTitle = new FormControl();
  @Input() company !: string;
  @Input() jobName !: string;
  @Output() companyNameChanges = new EventEmitter<string>();
  @Output() jobTitleChanges = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
    this.companyName.setValue(this.company);
    this.jobTitle.setValue(this.jobName);

    this.companyName.valueChanges.subscribe((event)=>{
      this.companyNameChanges.emit(event);
    })

    this.jobTitle.valueChanges.subscribe((event)=>{
      this.jobTitleChanges.emit(event);
    })
  }

}
