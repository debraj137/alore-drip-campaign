import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.scss']
})
export class ProgressChartComponent implements OnInit {
  @Input() score=0;
  constructor() { }

  ngOnInit(): void {
  }

}
