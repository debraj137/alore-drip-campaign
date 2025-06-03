import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPage5Data, IDayData, myDaysWithTime, IPage6Data } from 'src/app/model/create-reciepe';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { ObjectiveService } from 'src/app/service/resource/objective.service';

interface ITimeSelection {
  label: string;
  time: string;
  icon: string;
}
@Component({
  selector: 'app-page6',
  templateUrl: './page6.component.html',
  styleUrls: ['./page6.component.scss']
})
export class Page6Component implements OnInit {

  @Output() pageAction = new EventEmitter<any>();
  @Input() step5Data: IPage5Data[] = [];
  @Input() step6Data!: IPage6Data;
  @Input() nextStep: number = 0;
  @Input() prevStep: number = 0;
  @Input() campId: any = '';
  @Input() isSingleStep: boolean = false;
  showdays: boolean = false;
  disableSave: boolean = false;
  selectedDay!: IDayData;
  timeSelection: ITimeSelection[] = [
    {
      label: 'Morning Hours',
      time: '0800-1000',
      icon: 'coffee_Icon'
    },
    {
      label: 'Afternoon Hours',
      time: '1200-1400',
      icon: 'spoon_Icon'
    },
    {
      label: 'Evening Hours',
      time: '1700-1900',
      icon: 'wine_Icon'
    }
  ]
  dayList: IDayData[] = [];
  myDaysWithTime: myDaysWithTime[] = [];

  constructor(
    private objectiveService: ObjectiveService,
    private toastNotification: ToastNotificationService
  ) { }

  ngOnInit(): void {
    let dayData: any[] = []
    if (this.step5Data?.length >= 1) {
      dayData = this.step5Data
    } else {
      dayData = this.step6Data.days
    }
    if (dayData) {
      dayData.forEach((obj: any) => {
        const dayData: string = obj?.day ? obj.day.toLowerCase() : obj.dayData.day.toLowerCase()
        switch (dayData) {
          case "mondays":
            this.dayList.push({
              dayData: obj.dayData || obj,
              startTime: this.isSingleStep ? obj.startTime : "12:00",
              endTime: this.isSingleStep ? obj.endTime : "14:00",
              recomendedTIme: '1200-1400'
            })
            break;
          case "tuesdays":
            this.dayList.push({
              dayData: obj.dayData || obj,
              startTime: this.isSingleStep ? obj.startTime : "08:00",
              endTime: this.isSingleStep ? obj.endTime : "10:00",
              recomendedTIme: '0800-1000'
            })
            break;
          case "wednesdays":
            this.dayList.push({
              dayData: obj.dayData || obj,
              startTime: this.isSingleStep ? obj.startTime : "08:00",
              endTime: this.isSingleStep ? obj.endTime : "10:00",
              recomendedTIme: '0800-1000'
            })
            break;
          case "thursdays":
            this.dayList.push({
              dayData: obj.dayData || obj,
              startTime: this.isSingleStep ? obj.startTime : "08:00",
              endTime: this.isSingleStep ? obj.endTime : "10:00",
              recomendedTIme: '0800-1000'
            })
            break;
          case "fridays":
            this.dayList.push({
              dayData: obj.dayData || obj,
              startTime: this.isSingleStep ? obj.startTime : "17:00",
              endTime: this.isSingleStep ? obj.endTime : "19:00",
              recomendedTIme: '1700-1900'
            })
            break;
          case "saturdays":
            this.dayList.push({
              dayData: obj.dayData || obj,
              startTime: this.isSingleStep ? obj.startTime : "12:00",
              endTime: this.isSingleStep ? obj.endTime : "14:00",
              recomendedTIme: '1200-1400'
            })
            break;
          case "sundays":
            this.dayList.push({
              dayData: obj.dayData || obj,
              startTime: this.isSingleStep ? obj.startTime : "17:00",
              endTime: this.isSingleStep ? obj.endTime : "19:00",
              recomendedTIme: '1700-1900'
            })
            break;
          default:
            break;
        }
      })
      this.changeDayTab(this.dayList[0])
    }
    this.showdays = this.isSingleStep ? false : true;
  }

  changeDayTab(day: IDayData): void {
    this.selectedDay = day;
  }

