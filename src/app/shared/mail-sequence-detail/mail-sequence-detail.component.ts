import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { SharePermissionEnum } from 'src/app/model/enum/share-permission-enum';
import { IMailData, IMailSequenceDetail } from 'src/app/model/mail-sequence';
import { LayoutService } from 'src/app/service/core/layout.service';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { FaqService } from 'src/app/service/resource/faq.service';
import { SettingPopupModalNewComponent } from '../setting-popup-modal-new/setting-popup-modal-new.component';

@Component({
  selector: 'app-mail-sequence-detail',
  templateUrl: './mail-sequence-detail.component.html',
  styleUrls: ['./mail-sequence-detail.component.scss']
})
export class MailSequenceDetailComponent implements OnInit {
  
  @Output() refreshMailSequence = new EventEmitter<boolean>(false);
  @Input() campaignId! : string;
  @Input() campaignName!: string;
  @Input() mailSequenceDetail! : IMailSequenceDetail;
  @Input() mailSequenceData : IMailData[] = [];
  @Input() enableTimeZone : boolean = false;

  constructor(
    private dialog : MatDialog,
    private toastNotification: ToastNotificationService,
    private faqService:FaqService,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.faqService.setPageNumber(2);
  }

  editCampaignDetailDialog(activeStep : number) {
    let data : any
    switch (activeStep) {
      case 2:
        data = this.mailSequenceDetail.timeZone
        break;
      case 4:
        data = this.mailSequenceDetail.dailyMails
        break;
      case 6:
        data = {
          days : this.mailSequenceDetail.timeSetting,
          sameDay : false,
        }
        break;
      case 7:
        data = this.mailSequenceData
        break;

      case 5:
        let selectedDays: string[] = [];
        this.mailSequenceDetail.timeSetting.map((x) => selectedDays.push(x.day));
        data = selectedDays
        break;
    
      default:
        break;
    }
    const dialog = this.dialog.open(SettingPopupModalNewComponent, {
        backdropClass: 'backdrop-background',
        data: {
          isSingleStep : true, 
          activeStep : activeStep,
          data : data,
          campaignId : this.campaignId
        }
    })

    dialog.afterClosed().subscribe((result : any) => {
      this.refreshMailSequence.emit(true)
      if (result) {
        this.toastNotification.addNotification(
          "you're right",
          `it's time to recharge the ${this.campaignName} settings`,
          NotificationEnum.INFO
        )
      }
    })
  }


  get getUserRole() {
    switch (this.layoutService.campaignAccess.value?.toString()) {
      case SharePermissionEnum.OWNER:
        return true
        break;
      case SharePermissionEnum.EDITOR:
        return true
        break;
    
      default:
        return false
        break;
    }
  }

  dayChangePopUp(){
  //   const dialog = this.dialog.open(SettingPopupModalNewComponent, {
  //     backdropClass: 'backdrop-background',
  //     data: {
  //       isSingleStep : true, 
  //       activeStep : activeStep,
  //       data : data,
  //       campaignId : this.campaignId
  //     }
  // })

  // dialog.afterClosed().subscribe((result : any) => {
  //   this.refreshMailSequence.emit(true)
  //   if (result) {
  //     this.toastNotification.addNotification(
  //       "you're right",
  //       `it's time to recharge the ${this.campaignName} settings`,
  //       NotificationEnum.INFO
  //     )
  //   }
  // })
}
  }

