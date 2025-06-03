import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDayData, IPage3Data, IPage5Data } from 'src/app/model/create-reciepe';
import { Interval, mailInterval } from 'src/app/model/objectives';
import { ObjectiveService } from 'src/app/service/resource/objective.service';

export interface ImailData {
  days :  number;
  date : Date;
  mailCounter : number;
  mailTemplateId : string;
}

@Component({
  selector: 'app-page7',
  templateUrl: './page7.component.html',
  styleUrls: ['./page7.component.scss']
})
export class Page7Component implements OnInit {

  @Output() pageAction = new EventEmitter<any>();
  @Input() campId: any = '';
  @Input() step7Data: any[] = [];
  @Input() step3Data!: IPage3Data;
  @Input() nextStep: number = 0;
  @Input() prevStep: number = 0;
  @Input() isSingleStep: boolean = false;
  nextButtonCondition : boolean = false
  todayDate = new Date()
  textValue: string = "Choose a date"

  mailData: ImailData[] = [];

  constructor(
    private objectiveService : ObjectiveService
  ) { }

  ngOnInit(): void {
    if (this.isSingleStep) {
      this.nextButtonCondition = true
    }
    this.getCampaignEmail()
  }

  getCampaignEmail() {
    this.objectiveService.getCampaignEmail(this.campId).subscribe(
      (resp : any) => {
        if (resp.responseCodeJson.code === 200) {
          let  date : Date;
          if(resp.object){
            date = new Date(resp.object);
          }

          else{
            date = new Date()
          }
          
          let time : number = 0;
            
            let mailInterval = 0;
            resp.list.forEach((obj : any, index : number) => {    
          
          date.setDate(date.getDate() + mailInterval);
          
          this.mailData.push({
            mailCounter : index + 1,
            days : obj.mailInterval,
            date : new Date(date),
            mailTemplateId : obj.personalizedEmailId
          })
          
          mailInterval = obj.mailInterval;
          
          });
        }
      }
    )
  }

  modifyDay(arrayIndex : number, value : number) {
    if(value <= 0  && value !== -1) {
      value = 1
    }


    this.mailData = this.mailData.map(
      (obj : ImailData, index : number) => {
        const currecntIndex = this.mailData[index]
        if (
          index + 1 >= arrayIndex &&
          index <= this.mailData.length
        ) {
          const intervalDays : number = value <= 1 || value === 0 ?
            obj.days + value :
            value
          const intervalDate : number = value <= 1 ?
           value :
            obj.days + value

            //If you are first date, then dont change date...interval will be added from next date onwards
          if (index + 1 === arrayIndex) {
            obj.days = intervalDays
          } else {
            obj.date = new Date(this.mailData[index - 1].date)
            obj.date.setDate(obj.date.getDate() + this.mailData[index - 1].days)
          }
        }
    
        return obj
      }
    )
  }

  onDateChanged(event: any) {
    let prevArray : any
    this.nextButtonCondition = true
    this.mailData = this.mailData.map(
      (obj : ImailData, index : number) => {
        prevArray = {...this.mailData[index - 1]}
        if (index === 0) {
          obj.date = event
        }



        else if(index === 1 && prevArray.date._i){
            obj.date = new Date(prevArray.date)
            obj.date.setDate(prevArray.date._i.date+ prevArray.days)
          
        }
        else {
          obj.date = new Date(prevArray.date)
          obj.date.setDate(prevArray.date.getDate() + prevArray.days)
        }

        return obj
      }
    )
  }

  imposeMinMax(el: any){
    if(el.value != ""){
      if(parseInt(el.value) < parseInt(el.min)){
        el.value = el.min;
      }
      if(parseInt(el.value) > parseInt(el.max)){
        el.value = el.max;
      }
    }
  }

  sendIntervalData(){
    let payload = {
      campaignId : this.campId,
      scheduledDate : this.mailData[0].date,
      mailInterval: [{}]
    }
    let mailInterval : any = {}
    this.mailData.forEach((obj : ImailData) => {
      mailInterval[obj.mailTemplateId] = obj.days
    })
    payload.mailInterval[0] = mailInterval
    this.objectiveService.sendAllIntervals(payload, 8).subscribe((res:any)=>{
      this.pageAction.emit({
        page : this.isSingleStep ? 0 : this.nextStep,
        data : this.mailData
      })
    });
  }

  dateOpen() {
    if (this.isSingleStep == false) {
      this.isSingleStep = true;
    }
  }
}