  changeTime(event: any, data: any, type: string) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (type === 'start') {
        let splittedHour = this.selectedDay.startTime.split(':')
        let hour = 0
        if (event.key === 'ArrowDown' && Number(splittedHour[0]) >= 1) {
          hour = Number(splittedHour[0]) - 1
        }
        if (event.key === 'ArrowUp' && Number(splittedHour[0]) <= 23) {
          hour = Number(splittedHour[0]) + 1
        }
        this.selectedDay.startTime = this.checkDecimalNumber(hour) + ':' + (splittedHour[1] || '00')
      }
      if (type === 'end') {
        let splittedHour = this.selectedDay.endTime.split(':')
    
        let hour = 0
        if (event.key === 'ArrowDown' && Number(splittedHour[0]) >= 1) {
          hour = Number(splittedHour[0]) - 1
        }
        if (event.key === 'ArrowUp' && Number(splittedHour[0]) <= 23) {
          hour = Number(splittedHour[0]) + 1
        }
        this.selectedDay.endTime = this.checkDecimalNumber(hour) + ':' + (splittedHour[1] || '00')
      }
    }

    if(data.startTime > data.endTime)
      this.disableSave = true
    else
      this.disableSave = false;
  }

  checkDecimalNumber(value: number) {
    if (value <= 9) {
      return '0' + value
    } else {
      return value
    }
  }

  validateTime(time: string) {
    let hour: string = ''
    let minute: string = ''
    if (!time.includes(':')) {
      switch (time.length) {
        case 4:
          if (!time.includes(':')) {
            hour = time.substring(0, 2)
            minute = time.substring(2, 4)
          } else {
            const splittedTime = time.split(':')
            hour = splittedTime[0]
            minute = splittedTime[1]
          }
          break;
        case 3:
          hour = time.substring(0, 2)
          minute = this.checkDecimalNumber(Number(time.substring(2, 3))).toString()
          break;
        case 2:
          if (Number(time) >= 10) {
            hour = this.checkDecimalNumber(Number(time.substring(0, 1))).toString()
            minute = this.checkDecimalNumber(Number(time.substring(1, 2))).toString()
          } else {
            hour = time
            minute = '00'
          }
          break;
        case 1:
          hour = time + '0'
          minute = '00'
          break;
  
        default:
          break;
      }
      return hour + ':' + minute 
    } else {
      return time
    }
  }

  selectTime(time: ITimeSelection) {
    const timeArray = time.time.split('-')
    const startTime = timeArray[0].substring(0, 2) + ':00'
    const endTime = timeArray[1].substring(0, 2) + ':00'
    this.selectedDay.startTime = startTime
    this.selectedDay.endTime = endTime
  }

  isTimeSelected(timeData: ITimeSelection): boolean {
    const startTime = this.selectedDay.startTime.replace(':', '')
    const endTime = this.selectedDay.endTime.replace(':', '')
    const fulltime = startTime + '-' + endTime
    if (timeData.time === fulltime) {
      return true
    } else {
      return false
    }
  }

  radioChecked(value: any) {
    if (value) {
      this.showdays = false;
      this.selectedDay = {
        dayData: this.dayList[0].dayData,
        startTime: "08:00",
        endTime: "10:00",
        recomendedTIme: '0800-1000'
      }
    }
    else {
      this.selectedDay = this.dayList[0]
      this.showdays = true;
    }
  }

  nextPage() {
    let timeSetting: any[] = [];
    let dayListNotification: string[] = []
    this.dayList.forEach((obj: IDayData) => {
      dayListNotification.push(obj.dayData.day)
      timeSetting.push({
        day: obj.dayData.day,
        startTime: this.showdays ? this.validateTime(obj.startTime) : this.validateTime(this.selectedDay.startTime),
        endTime: this.showdays ? this.validateTime(obj.endTime) : this.validateTime(this.selectedDay.endTime)
      })

      
    })
    const payload = {
      campaignId: this.campId,
      timeSetting: timeSetting
    }
    this.objectiveService.setTimeInterval(payload, 7).subscribe(
      (resp: any) => {
        if (this.isSingleStep) {
          this.toastNotification.addNotification(
            "You just Reloaded!",
            `New seleted days are - "${dayListNotification.toString().replace(/,/g, ', ')}"`,
            NotificationEnum.INFO
          )
        }
        const emmitValue = {
          page: this.isSingleStep ? 0 : this.nextStep,
          data: {
            days: this.dayList,
            sameDay: !this.showdays,
            sameDayData: timeSetting
          }
        }
        this.pageAction.emit(emmitValue)
      }
    )
  }

  checkSeperator(time: string) {
    if (!time.includes(':') && time.length === 4) {
      return time.substring(0, 2) + ':' + time.substring(2, 4)
    } else {
      return time
    }
  }
}
