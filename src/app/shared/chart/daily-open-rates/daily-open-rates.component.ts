import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartDataset } from 'chart.js';
import { ChartService } from 'src/app/service/core/chart.service';
import { CommonService } from 'src/app/service/core/common.service';
import { AnalyticsService } from 'src/app/service/resource/analytics.service';

@Component({
  selector: 'app-daily-open-rates',
  templateUrl: './daily-open-rates.component.html',
  styleUrls: [
    './daily-open-rates.component.scss',
    '../../../../assets/style/chart-style.scss',
  ],
})
export class DailyOpenRatesComponent implements OnInit {

  @Input() campaignId : string = ''
  @Input() mailId : string = ''

  barChartData: ChartDataset[] = [
    {
      data: [],
      backgroundColor: '#334bfa',
      borderRadius: [3, 3],
      barThickness: 24,
      hoverBackgroundColor: '#334bfa',
    },
  ];
  barChartLabels: string[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  barChartPlugins = [];
  barChartLegend = false;

  percentage = 0;
  delivered = 0;
  openedMail = 0;
  loader: boolean = true;
  isDataEmpty: boolean = false;

  constructor(
    private analyticService: AnalyticsService,
    private commonService: CommonService,
    private chartService: ChartService
  ) {}

  ngOnInit(): void {
    this.barChartOptions = this.chartService.dailyOpenRateChartOption
    const start = new Date();
    const end = new Date();
    const fromDate = `${start.getFullYear()}-${this.verifyNumberDigit(start.getMonth() + 1)}-${this.verifyNumberDigit(start.getDate())}`
    const toDate = `${end.getFullYear()}-${this.verifyNumberDigit(end.getMonth() + 1)}-${this.verifyNumberDigit(end.getDate())}`
    this.getOpenRateGraph(fromDate, toDate);
  }

  getOpenRateGraph(fromDate : string, toDate : string) {
    this.loader = true;
    const payload = {
      campaignId: this.campaignId,
      emailId: this.mailId,
      fromDate: fromDate,
      toDate: toDate,
    };
    this.analyticService
      .getPersonalizedEmailDailyOpenRate(payload)
      .subscribe((res) => {
        if (
          res.responseCodeJson.code === 200 &&
          res.object.data.length >= 1
        ) {
          const percentage = Number(res.object.overAllPercentage)
          this.percentage = !isNaN(percentage) ? percentage : 0
          this.openedMail = res.object.openedMail;
          this.delivered = res.object.maxValue;

          this.barChartLabels = res.object.data.map((obj: any) => {
            const splittedLabel: string[] = Object.keys(obj)[0].split(' ');
            const label =
              splittedLabel[2] +
              this.commonService.setNumOrdering(+splittedLabel[2]) +
              ' ' +
              splittedLabel[1];
            return label;
          });

          this.barChartData[0].data = res.object.data.map((obj: any) => {
            const graphData = obj[Object.keys(obj).toString()];
            return graphData.opened;
          });
        } else {
          this.isDataEmpty = true
        }
        this.loader = false;
      });
  }

  verifyNumberDigit(num : number) {
    if (num <= 9) {
      return '0' + num
    } else {
      return num
    }
  }

}
