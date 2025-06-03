import { InputModalityDetector } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-design-file',
  templateUrl: './common-design-file.component.html',
  styleUrls: ['./common-design-file.component.scss']
})
export class CommonDesignFileComponent implements OnInit {

  constructor() { }


  selected = 'option2';
  clickedLarge: boolean = false;
  clickedMedium: boolean = false;
  clickedSmall: boolean = false;
  radioLarge: boolean = false;
  radioMedium: boolean = false;
  radioSmall: boolean = false;
  disabledButton: boolean = false;
  neutral = false;

  value: string = '';
  value2: string = '';
  successValue: boolean = false;
  errorValue: boolean = false;
  accesslist: any[] = [
    {type: 'Owner', desc:'Settings delete & edit',image:'./assets/user-plus.svg'},
    {type: 'Editor', desc: 'Manage settings & share',image:'./assets/edit.svg'},
    {type: 'Viewer', desc: 'Can read and comment',image:'./assets/image-3.svg'},
  ];


  countryDetails: any[] = [
    {countryName: 'Australia', time: 'GMT + 1000',image: './assets/country-Flags/australia.svg'},
    {countryName: 'Australia', time: 'GMT + 0800',image: './assets/country-Flags/australia.svg'},
    {countryName: 'Singapore', time: 'GMT + 1000',image: './assets/country-Flags/singapore.svg'},

    {countryName: 'UAE', time: 'GMT + 0400',image: './assets/country-Flags/uae.svg'},
    {countryName: 'India', time: 'GMT + 0530',image: './assets/country-Flags/india.svg'},

    {countryName: 'Netherlands', time: 'GMT + 0200',image: './assets/country-Flags/netherland.svg'},
    {countryName: 'France', time: 'GMT + 0200',image: './assets/country-Flags/france.svg'},
    {countryName: 'Germany', time: 'GMT + 0200',image: './assets/country-Flags/germany.svg'},
    {countryName: 'Uk', time: 'GMT + 0100',image: './assets/country-Flags/united-kingdom.svg'},

    {countryName: 'United States', time: 'GMT + 0400',image: './assets/country-Flags/united-states.svg'},
    {countryName: 'United States', time: 'GMT + 0500',image: './assets/country-Flags/united-states.svg'},
    {countryName: 'United States', time: 'GMT + 0700',image: './assets/country-Flags/united-states.svg'},
    {countryName: 'United States', time: 'GMT + 08000',image: './assets/country-Flags/united-states.svg'}
  ];

  ngOnInit(): void {
   
  }
  checkBoxLarge(): void {
    this.clickedLarge = !this.clickedLarge;
  }
  checkBoxMedium(): void {
    this.clickedMedium = !this.clickedMedium;
   
  }
  
  checkBoxSmall(): void {
    this.clickedSmall = !this.clickedSmall;
    
  }
  
  radioBoxLarge(): void {
    this.radioLarge = !this.radioLarge;
    
  }
  radioBoxMedium(): void {
    this.radioMedium = !this.radioMedium;
    
  }
  radioBoxSmall(): void {
    this.radioSmall = !this.radioSmall;
    
  }

  getvalue() {
    this.value = this.value.trim();
    if (this.value == 'naman') {
      this.errorValue = true;
      this.successValue = false;
    } else if (this.value == 'chandan') {
      this.successValue = true;
      this.errorValue = false;
    } else {
      this.successValue = false;
      this.errorValue = false;
    }
  }
}
