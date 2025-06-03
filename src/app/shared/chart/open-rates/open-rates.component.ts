import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartDataset } from 'chart.js';
import { IGetOpenRate } from 'src/app/model/analytics';
import { AnalyticsService } from 'src/app/service/resource/analytics.service';
import { DateRange } from '@angular/material/datepicker';
import { ChartService } from 'src/app/service/core/chart.service';

@Component({
  selector: 'app-open-rates',
  templateUrl: './open-rates.component.html',
  styleUrls: [
    './open-rates.component.scss',
    '../../../../assets/style/chart-style.scss',
  ],
})
export class OpenRatesComponent implements OnInit {

  @Input() baseId : string = ''
  @Input() campaignId : string = ''

  isGraphDataEmpty:boolean = false;
  todayDate:Date = new Date;
  barChartData: ChartDataset[] = [
    {
      data: [],
      backgroundColor: '#334bfa',
      hoverBackgroundColor:'#334bfa',
      borderRadius: [3, 3],
      barThickness: 14
    }
  ];
  loader: boolean = true;
  opened: number = 0;
  delivered: number = 0;
  totalPercentage: string = '';

  // datepicker var
  diffMonth: number = 0;
  diffDay: number = 0;
  filterData!: DateRange<Date>;

  barChartLabels: any[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  barChartPlugins = [];
  barChartLegend = false;
  timePeriod: string[] = [
    // in month
    '1',
    '6',
    '12',
  ];
  openRate: any;

  constructor(
    private analyticsService: AnalyticsService,
    private chartService : ChartService,
    private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.barChartOptions = this.chartService.openRateChartOption
    // initializing date range
    let startDate = new Date();
    let endDate = this.todayDate ;


    //condition if Analytic date range present in local storage
    let campAnalytics = JSON.parse(localStorage.getItem('campAnalytics') || '');
    let isCampaignPresent = false;

    campAnalytics.map((obj: any) => {
      if(obj.campaignId == this.campaignId){
        isCampaignPresent = true;
        startDate = new Date(obj.startDate);
        endDate = new Date(obj.endDate);
        return;
      }
    })

    if(!isCampaignPresent){
      startDate.setDate(startDate.getDate() - 8);
    }
 
    this.filterData = new DateRange(startDate, endDate);
    this.calculatingDiffDay(startDate, endDate);
    this.getGraphData(startDate, endDate);
  }

  getGraphData(startDate: Date, endDate: Date) {
    // converting date & initializing payload
    const convertedEndDate = `${endDate.getFullYear()}-${this.checkTwoDigitNumber(
      endDate.getMonth() + 1
    )}-${this.checkTwoDigitNumber(endDate.getDate())}`;
    const convertedStartDate = `${startDate.getFullYear()}-${this.checkTwoDigitNumber(
      startDate.getMonth() + 1
    )}-${this.checkTwoDigitNumber(startDate.getDate())}`;
    this.loader = true;
    
    const payload: IGetOpenRate = {
      campaignId: this.campaignId,
      fromDate: convertedStartDate,
      toDate: convertedEndDate,
    };

    // hitting the api
    this.analyticsService.getOpenRates(payload).subscribe((resp: any) => {
      if (resp.responseCodeJson.code === 200) {
        this.isGraphDataEmpty = !resp.object.data?.length
        // empty the old data
        this.barChartData[0].data = []
        this.barChartLabels = []

        this.opened = resp.object.openedMail;
        this.delivered = resp.object.maxValue;
        resp.object.data.forEach((obj: any, index: number) => {
          // label data mapping
          const label = 'Mail ' + (index + 1);
          this.barChartLabels.push(label);

          // graph data mapping
          const graphData = obj[Object.keys(obj).toString()];
          this.barChartData[0].data.push(graphData.opened);
          this.totalPercentage = resp.object.overAllPercentage;
          
        });
      }
      this.loader = false;
     
    }),
      (error: any) => {
        alert('failed to laoad chart data');
      };
  }

  onDateChanged(event: any) {
    // assigning filter date
    const endDate = new Date(event.end);
    const startDate = new Date(event.start);
    this.filterData = new DateRange(startDate, endDate);

    // calculating diff day
    this.calculatingDiffDay(startDate, endDate);

    // calling api
    this.getGraphData(startDate, endDate);
  }

  calculatingDiffDay(startDate: Date, endDate: Date) {
    var diff = Math.floor(endDate.getTime() - startDate.getTime());
    var day = 1000 * 60 * 60 * 24;
    this.diffDay = Math.floor(diff / day);
    this.diffMonth = Math.floor(this.diffDay / 31);
   
  }

  checkTwoDigitNumber(num: number) {
    if (num <= 9) {
      return `0${num}`;
    } else {
      return num;
    }
  }
}
