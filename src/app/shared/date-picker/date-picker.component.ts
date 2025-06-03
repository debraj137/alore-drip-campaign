import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  @Output() selectedRangeValueChange = new EventEmitter<any>();
  selectedDate: any;
  todayDate:Date = new Date();
  maxDate:Date = new Date();

  constructor() { }

  ngOnInit(): void {
    this.maxDate = new  Date(
      this.todayDate.getFullYear() + 1,
      this.todayDate.getMonth(),
      this.todayDate.getDate(),
    )
  }

  selectDate(){
    this.selectedRangeValueChange.emit(
      this.selectedDate

    )
  }
}
