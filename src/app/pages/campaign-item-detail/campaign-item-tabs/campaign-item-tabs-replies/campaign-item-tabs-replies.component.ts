
import { SelectionModel } from '@angular/cdk/collections';
import { identifierName, ThisReceiver } from '@angular/compiler';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { TransitionCheckState } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { ReplieService } from 'src/app/service/resource/replie.service';
import { DatePickerSnoozeComponent } from 'src/app/shared/date-picker-snooze/date-picker-snooze.component';
import { threadId } from 'worker_threads';
import { CampaignItemDetailComponent } from '../../campaign-item-detail.component';
import { AddProspectComponent } from '../replies-thread/add-prospect/add-prospect.component';
import { AddCampaignProspectComponent } from '../replies-thread/add-campaign-prospect/add-campaign-prospect.component';

export interface IMessage {
  messageId: string
}

@Component({
  selector: 'app-campaign-item-tabs-replies',
  templateUrl: './campaign-item-tabs-replies.component.html',
  styleUrls: ['./campaign-item-tabs-replies.component.scss']
})
export class CampaignItemTabsRepliesComponent implements OnInit {


  selection = new SelectionModel<IMessage>(true, []);

  indexForLoaderStar: any;
  indexForLoaderRead: any;

  neutral = false;
  campaignId: any;
  baseCampaignId: string = ''
  replieList: any;
  specificMessageId: any[] = [];
  showThread: boolean = false;
  showReplies: boolean = true;
  loading: boolean = true;
  statusValue: any;
  msgId: any;
  archive: boolean = false;
  checkedSpecific: boolean = false;
  checked: boolean = false;

  emptyMsg: boolean = false;
  multiDataVisible: boolean = false;
  disableState: boolean = false;
  iconVisiableState: boolean = false;

  loader: boolean = false;

  bool: boolean = false;
  messageIdList: any;
  multiSelectStatus: boolean = false;
  multiSelectType: number = 0;

  currentMessageIndex: any;
  snoozeStatusValue: any;

  currentThreadId: string = ''
  currentPersonalizedEmailId: string = ''
  currentmessageId: string = ''
  multiCheck: any;
  setOfSpecificMessageId: any;

  addSpecificReplie: any;
  specificSelectedList: any[] = [];
  isAllCheckboxSelected: boolean = false;


  // -----------------------
  // for tooltip data 

  star: string = '';


  datelist = [
    {
      day: "Tomorrow",
      date: "Thus, 8:00 AM"
    },
    {
      day: "Later this week",
      date: "Fri, 8:00 AM"
    },
    {
      day: "This weekend",
      date: "Sun, 8:00 AM"
    },
    {
      day: "Next week",
      date: "Mon, 8:00 AM"
    }
  ]


  constructor(
    public replieService: ReplieService,
    public route: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
    private toastNotification: ToastNotificationService,
    public unReadCount: CampaignItemDetailComponent

  ) { }

  ngOnInit(): void {
    this.campaignId = this.route.snapshot.paramMap.get('campaignId') || '';
    this.baseCampaignId = this.route.snapshot.paramMap.get('baseId') || '';
    this.getMails();
    this.selection.changed.subscribe((resp: any) => {

      const numSelected = this.selection.selected.length;
      const numRows = this.replieList.length;
      if (numSelected === numRows) {
        this.isAllCheckboxSelected = true;
      }
      else {
        this.isAllCheckboxSelected = false;
      }
    })
    // this.dialog.open(AddCampaignProspectComponent)
    // this.tooltipValue();
  }

  // tooltipValue() {
  //   if(this.replieList.isImportant == false) {
  //     this.star = "not starred"
  //   } else if (this.replieList.isImportant == true) {
  //     this.star = "starred"
  //   }
  // }


  // multiselect() {
  //   console.log(event)
  //   let allreplies = this.replieList
  //   console.log(allreplies)

  //   allreplies.forEach((data: any) => {
  //     var list = {
  //       messageId : data.messageId
  //     }
  //   this.specificMessageId.push(list);
  //   })
  // }

  getStrippedHTML(htmlBody: string) {
    let strippedHtml = htmlBody.replace(/<[^>]+>/g, '');
    return strippedHtml
  }

  specificReplieThread(thread: any, index: any) {

    //  this.replieList[index].isRead = true;
    if (this.replieList[index].isRead == false) {
      this.readUnreadMail(thread.messageId, index);
    }

    this.showReplies = false;
    this.showThread = true;
    this.currentThreadId = thread.threadId;
    this.currentPersonalizedEmailId = thread.personalizedEmailId;
    this.currentmessageId = thread.messageId;
    this.currentMessageIndex = index;

    this.snoozeStatusValue = this.replieList[index].isSnoozed;
  }



  // specificReplieSelect(index: number) {
  //    console.log(this.bool)
  //   this.iconVisiableState = true;
  //   console.log(index);

  //   if(!this.bool) {
  //     this.addSpecificReplie = this.replieList[index];
  //     console.log(this.addSpecificReplie);
  //     const data =
  //       {
  //         messageId: this.addSpecificReplie.messageId
  //       }

  //     this.specificSelectedList.push(data);
  //     this.bool = false;
  //   } else {
  //     console.log(this.specificSelectedList);
  //   }
  // }


  isVisiable() {
    if (this.selection.hasValue()) {
      this.iconVisiableState = true;;
    } else {
      this.disableState = false
    }
  }

  toggleAll() {

    if (this.isAllSelected || this.selection.hasValue()) {

      this.selection.clear();
      this.iconVisiableState = false;
      this.isAllCheckboxSelected = false;
      return;
    }
    this.iconVisiableState = true;
    this.selection.select(...this.replieList);
    this.isAllCheckboxSelected = true;

  }

