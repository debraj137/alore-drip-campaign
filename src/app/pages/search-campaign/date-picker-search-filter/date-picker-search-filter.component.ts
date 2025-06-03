import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { SearchCampaignComponent } from '../search-campaign.component';


@Component({
  selector: 'app-date-picker-search-filter',
  templateUrl: './date-picker-search-filter.component.html',
  styleUrls: ['./date-picker-search-filter.component.scss']
})
export class DatePickerSearchFilterComponent implements OnInit {


  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date | null>>();
  @Input() selectedDateRange!: DateRange<Date>;

  preDefinedDateIndex: number = 0;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  campaignId: string = ''

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.campaignId = this.activatedRoute.snapshot.paramMap.get('campaignId') || '';
    this.getDefaultDateRange();
    this.maxDate = new Date(
      this.minDate.getFullYear() + 1,
      this.minDate.getMonth(),
      this.minDate.getDate(),
    )
    this.minDate = new Date(
      this.minDate.getFullYear() - 1,
      this.minDate.getMonth(),
      this.minDate.getDate(),
    )


  }

  _onSelectedChange(date: Date): void {
    if (
      this.selectedDateRange &&
      this.selectedDateRange.start &&
      date > this.selectedDateRange.start &&
      !this.selectedDateRange.end
    ) {
      this.selectedDateRange = new DateRange(
        this.selectedDateRange.start,
        date
      );
    } else {
      this.selectedDateRange = new DateRange(date, null);
    }
  }

  applyFilter() {
    this.selectedRangeValueChange.emit(
      this.selectedDateRange
    )
  }

  getDefaultDateRange() {
    let campAnalytics = JSON.parse(localStorage.getItem('campAnalytics') || '');
    let isCampaignPresent = false;

    campAnalytics.map((obj: any) => {
      if (obj.campaignId == this.campaignId) {
        this.preDefinedDateIndex = obj.index;
        isCampaignPresent = true;
        return;
      }
    })

    if (!isCampaignPresent) {
      this.preDefinedDateIndex = 0;
    }

  }


  getPredifinedDateRageIndex(index: number) {

    let start !: Date;
    let end !: Date;
    let selectedDateRange!: DateRange<Date>
    this.preDefinedDateIndex = index;

    switch (index) {

      case 0: {
        let startDate = new Date();
        let endDate = new Date();
        endDate.setDate(startDate.getDate() - 7);
        start = startDate
        end = endDate
        break;
      }

      case 1: {
        let startDate = new Date();
        let endDate = new Date();
        endDate.setDate(startDate.getDate() - 30);
        start = startDate
        end = endDate

        break;
      }

      case 2: {
        let startDate = new Date();
        let endDate = new Date();

        endDate.setDate(startDate.getDate() - (30 * 3));
        start = startDate
        end = endDate
        break;
      }

      case 3: {
        let startDate = new Date();
        let endDate = new Date();
        endDate.setDate(1);
        start = startDate
        end = endDate
        break;
      }

      case 4:
        let startDate = new Date()

        let currentmonth = startDate.getMonth();

        let quarterMonth = 0;

        if (currentmonth < 3)
          quarterMonth = 0;

        if (currentmonth >= 3 && currentmonth < 6)
          quarterMonth = 3;

        if (currentmonth >= 6 && currentmonth < 9)
          quarterMonth = 6;

        if (currentmonth > 9)
          quarterMonth = 9;

        let endDate = new Date();
        endDate.setDate(1);
        endDate.setMonth(quarterMonth);

        start = startDate
        end = endDate

        break;
    }

    selectedDateRange = new DateRange(end, start)
    this.selectedRangeValueChange.emit(selectedDateRange)

    
   }

   removeDateRange(){
    let selectedDateRange!: DateRange<Date | null>
    selectedDateRange = new DateRange(null, null)
    this.selectedRangeValueChange.emit(selectedDateRange)
    

   }
}
