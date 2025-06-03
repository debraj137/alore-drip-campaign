import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPage5Data } from 'src/app/model/create-reciepe';
import { objectivesSettingsDays, settingDays } from 'src/app/model/objectives';
import { ObjectiveService } from 'src/app/service/resource/objective.service';

@Component({
  selector: 'app-page5',
  templateUrl: './page5.component.html',
  styleUrls: ['./page5.component.scss']
})
export class Page5Component implements OnInit {

  @Output() pageAction = new EventEmitter<any>();
  @Input() campId: any = '';
  @Input() step5Data: IPage5Data[] = [];
  @Input() nextStep: number = 0;
  @Input() prevStep: number = 0;
  @Input() isSingleStep: boolean = false;

  selectedDay : IPage5Data[] = [];
  weekData:any[] = [
    {
      day:"Mondays",
      index:0,
      opentype:"Lower Open Rates",
      icon:"arrow_Bottom_Right_Icon",
      color:"Blue"
    },
    {
      day:"Tuesdays",
      index:1,
      opentype:"Higher Open Rates",
      icon:"arrow_top_Icon",
      color:"Green"
    },
    {
      index:2,
      day:"Wednesdays",
      opentype:"Moderate Open Rates",
      icon:"arrow_Right_Icon",
      color:"Pink"
    },
    {
      index:3,
      day:"Thursdays",
      opentype:"Moderate Open Rates",
      icon:"arrow_Right_Icon",
      color:"Pink"
    },
    {
      index:4,
      day:"Fridays",
      opentype:"Higher Open Rates",
      icon:"arrow_top_Icon",
      color:"Green"
    },
    {
      index:5,
      day:"Saturdays",
      opentype:"Moderate Open Rates",
      icon:"arrow_Right_Icon",
      color:"Pink"
    },
    {
      index:6,
      day:"Sundays",
      opentype:"Lowest Open Rates",
      icon:"arrow_Bottom_Icon",
      color:"Red"
    }
  ];

  constructor(
    private objectiveService : ObjectiveService
  ) { }

  ngOnInit(): void {

    if (this.step5Data?.length >= 1) {
      this.selectedDay = this.step5Data
    } else {
      this.selectedDay = [
        {
          index:1,
          day:"Tuesdays",
          opentype:"Higher Open Rates",
          icon:"arrow_top_Icon",
          color:"Green"
        },
        {
          index:4,
          day:"Fridays",
          opentype:"Higher Open Rates",
          icon:"arrow_top_Icon",
          color:"Green"
        }
      ];
    }
  }

  onDaysNext(){
    const currentSelectedDays = this.selectedDay.sort(function (x, y) {
      return x.index - y.index;
    });
    
   
    this.selectedDay = currentSelectedDays;
    this.selectedDay = currentSelectedDays;
    const payload : settingDays= {
      campaignId : this.campId,
      days: currentSelectedDays.map((obj : any) => {
        return obj.day
      })
    }
    this.objectiveService.setDays(payload, 6).subscribe(
      (res:any) => {
        if (res.responseCodeJson.code === 200) {
        
          this.pageAction.emit({
            page : this.isSingleStep ? 0 : this.nextStep,
            data : currentSelectedDays
          });
        }
      }
    );
  }

  selectDay(dayData : IPage5Data, value : any) {
    if (value) {
      this.selectedDay.push(dayData)
    } else {
      this.selectedDay = this.selectedDay.filter(
        (obj : IPage5Data) => {
          return obj.index !== dayData.index
        }
      )
    }
  }

  isSelected(dayData : IPage5Data) {
    const selectedDay = this.selectedDay.find(
      (obj : IPage5Data) => {
        return obj.index === dayData.index
      }
    )

    if (selectedDay) {
      return true;
    } else {
      return false;
    }
  }
}
