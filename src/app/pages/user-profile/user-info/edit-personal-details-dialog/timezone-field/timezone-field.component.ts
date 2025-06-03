import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ObjectiveService } from '../../../../../service/resource/objective.service';


@Component({
  selector: 'app-timezone-field',
  templateUrl: './timezone-field.component.html',
  styleUrls: ['./timezone-field.component.scss']
})
export class TimezoneFieldComponent implements OnInit {

  timezone = new FormControl();
  onlyTimeZoneNames: any[] = [];
  defaultZonelist: any[] = [];
  searchResults: any[] = [];
  timezonesList: any;
  currentselectedTime: any = null;
  isTimezoneLoaded: boolean = false;

  @Input() timezoneValue !: string;
  @Output() timeZoneChanges = new EventEmitter<string>();

  constructor(
    private objectiveService: ObjectiveService
  ) { }

  ngOnInit(): void {
    this.timezone.setValue(this.timezoneValue);

    this.timezone.valueChanges.subscribe((timezoneValue) => {
      this.timeZoneChanges.emit(timezoneValue);
    })

    this.getAllTimeZones();
  }

  getAllTimeZones() {
    this.objectiveService.getAllTimeZones().subscribe((res: any) => {

      if (res.responseCodeJson.code === 200) {
        this.timezonesList = res.list;
        this.timezonesList.forEach((element: any, index: number) => {
          this.onlyTimeZoneNames.push(element.timeZone);
          this.defaultZonelist = this.onlyTimeZoneNames;

          // if (this.step2Data === element.value) {
          //   this.selectedValue = element.timeZone
          // }
        });
        this.isTimezoneLoaded = true;
      }
    });
  }

  onKeyDown(value: any) {
    this.searchResults = this.search(value.value);
    this.onlyTimeZoneNames = this.searchResults;
    if (value.value == '') {
      this.onlyTimeZoneNames = this.defaultZonelist;
    }


  }

  search(value: any) {
    let filter = value.toLowerCase();
    return this.defaultZonelist.filter((option: string) => option.toLowerCase().includes(filter));
  }

  triggerEvent(event: any) {

  }


}
