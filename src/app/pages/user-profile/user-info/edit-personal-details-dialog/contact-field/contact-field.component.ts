import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-contact-field',
  templateUrl: './contact-field.component.html',
  styleUrls: ['./contact-field.component.scss']
})
export class ContactFieldComponent implements OnInit {
  
  contact = new FormControl();
  @Input() contactNo = '';
  @Output() contactNumberChanges = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

    this.contact.setValue(this.contactNo);
    
    this.contact.valueChanges.subscribe((event)=>{
      this.contactNumberChanges.emit(event);
    })
  }

}
