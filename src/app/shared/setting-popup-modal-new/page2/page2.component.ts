import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ObjectiveService } from 'src/app/service/resource/objective.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit {

  @Output() pageAction = new EventEmitter<any>();
  @Input() campId: any = '';
  @Input() step2Data: string = '';
  @Input() prevStep: number = 0;
  @Input() nextStep: number = 0;
  @Input() isSingleStep: boolean = false;
  @Input() isFirstStep: boolean = false;
  @ViewChild('timezoneInput') timezoneInput!: MatSelect;
  selectedValue: any = '';
  searchResults: any[]=[];
  timezonesList: any;
  onlyTimeZoneNames:any[]=[];
  defaultZonelist: any[]=[];
  timeZonevalues: any;
  previousValue: boolean = false;
  selectedTimeZoneValue: any;

  countryDetails: any[] = [
    {countryName: 'Australia', time: 'GMT + 1000',image: './assets/country-Flags/australia.svg',timeValue: 'Australia/Brisbane'},
    {countryName: 'Australia', time: 'GMT + 0800',image: './assets/country-Flags/australia.svg',timeValue: 'Australia/Perth'},
    {countryName: 'Singapore', time: 'GMT + 0800',image: './assets/country-Flags/singapore.svg',timeValue: 'Asia/Singapore'},

    {countryName: 'UAE', time: 'GMT + 0400',image: './assets/country-Flags/uae.svg',timeValue: 'Asia/Dubai'},
    {countryName: 'India', time: 'GMT + 0530',image: './assets/country-Flags/india.svg',timeValue: 'Asia/Kolkata'},

    {countryName: 'Netherlands', time: 'GMT + 0200',image: './assets/country-Flags/netherland.svg',timeValue: 'Europe/Amsterdam'},
    {countryName: 'France', time: 'GMT + 0200',image: './assets/country-Flags/france.svg',timeValue: 'Europe/Paris'},
    {countryName: 'Germany', time: 'GMT + 0200',image: './assets/country-Flags/germany.svg',timeValue: 'Europe/Berlin'},
    {countryName: 'UK', time: 'GMT + 0100',image: './assets/country-Flags/united-kingdom.svg',timeValue: 'Europe/London'},

    {countryName: 'United States', time: 'GMT - 0400',image: './assets/country-Flags/united-states.svg',timeValue: 'America/Antigua'},
    {countryName: 'United States', time: 'GMT - 0500',image: './assets/country-Flags/united-states.svg',timeValue: 'America/New_York'},
    {countryName: 'United States', time: 'GMT - 0700',image: './assets/country-Flags/united-states.svg',timeValue: 'America/Denver'},
    {countryName: 'United States', time: 'GMT - 08000',image: './assets/country-Flags/united-states.svg',timeValue: 'US/Pacific'}
  ];
  currentselectedTime: any = null;
  clickedPredefined: boolean = false;

  constructor(
    private objectiveService : ObjectiveService
  ) { }

  ngOnInit(): void {
    this.getAllTimeZones();
  }

  getAllTimeZones(){
    this.objectiveService.getAllTimeZones().subscribe((res:any)=>{
      this.timezonesList = res.list;
      this.timezonesList.forEach((element:any, index :number) => {
        this.onlyTimeZoneNames.push(element.timeZone);
        this.defaultZonelist = this.onlyTimeZoneNames;
        
        if (this.step2Data === element.value) {
          this.selectedValue = element.timeZone
        }
      });
    });
  }


  onKeyDown(value:any) { 
    this.searchResults = this.search(value.value);
    this.onlyTimeZoneNames = this.searchResults;
    if(value.value == ''){
      this.onlyTimeZoneNames = this.defaultZonelist;
    }
  }

  search(value: any) { 
    let filter = value.toLowerCase();
    return this.defaultZonelist.filter((option: string) => option.toLowerCase().includes(filter));
  }
  
  triggerEvent(event:any){
  }

  sendCustomTimeZone(){
    if(this.clickedPredefined){
      this.objectiveService.sendCustomTimeZone(
        this.campId,
        this.selectedTimeZoneValue,
        3
      ).subscribe(
        (res:any)=>{
          this.pageAction.emit({
            page : this.isSingleStep ? 0 : this.nextStep,
            data : this.selectedValue
          })
        }
      )
    }else{
      this.timezonesList.forEach((element:any) => {
        if(element.timeZone == this.selectedValue){
          this.selectedTimeZoneValue = element.value;
        }
      });
      this.objectiveService.sendCustomTimeZone(
        this.campId,
        this.selectedTimeZoneValue,
        3
      ).subscribe(
        (res:any)=>{
          this.pageAction.emit({
            page : this.isSingleStep ? 0 : this.nextStep,
            data : this.selectedValue
          })
        }
      )
    }

  }
  pressedPreDefinedTime(item:any,index:any){


    this.clickedPredefined = true;
    this.currentselectedTime = index;
    this.selectedTimeZoneValue = item.timeValue
    this.selectedValue = item.timeValue;

    const value = document.getElementById('timeZoneInput') as HTMLElement;
    value.children[1].children[0].children[0].children[0].textContent = item.timeValue;
    
  }
}
