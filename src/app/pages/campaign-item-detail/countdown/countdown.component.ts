import { Component, OnInit, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { CampaignService } from '../../../service/resource/campaign.service';
import { interval } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { count } from 'console';
import { DateCompWrapper } from 'ag-grid-community/dist/lib/filter/provided/date/dateCompWrapper';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
      
        opacity: 0,
        display: 'none'
       
      })),
      transition('open => closed', animate(500)),
      transition('closed => open', animate(100))
    ]),
  ],
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  @Input() campaignId: string = ''
  isMailScheduled: boolean = true;
  isCampaignActive: boolean = true;

  countdownDay: number = 0
  countdownHour: number = 0
  countdownMinute: number = 0
  countdownSeconds: number = 0

  tempCountDownDate: string = ''
  message: string = "";
  interval: any

  constructor(
    public campaignService: CampaignService
  ) {

  }

  ngOnInit(): void {
    clearInterval(this.interval)
    this.campaignService.getNextMailCountdown(this.campaignId).subscribe((resp: any) => {
      

      if (resp.responseCodeJson.code == 200) {

        this.isMailScheduled = true;
        let countDownDate = new Date(resp.object);
        
  
        var now = new Date().getTime();
        var timeleft = countDownDate.getTime() - now;


        if (resp.responseCodeJson.code !== 200) {
          this.message = "No mails in the queue";
          this.isCampaignActive = false;
          return;
        }

        if (timeleft <= 0) {
          this.isCampaignActive = false;
          this.message = "Mail has been sent!";
          return;
        }


        this.isCampaignActive = true;
        this.countdownDay = 0;
        this.countdownHour = 0;
        this.countdownMinute = 0;
        this.countdownSeconds = 0;
        const obs$ = interval(1000);

        obs$.subscribe(() => {
          this.initiateCountdown(resp.object)
        })


      }
    }




    )
  }

  ngOnChanges(changes: SimpleChanges){
    
    var killId = setTimeout(function() {
      for (var i: any = killId; i > 0; i--) clearInterval(i)
    }, 100);


    this.campaignService.getNextMailCountdown(changes['campaignId'].currentValue).subscribe((resp: any) => {

      if (resp.responseCodeJson.code == 200) {

        this.isMailScheduled = true;
        let countDownDate = new Date(resp.object);

        var now = new Date().getTime();
        var timeleft = countDownDate.getTime() - now;


        if (timeleft <= 0) {
          this.isCampaignActive = false;
          this.message = "Mail has been sent!";
          return;
        }


        this.isCampaignActive = true;
        this.countdownDay = 0;
        this.countdownHour = 0;
        this.countdownMinute = 0;
        this.countdownSeconds = 0;


        this.interval  = setInterval(() => {
          this.initiateCountdown(resp.object)
        }, 1000)

        

      }

      if (resp.responseCodeJson.code !== 200) {
        this.message = "No mails in the queue";
        this.isCampaignActive = false;
        return;
      }
    }




    )
 
  }

  initiateCountdown(scheduledDate: string) {

    let activationDate = new Date(scheduledDate);
    this.tempCountDownDate = activationDate.toLocaleString();
    var now = new Date().getTime();
    let countDownTime = activationDate.getTime();
    var timeleft = countDownTime - now;

    this.countdownDay = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    this.countdownHour = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.countdownMinute = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    this.countdownSeconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  }


  toggleScheduleCountdown() {
    this.isMailScheduled = !this.isMailScheduled;
  }

  

}
