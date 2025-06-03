import { ChartService } from 'src/app/service/core/chart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CommonService } from 'src/app/service/core/common.service';
import { AnalyticsService } from 'src/app/service/resource/analytics.service';
import { DateRange } from '@angular/material/datepicker';
import { IGetOpenRate, IGraphObj } from 'src/app/model/analytics';

@Component({
  selector: 'app-daily-links-click',
  templateUrl: './daily-links-click.component.html',
  styleUrls: [
    './daily-links-click.component.scss',
    '../../../../assets/style/chart-style.scss',
  ],
})
export class DailyLinksClickComponent implements OnInit {

  @Input() mailName: string = ''
  @Input() campaignId: string = ''
  @Input() mailId: string = ''
  @Input() fromDate: number = 0;
  @Input() toDate: number = 0;

  colorSelections: string[] = [
    '#334BFA', '#FA336F', '#FFCE56', '#E7E9ED', '#444444',
    '#83CC8B', '#61C76C', '#20C933', '#00B514', '#338A17',
    '#AFB5FF', '#8E96FF', '#6B76FF', '#3140FF', '#0013FF',
    '#FFB598', '#FF9E79', '#FF7844', '#FF4700', '#C53700',
    '#FF9FF2', '#FE67E9', '#F638DC', '#FF00DC', '#D600B8',
    '#FFE3AF', '#FFD68C', '#FFC55C', '#FDB22B', '#E89500',
    '#FFB3C8', '#FF8CAD', '#FF4E81', '#FF0049', '#DA0240',
    '#C2F5E9', '#72DDC3', '#20D9D2', '#7BC8C3', '#06A09B',
    '#D0F0FD', '#77D1F3', '#18BFFF', '#4083AC', '#0B76B7',
    '#CFDFFF', '#9CC7FF', '#2D7FF9', '#0067FF', '#0054D1'
  ]


  lineChartData: ChartDataset[] = [
    
  ];

  lineChartLabels: string[] = [];
  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  lineChartColors: any[] = this.colorSelections;
  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

  filterData!: DateRange<Date>
  diffMonth: number = 0;
  diffDay: number = 0;

  reqId = 0;
  loader: boolean = true;
  isDataEmpty: boolean = false;
  // isGraphDataEmpty: boolean = false;
  // percentage: number = 0;
  // totalData: any;

  constructor(
    private analyticService: AnalyticsService,
    private commonService: CommonService,
    private chartService: ChartService,
  ) { }

  ngOnInit(): void {
    this.lineChartOptions = this.chartService.getDailyLinkClickedChart;
    const start = new Date();
    const end = new Date();
    const fromDate = `${start.getFullYear()}-${this.verifyNumberDigit(start.getMonth() + 1)}-${this.verifyNumberDigit(start.getDate())}`
    const toDate = `${end.getFullYear()}-${this.verifyNumberDigit(end.getMonth() + 1)}-${this.verifyNumberDigit(end.getDate())}`
    this.getGraphData(fromDate, toDate)
    this.mailName;

  }

  getGraphData(fromDate: string, toDate: string) {
    this.loader = true
    const payload = {
      campaignId: this.campaignId,
      emailId: this.mailId,
      fromDate: fromDate,
      toDate: toDate,
    };

    this.analyticService.getClickedData(payload).subscribe((res: any) => {
      if (res.responseCodeJson.code === 200 && res.data.length > 0) {
        this.reqId = res.totalLink;
        this.lineChartLabels = res.date.map((val: any) => {
          let date = new Date(val)
          var month = date.toLocaleString('default', { month: 'short' });

          return (date.getDate()  +" "+month)
        });


        let links: any[] = [];

      

        let i = 0;
        res.data.map((obj: any) => {

          let lineChartDataObj = {
            borderColor: this.colorSelections[i],
            backgroundColor:this.colorSelections[i],
            fill: false,
            pointHoverBackgroundColor: '#ffffff',
            pointHoverBorderColor: this.colorSelections[i],
            data: []
          }

          lineChartDataObj.data = obj.linkCountArr;
          this.lineChartData.push(lineChartDataObj)
          
          i++;

        })

   
       
          this.isDataEmpty = false;
        
        
      } else {
        this.isDataEmpty = true;
      }

      
        this.loader = false;
   
    });
  }

  verifyNumberDigit(num: number) {
    if (num <= 9) {
      return '0' + num
    } else {
      return num
    }
  }

  // getVolumeData(startDate : Date, endDate : Date) {
  //   // converting date & initializing payload
  //   const to = `${startDate.getFullYear()}-${this.checkTwoDigitNumber(endDate.getMonth() + 1)}-${this.checkTwoDigitNumber(endDate.getDate())}`
  //   const from = `${endDate.getFullYear()}-${this.checkTwoDigitNumber(startDate.getMonth() + 1)}-${this.checkTwoDigitNumber(startDate.getDate())}`

  //   this.getGraphData(from,to)
  //   var  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  //   this.analyticService.getDailyVolume(payload).subscribe(
  //     (resp : any) => {
  //       this.loader = false
  //       if (resp.responseCodeJson.code === 200) {
  //         this.isGraphDataEmpty = !resp.object.data?.length

  //         const percentage = Number(resp.object.overAllPercentage)
  //         this.percentage = !isNaN(percentage) ? percentage : 0
  //         // empty chart data first
  //         this.lineChartData[2].data = []
  //         this.lineChartData[1].data = []
  //         this.lineChartData[0].data = []
  //         this.lineChartData = []

  //         // this variable will filled with all months data
  //         let monthlyData : any[] = []

  //         // monthly data mapping
  //         resp.object.data.forEach((obj : any, index : number) => {

  //           // initializing month name data
  //           const splittedLabel = Object.keys(obj)[0].split('-')
  //           const month = Number(splittedLabel[1])
  //           const dailyData : IGraphObj = obj[Object.keys(obj)[0]]
  //           this.lineChartData[0].data.push(dailyData.delivered)
  //           this.lineChartData[1].data.push(dailyData.opened)
  //           this.lineChartData[2].data.push(dailyData.toSend)

  //           let date = new Date(Object.keys(obj)[0]);

  //           // assigning total data & label
  //           this.lineChartData.push(splittedLabel[2]+'-'+months[date.getMonth()])
  //           this.totalData += dailyData.opened
  //         })
  //       }
  //     }
  //   )
  // }


  // onDateChanged(event : any) {
  //   // assigning filter date
  //   const endDate = new Date(event.end)
  //   const startDate = new Date(event.start)
  //   this.filterData = new DateRange(
  //     startDate,
  //     endDate
  //   )

  //   // calculating diff day
  //   this.calculatingDiffDay(startDate, endDate)

  //   // calling api
  //   this.getVolumeData(startDate, endDate)
  // }

  // calculatingDiffDay(startDate: Date, endDate: Date){
  //   var diff = Math.floor(endDate.getTime() - startDate.getTime());
  //   var day = 1000 * 60 * 60 * 24;
  //   this.diffDay = Math.floor(diff/day);
  //   this.diffMonth = Math.floor(this.diffDay/31);
  // }

  // checkTwoDigitNumber(num : number) {
  //   if (num <= 9) {
  //     return `0${num}`
  //   } else {
  //     return num
  //   }
  // }
}
