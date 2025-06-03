import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-social-field',
  templateUrl: './social-field.component.html',
  styleUrls: ['./social-field.component.scss']
})
export class SocialFieldComponent implements OnInit {

 
  linkedinUrl = new FormControl();
  twitterUrl = new FormControl();
  companyUrl= new FormControl();

  @Input() linkedinUrlValue !: string;
  @Input() twitterUrlValue !: string;
  @Input() companyUrlValue !: string;
  @Output() linkedinUrlValueChanges = new EventEmitter<string>();
  @Output() twitterUrlValueChanges = new EventEmitter<string>();
  @Output() companyUrlValueChanges = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.linkedinUrl.setValue(this.linkedinUrlValue);
    this.twitterUrl.setValue(this.twitterUrlValue);
    this.companyUrl.setValue(this.companyUrlValue);
    
    this.linkedinUrl.valueChanges.subscribe((event)=>{
      this.linkedinUrlValueChanges.emit(event);
    })

    this.twitterUrl.valueChanges.subscribe((event)=>{
      this.twitterUrlValueChanges.emit(event);
    })

    this.companyUrl.valueChanges.subscribe((event)=>{
      this.companyUrlValueChanges.emit(event);
    })
  }

}
