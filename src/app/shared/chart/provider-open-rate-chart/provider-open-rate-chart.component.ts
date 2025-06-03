import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { ChartOptions, ChartType, ChartDataset, Color } from 'chart.js';
import { IGetOpenRate, IGraphObj } from 'src/app/model/analytics';
import { ChartService } from 'src/app/service/core/chart.service';
import { AnalyticsService } from 'src/app/service/resource/analytics.service';


@Component({
  selector: 'app-provider-open-rate-chart',
  templateUrl: './provider-open-rate-chart.component.html',
  styleUrls: ['./provider-open-rate-chart.component.scss']
})
export class ProviderOpenRateChartComponent implements OnInit {

  
  @Input() baseId: string = ''
  @Input() campaignId: string = ''
  @Input() graphIndex: number = 0;
  // chart variable

  barChartData: ChartDataset[] = [
    {
      data: [],
      backgroundColor: '#334BFA',
      hoverBackgroundColor: '#334BFA',
      borderRadius: [3, 3, 3, 3],
      barThickness: 14
    },
    {
      data: [],
      backgroundColor: '#7F33FA',
      hoverBackgroundColor: '#7F33FA',
      borderRadius: [3, 3, 3, 3],
      barThickness: 14
    },
    {
      data: [],
      backgroundColor: '#F3F3F3',
      hoverBackgroundColor: '#F3F3F3',
      borderRadius: [3, 3, 3, 3],
      barThickness: 14
    },
  ];
  barChartLabels: string[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }
  barChartPlugins = [];
  barChartLegend = false;
  api = ''

  // other variable
  monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  weekNames = [
    "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
  ]
  timePeriod: string[] = [
    '12',
    '6',
    '1'
  ];
  loader: boolean = false;
  percentage: number = 0;
  totalData: number = 0;
  isGraphDataEmpty: boolean = false

  // datepicker variable
  diffMonth: number = 0;
  diffDay: number = 0;
  filterData!: DateRange<Date>

  constructor(
    private analyticsService: AnalyticsService,
    private chartService: ChartService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.barChartOptions = this.chartService.dailyVolumeChartOption;
    let today = new Date();
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let startDate = new Date();
    let endDate = today;

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
      startDate.setDate(startDate.getDate() - 7);
    }

    
    this.filterData = new DateRange(startDate,endDate)
    this.calculatingDiffDay(startDate, endDate)
    this.getProviderData(startDate, endDate);
  }

  ngOnChanges(change: SimpleChanges){
    
    let today = new Date();
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let startDate = new Date();
    let endDate = today;
    startDate.setDate(startDate.getDate() - 7);
    endDate.setDate(endDate.getDate())

    switch(this.graphIndex){
      case 0:
        this.api = 'getGmailSentReport'
        this.getProviderData(startDate, endDate);
        return;
      
      case 1:
        this.api = 'getOutlookSentReport'
        this.getProviderData(startDate, endDate);
        return;

      case 2: 
        this.api = 'getOthersSentReport'
        this.getProviderData(startDate, endDate);
        return;

      default:
        return;
    }
  }


  getProviderData(startDate: Date, endDate: Date) {
    // converting date & initializing payload
    const convertedEndDate = `${endDate.getFullYear()}-${this.checkTwoDigitNumber(endDate.getMonth() + 1)}-${this.checkTwoDigitNumber(endDate.getDate())}`
    const convertedStartDate = `${startDate.getFullYear()}-${this.checkTwoDigitNumber(startDate.getMonth() + 1)}-${this.checkTwoDigitNumber(startDate.getDate())}`
    this.loader = true;


    const payload: IGetOpenRate = {
      campaignId: this.campaignId,
      fromDate: convertedStartDate,
      toDate: convertedEndDate
    }

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    this.analyticsService.getProviderOpenRates(this.api, payload).subscribe(
      (resp: any) => {
        this.loader = false
        if (resp.responseCodeJson.code === 200) {
          this.isGraphDataEmpty = !resp.object.data?.length
          this.totalData = resp.object.openedMail
          const percentage = Number(resp.object.totalOpenRate)
          this.percentage = !isNaN(percentage) ? percentage : 0
          // empty chart data first
          this.barChartData[2].data = []
          this.barChartData[1].data = []
          this.barChartData[0].data = []
          this.barChartLabels = []

          // this variable will filled with all months data
          let monthlyData: any[] = []

          // monthly data mapping
        
          resp.object.data.forEach((obj: any, index: number) => {

            // initializing month name data
            const splittedLabel = Object.keys(obj)[0].split('-')
            const month = Number(splittedLabel[1])
            const dailyData: any = obj[Object.keys(obj)[0]]
            this.barChartData[0].data.push(dailyData.delivered)
            this.barChartData[1].data.push(dailyData.opened)
            // this.barChartData[2].data.push(dailyData.replied)

            let date = new Date(Object.keys(obj)[0]);

            // assigning total data & label
            this.barChartLabels.push(splittedLabel[2] + '-' + months[date.getMonth()])
    
          })
        }
      }
    )
  }

  onDateChanged(event: any) {
    // assigning filter date
    const endDate = new Date(event.end)
    const startDate = new Date(event.start)
    this.filterData = new DateRange(
      startDate,
      endDate
    )

    // calculating diff day
    this.calculatingDiffDay(startDate, endDate)

    // calling api
    this.getProviderData(startDate, endDate)
  }

  calculatingDiffDay(startDate: Date, endDate: Date) {
    var diff = Math.floor(endDate.getTime() - startDate.getTime());
    var day = 1000 * 60 * 60 * 24;
    this.diffDay = Math.floor(diff / day);
    this.diffMonth = Math.floor(this.diffDay / 31);

  }

  checkTwoDigitNumber(num: number) {
    if (num <= 9) {
      return `0${num}`
    } else {
      return num
    }
  }


}
