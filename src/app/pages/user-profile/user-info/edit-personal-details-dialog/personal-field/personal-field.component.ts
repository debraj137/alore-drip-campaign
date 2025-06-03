import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-personal-field',
  templateUrl: './personal-field.component.html',
  styleUrls: ['./personal-field.component.scss']
})
export class PersonalFieldComponent implements OnInit {

  firstName = new FormControl();
  lastName = new FormControl();
  
  @Input() fName = ""
  @Input() lName = "";

  @Output() firstNameChanges = new EventEmitter<string>();
  @Output() lastNameChanges = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    
    this.firstName.setValue(this.fName);
    this.lastName.setValue(this.lName);
    
    this.firstName.valueChanges.subscribe((event)=>{
      this.firstNameChanges.emit(event);
    });

    this.lastName.valueChanges.subscribe((event)=>{
      this.lastNameChanges.emit(event);
    })
  }

}
