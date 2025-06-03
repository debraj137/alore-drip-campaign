import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper-layout-leftbar',
  templateUrl: './stepper-layout-leftbar.component.html',
  styleUrls: ['./stepper-layout-leftbar.component.scss']
})
export class StepperLayoutLeftbarComponent implements OnInit {

  stepList : string[] = [
    'Step 1',
    'Step 2',
    'Step 3',
    'Step 4'
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
