import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { ReplieService } from 'src/app/service/resource/replie.service';

export interface ImailData {
  days :  number;
  date : Date;
}


@Component({
  selector: 'app-date-picker-snooze',
  templateUrl: './date-picker-snooze.component.html',
  styleUrls: ['./date-picker-snooze.component.scss']
})


export class DatePickerSnoozeComponent implements OnInit {
 
  
  @Output() selectedRangeValueChange = new EventEmitter<any>();

  selectedDate: any;

  todayDate = new Date();
  maxDate:Date = new Date();
  events: string[] = [];
  mailData: ImailData[] = [];
  month: any;

  epochTime: any
  
  fullDate: any;
  time: string = "8:00"

  finalEpoch: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DatePickerSnoozeComponent>,
    public replieService: ReplieService,
    private toastNotification: ToastNotificationService,
  ) { }

  ngOnInit(): void {

    this.epochTime = this.todayDate.getTime();
    // console.log(this.epochTime)
    this.todayDate = new Date(this.epochTime);
    // console.log(this.todayDate)

    this.fullDate = this.todayDate.toString().slice(4,15);
    
  

    this.maxDate = new  Date(
      this.todayDate.getFullYear() + 1,
      this.todayDate.getMonth(),
      this.todayDate.getDate(),
      this.todayDate.getTime(),
    )
    
  }

  changeTime(event: any) {
    let splittedHour = this.time.split(':')
        let hour = 0
        if (event.key === 'ArrowDown' && Number(splittedHour[0]) >= 1) {
          hour = Number(splittedHour[0]) - 1
        }
        if (event.key === 'ArrowUp' && Number(splittedHour[0]) <= 23) {
          hour = Number(splittedHour[0]) + 1
        }
        this.time = this.checkDecimalNumber(hour) + ':' + (splittedHour[1])
  }

  checkDecimalNumber(value: number) {
    if (value <= 9) {
      return '0' + value
    } else {
      return value
    }
  }

  dateChange() {
    this.fullDate = this.selectedDate;
    // console.log(this.fullDate)
    this.fullDate = this.fullDate._d.toString().slice(4,15);
    // console.log(this.fullDate)

    let epoch = `${this.fullDate} ${this.time}`.toString();
    // console.log(epoch);
    this.finalEpoch = Date. parse(epoch);
    // console.log(this.finalEpoch)

    // console.log(new Date(this.finalEpoch))
    // console.log(this.finalEpoch.getTime())
  }

  snoozeDate(messageId: any, status: any) {

    this.replieService.markMailAsSnooze(messageId,status,this.finalEpoch).subscribe((resp:any) => {
      if(resp.responseCodeJson.code === 200) {
        this.toastNotification.addNotification(
          'Successfully, added to snooze',
          ` successfully snoozed.`,
          NotificationEnum.INFO
        );
      }
      this.dialogRef.close()
    });
  }

  // selectDate(){
  //   this.selectedRangeValueChange.emit(
  //     this.selectedDate
  //   )
  // }

}