  get isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.replieList.length;
    return (numSelected === numRows);
  }

  deleteMail(messageId: string) {
    this.replieService.markAsDelete(messageId).subscribe((resp: any) => {
      if (resp.responseCodeJson.code == 200) {
        this.getMails();
        this.toastNotification.addNotification(
          'Oops..! Just deleted reply',
          ` successfully restored.`,
          NotificationEnum.WARNING
        );
      }
    })
  }

  archiveMail(messageId: string, status: boolean) {
    this.replieService.markAsArchive(messageId, status).subscribe((resp: any) => {
      if (resp.responseCodeJson.code == 200) {
        this.getMails();
        if (status == true) {
          this.toastNotification.addNotification(
            'Yuhuu! Just added to archive',
            ` successfully restored.`,
            NotificationEnum.INFO
          );
        } else {
          this.toastNotification.addNotification(
            'Yuhuu! Just remove from archive',
            ` successfully restored.`,
            NotificationEnum.INFO
          );
        }

      }
    })

  }


  markAsImportant(messageId: string, i: any) {
    this.indexForLoaderStar = i
    let status = !this.replieList[i].isImportant;
    this.replieService.markAsImportant(messageId, status).subscribe((resp: any) => {

      if (resp.responseCodeJson.code == 200) {

        this.getMails();
        if (this.replieList[i].isImportant == true) {
          //  console.log("inside logic")
          this.toastNotification.addNotification(
            'Yuhuu! Just added as important',
            ` successfully restored.`,
            NotificationEnum.INFO
          );
        } else if (this.replieList[i].isImportant == false) {

          this.toastNotification.addNotification(
            'Yuhuu! Just remove from important',
            ` successfully restored.`,
            NotificationEnum.INFO
          );
        }
      }
    })
  }

  UnSnoozed(messageId: string, i: any) {
    this.statusValue = !this.replieList[i].isSnoozed;

    this.replieService.markMailUnSnooze(messageId).subscribe((resp: any) => {
      if (resp.responseCodeJson.code === 200) {
        this.toastNotification.addNotification(
          'Just remove from Snooze',
          ``,
          NotificationEnum.WARNING
        );
        this.getMails();
      }
    })

  }

  snoozeMail(messageId: string, i: any) {
    this.statusValue = !this.replieList[i].isSnoozed;
    this.msgId = messageId;

    this.openDatePicker(i);
  }

  openDatePicker(index: any) {

    const dialogRef = this.dialog.open(DatePickerSnoozeComponent, {
      data: {
        type: 'snooze',
        messageId: this.msgId,
        status: this.statusValue,
        index: index
      },
      backdropClass: 'backdrop-background',
    });

  }
  readUnreadMail(messageId: string, i: any) {
    this.indexForLoaderRead = i;
    let status = !this.replieList[i].isRead;

    this.replieService.markMailAsUnread(messageId, status).subscribe((resp: any) => {
      if (resp.responseCodeJson.code == 200) {
        this.getMails();
        if (status == true) {
          this.toastNotification.addNotification(
            'Yuhuu! Conversation marked as read',
            ` successfully restored.`,
            NotificationEnum.INFO
          );
        } else if (status == false) {
          this.toastNotification.addNotification(
            'Yuhuu! Conversation marked as Unread',
            ` successfully restored.`,
            NotificationEnum.INFO
          );
        }
      }


    });

  }



  multiSelectState(num: number) {

    let selectedList = this.selection.selected;

    selectedList.forEach((obj) => {
      this.specificMessageId.push({ messageId: obj.messageId });
      this.setOfSpecificMessageId = [... new Set(this.specificMessageId)];
    })


    if (this.selection.hasValue()) {
      if (num === 1) {
        this.multiSelectStatus = true;
        this.multiSelectType = num

      } else if (num === 2) {
        this.multiSelectStatus = true;
        this.multiSelectType = num

      } else if (num === 3) {
        this.multiSelectStatus = true;
        this.multiSelectType = num

      } else if (num === 4) {
        this.multiSelectStatus = true;
        this.multiSelectType = num
      }

      else if (num === 5) {
        this.multiSelectStatus = false;
        this.multiSelectType = num
      }

      this.multiSelectValueUpdate();
    }

    else {
      this.toastNotification.addNotification(
        'Please select checkbox...!',
        ` successfully restored.`,
        NotificationEnum.INFO
      );
    }

  }


  multiSelectValueUpdate() {
    let data = this.setOfSpecificMessageId;

    this.replieService.multiSelect(data, this.multiSelectType, this.multiSelectStatus).subscribe((resp: any) => {

      if (resp.responseCodeJson.code === 200) {
        this.toastNotification.addNotification(
          'added Successfully',
          ` successfully restored.`,
          NotificationEnum.INFO
        );
        this.getMails();
        this.selection.clear();
        this.iconVisiableState = false;
        this.multiSelectStatus = false;
        this.specificMessageId = [];
      }
    })

  }

  getMails() {
    this.loader = true;

    this.replieService.getAllMails(this.campaignId).subscribe((resp: any) => {
      if (resp.responseCodeJson.code === 200) {
        this.loader = false;
        this.replieList = resp.list;
        this.loading = false;

        if (this.replieList.length === 0) {
          this.emptyMsg = true;
        } else if (this.replieList.lengh > 1) {
          this.multiDataVisible = true;
        }
      }



      if (resp.responseCodeJson.code === 409) {
        this.loader = false;
        this.loading = false;
        this.emptyMsg = true
      }
    })

    this.unReadCount.getReplieCount();
  }

}