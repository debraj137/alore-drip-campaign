import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReplieService } from 'src/app/service/resource/replie.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { CampaignItemTabsRepliesComponent } from '../campaign-item-tabs-replies/campaign-item-tabs-replies.component';
import { ViewportScroller } from "@angular/common";
import { DatePickerSnoozeComponent } from 'src/app/shared/date-picker-snooze/date-picker-snooze.component';
import { AddBlockedDomainComponent } from '../campaign-item-tabs-settings/blocked-domain/add-blocked-domain/add-blocked-domain.component';
import { AddBlockedMailComponent } from '../campaign-item-tabs-settings/blocked-email/add-blocked-mail/add-blocked-mail.component';
import { AddLabelComponent } from './add-label/add-label.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatMenuTrigger } from '@angular/material/menu';
import { AddProspectComponent } from './add-prospect/add-prospect.component';


export interface IMessage {
  messageId: string
}
@Component({
  selector: 'app-replies-thread',
  templateUrl: './replies-thread.component.html',
  styleUrls: ['./replies-thread.component.scss']
})
export class RepliesThreadComponent implements OnInit {

  // @ViewChild(MatMenuTrigger) labelList: MatMenuTrigger;

  @Output() refreshData = new EventEmitter<boolean>(false);
  @ViewChild('froalaEditorContainer') froalaEditorContainer!: ElementRef;
  selection = new SelectionModel<IMessage>(true, []);


  loader: boolean = true;
  isMultipleRecipents: boolean = false;
  editor = new FormControl('');
  userTags: any
  messageId: any;
  campaignId: any;
  replyDetails: any;
  replieList: any;
  showData: boolean = false;
  docEditor!: any;
  FroalaEditor = require('froala-editor');
  showEditor: boolean = false;
  disabledButton: boolean = false; public tags: string[] = []
  public selectedTags: string[] = [];
  public triggerDropDown: boolean = false;
  public isLoaded = true;
  public tagArray: any = ["Tag 1", "Tag 2", "Tag 3"]
  tagControl = new FormControl('');
  sendReplyTo: any = [];
  triangleLoader = false;
  replyData = this.fb.group({
    sendProspects: '',
    emailBody: '',
    subject: ''
  });

  onReply: boolean = false;
  labelListData: any;
  checked: boolean = false;
  onReplyAll: boolean = false;
  onForward: boolean = false;
  archive: boolean = false;
  statusValue: any;
  msgId: any;
  indexSnooze: any;
  labelSearchValue: string = "";
  dataOnClick: any;
  value: any;
  particularLabel: any[] = [];
  setOfSpecificLabel: any;
  snoozeStatus: any;

  searchTeammate = new FormControl('');

  options: Object = {

    pastePlain: true,
    dragInline: true,
    toolbarSticky: false,
    placeholderText: 'Write here..',
    key: 'AVB8B-21B2A1F3E1F2F1ua2BD1IMNBUMRWAd1AYMSTRBUZYA-9H3E2J2C4C6C3C1B5B1C1==',
    quickInsertTags: [],
    imageInsertButtons: ['imageBack', '|', 'imageByURL'],
    enter: this.FroalaEditor.ENTER_BR,
    paragraphFormatSelection: true,
    formEditButtons: [],
    fontFamily: {},
    fontFamilySelection: true,
    attribution: false,
    imageUpload: true,
    fileMaxSize: 1024 * 1024 * 10,
    fileAllowedTypes: ['*'],
    imageEditButtons: ['imageDisplay', 'imageAlign', 'imageInfo', 'imageRemove'],
    imageUploadMethod: 'POST',
    imageUploadRemoteUrls: true,
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    wordAllowedStyleProps: ['font-family', 'background', 'color', 'text-align', 'vertical-align', 'background-color', 'height', 'text-decoration', 'font-weight', 'font-style', 'text-indent', 'border', 'border-.*'],
    events: {
      contentChanged: () => {
        const nativeElement = this.froalaEditorContainer.nativeElement;
        nativeElement.scrollTop = nativeElement.scrollHeight;
      },
    },
  };

  teammateId: any;

  subData = 'added subject flag here......!!'
  currentIndex: any[] = [];
  baseCampaignId: string = ''
  editorVisible: boolean = false;
  visible: boolean = false;
  teammatesData: any;
  searchText: any;
  currentThreadId: string = '';
  currentPersonalizedEmailId: string = ''
  myEmailId: string = ''
  senderName: string = ''

  checkedLabelList: any;


  constructor(
    public replieService: ReplieService,
    public route: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
    private toastNotification: ToastNotificationService,
    public tabRepliesComponent: CampaignItemTabsRepliesComponent,
    private scroller: ViewportScroller,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    
    this.currentThreadId = this.tabRepliesComponent.currentThreadId;
    this.messageId = this.tabRepliesComponent.currentmessageId;
    this.currentPersonalizedEmailId = this.tabRepliesComponent.currentPersonalizedEmailId;
    this.indexSnooze = this.tabRepliesComponent.currentMessageIndex;
    this.snoozeStatus = this.tabRepliesComponent.snoozeStatusValue;

    this.searchTeammate.valueChanges.subscribe((value: string) => {
      this.searchText = value;
    })

    this.baseCampaignId = this.route.snapshot.paramMap.get('baseid') || '';
    this.campaignId = this.route.snapshot.paramMap.get('campaignId') || '';
    this.getLabelList();
    this.getReplyDetails();
    this.getMails();
    this.getTeammates();
    this.expand(0);

  }

  indexVisible() {
    this.checkedLabelList = this.replieList[0].labelList;
  }
  initializeFroala(event: any) {
    event.initialize();
    this.docEditor = event.getEditor();
    this.editor.setValue('')
  }

  toggleEditor() {

    this.showEditor = !this.showEditor;

    if (this.editorVisible == false) {
      this.editorVisible = true;
      this.scroller.scrollToAnchor("send-reply");
    } else if (this.editorVisible == true) {
      this.editorVisible = false;
    }


  }


  // onRemoveTag(data: string) {
  //   // this.data = '';
  //   // // this.tableService.rowDataSet[this.params.rowIndex][this.params.colDef.field] = '';
  //   // this.params.colDef.fieldType.includes('custom') ? this.updateCustomTags(this.data) : this.updateInbuiltTags();
  // }

  checkSingleTagValue(): boolean {
    // return JSON.stringify(this.data) !== '{}';
    return true
  }

  sendReply() {

    if (!this.onForward && this.sendReplyTo.length === 1) {

      this.triangleLoader = true;
      let prospectEmail = this.sendReplyTo[0];

      let prospectDetail = this.replieList.filter((obj: any) => {
        if (obj.replyFrom === prospectEmail)
          return obj
      })

      let obj = {}

      if (prospectDetail.length == 0) {

        obj = {
          prospectName: prospectEmail.split('@')[0],
          prospectEmail: prospectEmail,
          campaignId: this.campaignId,
          senderName: this.senderName[0],
          threadId: this.currentThreadId,
          personalizedEmailId: this.currentPersonalizedEmailId,
          subject: this.replyData.get('subject')?.value,
          body: this.replyData.get('emailBody')?.value,
          senderEmail: this.myEmailId,
          messageId: this.messageId
        }

      }

      else {

        obj = {
          prospectName: prospectDetail[0].firstName + " " + prospectDetail[0].lastName,
          prospectEmail: prospectDetail[0].replyFrom,
          campaignId: this.campaignId,
          senderName: this.senderName[0],
          threadId: this.currentThreadId,
          personalizedEmailId: this.currentPersonalizedEmailId,
          subject: this.replyData.get('subject')?.value,
          body: this.replyData.get('emailBody')?.value,
          senderEmail: this.myEmailId,
          messageId: this.messageId
        }
      }




      this.replieService.replyToMail(obj).subscribe((resp: any) => {

        if (resp.responseCodeJson.code === 200) {
          this.triangleLoader = false;
          this.toastNotification.addNotification(
            'Reply sent successfully',
            '',
            NotificationEnum.SUCCESS
          );
        }
      })
    }


    // if(this.onReply && this.sendReplyTo.length > 1){

    //   let prospectEmail = this.sendReplyTo[0];

    //   let prospectDetail = this.replieList.filter((obj: any) => {
    //     if(obj.replyFrom === prospectEmail)
    //         return obj
    //     })

    //   prospectDetail[0].subject = this.replyData.get('subject')?.value;
    //   prospectDetail[0].body = this.replyData.get('emailBody')?.value
    //   prospectDetail[0].prospectName = prospectDetail[0].firstName+" "+prospectDetail[0].lastName
    //   prospectDetail[0].campaignId = this.campaignId
    //   prospectDetail[0].prospectEmail = prospectDetail[0].replyFrom
    //   prospectDetail[0].senderEmail = this.myEmailId
    //   prospectDetail[0].senderName = ""

    //   const {replyTo,replyFrom,firstName,image,isArchive,cc,isDeleted,isImportant,isRead,isSnoozed,label,lastName,repliedDate, ...payload } = prospectDetail[0]

    //   this.replieService.replyToMail(payload).subscribe((resp:any) => {
    //     if(resp.responseCodeJson.code === 200){

    //     }
    //   })
    // }

    else if (!this.onForward && this.sendReplyTo.length > 1) {
      this.triangleLoader = true;
      let payload = [];


      for (let j = 0; j < this.sendReplyTo.length; j++) {
        let bool = true;
        for (let i = 0; i < this.teammatesData.length; i++) {
          if (this.sendReplyTo[j] === this.teammatesData[i]?.userEmailId) {

            let obj = {
              prospectName: this.teammatesData[i].firstName + " " + this.teammatesData[i].lastName,
              prospectEmail: this.teammatesData[i].userEmailId,
              campaignId: this.campaignId,
              senderName: this.senderName[0],
              threadId: this.currentThreadId,
              personalizedEmailId: this.currentPersonalizedEmailId,
              subject: this.replyData.get('subject')?.value,
              body: this.replyData.get('emailBody')?.value,
              senderEmail: this.myEmailId,
              messageId: this.messageId
            }
            payload.push(obj);
            bool = false;
          }

          else if (j === 0 && i == 0) {

            let prospectDetail = this.replieList.filter((obj: any) => {
              if (obj.replyFrom === this.sendReplyTo[j])
                return obj
            })

            if (prospectDetail[0]?.replyFrom === this.sendReplyTo[j]) {

              let obj = {
                prospectName: prospectDetail[0].firstName + " " + prospectDetail[0].lastName,
                prospectEmail: prospectDetail[0].replyFrom,
                campaignId: this.campaignId,
                senderName: this.senderName[0],
                threadId: this.currentThreadId,
                personalizedEmailId: this.currentPersonalizedEmailId,
                subject: this.replyData.get('subject')?.value,
                body: this.replyData.get('emailBody')?.value,
                senderEmail: this.myEmailId,
                messageId: this.messageId
              }

              payload.push(obj)
              bool = false;
            }
          }

        }


        if (bool == true) {

          let userName = this.sendReplyTo[j].split('@');
          let obj = {
            prospectName: userName[0],
            prospectEmail: this.sendReplyTo[j],
            campaignId: this.campaignId,
            senderName: [0],
            threadId: this.currentThreadId,
            personalizedEmailId: this.currentPersonalizedEmailId,
            subject: this.replyData.get('subject')?.value,
            body: this.replyData.get('emailBody')?.value,
            senderEmail: this.myEmailId,
            messageId: this.messageId
          }

          payload.push(obj);

        }
      }


      this.replieService.replyAllToMail(payload).subscribe((resp: any) => {

        if (resp.responseCodeJson.code === 200) {
          this.triangleLoader = false;
          this.toastNotification.addNotification(
            'All replies sent successfully..!',
            ``,
            NotificationEnum.SUCCESS
          );
        }
      })

    }

    else if (this.onForward) {
      this.triangleLoader = true;
      let payload = [];

      for (let j = 0; j < this.sendReplyTo.length; j++) {
        let bool = true;
        for (let i = 0; i < this.teammatesData.length; i++) {
          if (this.sendReplyTo[j] === this.teammatesData[i].userEmailId) {
            let obj = {
              prospectName: this.teammatesData[i].firstName + " " + this.teammatesData[i].lastName,
              prospectEmail: this.teammatesData[i].userEmailId,
              campaignId: this.campaignId,
              senderName: this.senderName[0],
              threadId: this.currentThreadId,
              personalizedEmailId: this.currentPersonalizedEmailId,
              subject: this.replyData.get('subject')?.value,
              body: this.replyData.get('emailBody')?.value,
              senderEmail: this.myEmailId,
              messageId: this.messageId
            }

            payload.push(obj)

          }

          else if (j === 0 && i == 0) {

            let prospectDetail = this.replieList.filter((obj: any) => {
              if (obj.replyFrom === this.sendReplyTo[j])
                return obj
            })

            if (prospectDetail[0].replyFrom === this.sendReplyTo[j]) {
              let obj = {
                prospectName: prospectDetail[0].firstName + " " + prospectDetail[0].lastName,
                prospectEmail: prospectDetail[0].replyFrom,
                campaignId: this.campaignId,
                senderName: this.senderName[0],
                threadId: this.currentThreadId,
                personalizedEmailId: this.currentPersonalizedEmailId,
                subject: this.replyData.get('subject')?.value,
                body: this.replyData.get('emailBody')?.value,
                senderEmail: this.myEmailId,
                messageId: this.messageId
              }


              payload.push(obj)
            }
          }

          else if (bool == true) {

            let userName = this.sendReplyTo[j].split('@');
            let obj = {
              prospectName: userName[0],
              prospectEmail: this.sendReplyTo[j],
              campaignId: this.campaignId,
              senderName: this.senderName[0],
              threadId: this.currentThreadId,
              personalizedEmailId: this.currentPersonalizedEmailId,
              subject: this.replyData.get('subject')?.value,
              body: this.replyData.get('emailBody')?.value,
              senderEmail: this.myEmailId,
              messageId: this.messageId
            }

            payload.push(obj);
            bool = false;
          }

        }
      }


      this.replieService.forwardMail(payload).subscribe((resp: any) => {

        if (resp.responseCodeJson.code === 200) {
          this.triangleLoader = false;
          this.toastNotification.addNotification(
            'Mail has been forwarded',
            ` `,
            NotificationEnum.SUCCESS
          );
        }
      })
    }


  }

  expand(i: any) {
    if (this.currentIndex.includes(i)) {
      const indexValue = this.currentIndex.indexOf(i);
      this.currentIndex.splice(indexValue, 1);
    } else {
      this.currentIndex.push(i);
    }
    let heightSpecific = document.querySelector(".expandDiv") as HTMLElement;
    this.showData = true;

  }

  getMails() {

    if (this.currentThreadId == null) {

      this.toastNotification.addNotification(
        'Thread for this message is not available',
        `Redirecting...`,
        NotificationEnum.WARNING
      );

      setTimeout(() => {
        this.tabRepliesComponent.showReplies = true;
        this.tabRepliesComponent.showThread = false;
      }, 5000)

    }

    else {
      this.replieService.getThread(this.campaignId, this.currentThreadId).subscribe((resp: any) => {
        if (resp.responseCodeJson.code === 200) {
          this.replieList = resp.list;
          this.indexVisible();;

          if (resp.list[0].replyTo.length > 1) {
            this.isMultipleRecipents = true;
          }
          this.myEmailId = resp.list[0].replyTo[0];
          this.senderName = this.myEmailId.split('@')[0];
          this.loader = false;
        }
      })
    }
  }

  deleteMail() {
    this.replieService.markAsDelete(this.messageId).subscribe((resp: any) => {
      if (resp.responseCodeJson.code == 200) {
        this.toastNotification.addNotification(
          'Oops ! Just deleted reply',
          ` `,
          NotificationEnum.WARNING
        );
        window.location.reload()
      }
    })
  }

  archiveMail(status: boolean) {
    this.replieService.markAsArchive(this.messageId, status).subscribe((resp: any) => {
      if (resp.responseCodeJson.code == 200) {
        this.getMails();
        this.toastNotification.addNotification(
          'Yuhuu! Just added to archive',
          ` `,
          NotificationEnum.INFO
        );
      }
    })

  }

  snoozeMail() {
    this.statusValue = !this.snoozeStatus;

    // this.replieService.markMailAsSnooze(messageId,this.statuValue,i).subscribe();
    this.openDatePicker();
  }

  openDatePicker() {
    const dialog = this.dialog.open(DatePickerSnoozeComponent, {
      data: {
        type: 'snooze',
        messageId: this.messageId,
        status: this.statusValue,
        index: this.indexSnooze,
      },
      backdropClass: 'backdrop-background',
    });

  }

  getStrippedHTML(htmlBody: string) {

    htmlBody = htmlBody.replace(/&nbsp;/, "<br>");
    let strippedHtml = htmlBody.replace(/<[^>]+>/g, '');
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = strippedHtml;

    // Retrieve the text property of the element 
    return tempDivElement.textContent || tempDivElement.innerText || "";

  }

  getReplyDetails() {
    this.replieService.replyDetails(this.messageId).subscribe((resp: any) => {

      if (resp.responseCodeJson.code === 200) {
        this.replyDetails = resp
      }

    })
  }

  specificReplieThread() {
    this.tabRepliesComponent.showReplies = true;
    this.tabRepliesComponent.showThread = false;
  }

  specificMailReply(reply: any, el: HTMLElement) {
    this.onForward = false;
    this.onReply = true;
    this.onReplyAll = false;
    this.sendReplyTo = [];
    this.sendReplyTo.push(reply.replyFrom)
    this.replyData.get('subject')?.setValue(reply.subject);
    this.replyData.get('emailBody')?.setValue('')
    this.editorVisible = true;

    setTimeout(() => {
      el.scrollIntoView()
    }, 100)


  }

  getTeammates() {
    this.replieService.getTeammatesList().subscribe((resp: any) => {
      if (resp.responseCodeJson.code === 200) {
        this.teammatesData = resp.list;
      }

    })
  }



  removeEditor() {
    this.sendReplyTo = [];
    this.replyData.get('subject')?.setValue('');
    this.replyData.get('emailBody')?.setValue('');
    this.toggleEditor();
  }

  replyAll(allProspects: any, el: HTMLElement) {

    this.onForward = false;
    this.onReply = false;
    this.onReplyAll = true;

    this.sendReplyTo = [];
    this.sendReplyTo = this.replieList[0].cc || [];

    this.sendReplyTo.push(this.replieList[0].replyFrom);


    this.replyData.get('subject')?.setValue(allProspects[0]?.subject);
    this.replyData.get('emailBody')?.setValue('')

    this.editorVisible = true;
    setTimeout(() => {
      el.scrollIntoView()
    }, 100)
  }

  reply(allProspects: any) {
    this.onForward = false;
    this.onReply = true;
    this.onReplyAll = false;
    this.sendReplyTo = []
    this.sendReplyTo.push(this.replieList[0].replyFrom);
    this.editorVisible = true;
    this.replyData.get('emailBody')?.setValue('')
    this.replyData.get('subject')?.setValue(allProspects[0]?.subject);
  }

  forward(el: HTMLElement) {
    this.onForward = true;
    this.onReply = false;
    this.onReplyAll = false;

    this.sendReplyTo = [];
    let forwardData = this.replieList[this.replieList.length - 1];
    let subject = forwardData.subject;

    let body = forwardData.body
    let from = "<" + forwardData.replyFrom + ">"
    let date = new Date(forwardData.repliedDate)
    let to = forwardData.replyTo
    let name = forwardData.firstName + " " + forwardData.lastName;

    let forwardBody = "<br><br>" +"---------- Forwarded message --------- <br>From: " + name + " " + from + " <br> Date: " +
      date + "<br>" + "Subject: " + subject + "<br> To: " + to + "<br><br>" + body;

    this.replyData.get('emailBody')?.setValue(forwardBody);
    this.replyData.get('subject')?.setValue(subject)


    this.editorVisible = true;
    setTimeout(() => {
      el.scrollIntoView()
    }, 100)

  }

  selectedTeammate(i: any) {
    let data = this.teammatesData[i].userEmailId;

    if (this.sendReplyTo.includes(data) == false)
      this.sendReplyTo.push(data);

    this.searchTeammate.setValue('');

  }

  addViaEnter() {
    let data = this.searchTeammate.value;

    if (data != "" && this.sendReplyTo.includes(data) == false)
      this.sendReplyTo.push(data);

    this.searchTeammate.setValue('');
  }

  mailCount(messageId: string) {
    this.replieService.getMailCount(messageId).subscribe((resp: any) => {

    })
  }

  removeChip(i: any) {
    this.sendReplyTo.splice(i, 1)
  }

  openAddBlockedDomain() {
    const dialog = this.dialog.open(AddBlockedDomainComponent, {
      backdropClass: 'backdrop-background',
      data: {
        campaignId: this.campaignId,
        domain: this.replieList[0].replyFrom
      }
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshData.emit(true)
      }
    });
  }

  openAddBlockedMail() {
    const dialog = this.dialog.open(AddBlockedMailComponent, {
      backdropClass: 'backdrop-background',
      data: {
        campaignId: this.campaignId,
        emailId: this.replieList[0].replyFrom
      }
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshData.emit(true)
      }
    });
  }

  checkBoxValueChange($event: any, i: any) {
    let bool = $event.checked;
    // console.log(bool)
    if (bool) {
      this.labelListData[i].selected = true;
    } else {
      this.labelListData[i].selected = false;
    }

  }

  apply() {

    for (let i = 0; i < this.labelListData.length; i++) {
      if (this.labelListData[i].selected == true) {
        let add = this.particularLabel.push(this.labelListData[i]);

      } else if (this.labelListData[i].selected == false) {
        let remove = this.particularLabel.splice(i, 1);

      }
    }


    let finalLabel = {
      messageId: this.tabRepliesComponent.currentmessageId,
      label: this.particularLabel,
    }

    this.replieService.applyLabel(finalLabel).subscribe((resp: any) => {
      if (resp.responseCodeJson.code === 200) {
        this.toastNotification.addNotification(
          `Yuhuu!  ${resp.responseCodeJson.message}`,
          ` `,
          NotificationEnum.INFO
        );

        this.getMails();
        // this.labelList.closeMenu();
      }

    })
  }

  getDateDifference(date: number): string {

    if (date == 0) {
      return ""
    }

    let todayDate = new Date();
    let sentOnDate = new Date(date);

    let differenceInSeconds = (todayDate.getTime() - sentOnDate.getTime()) / 1000;

    if (differenceInSeconds < 59) {
      return "Just now.."
    }

    let diffrenceinMinutes = (differenceInSeconds / 60);

    if (diffrenceinMinutes < 59) {
      return Math.round(diffrenceinMinutes) + " minutes ago"
    }

    let differenceInHours = diffrenceinMinutes / 60;

    if (differenceInHours < 24) {
      return Math.round(differenceInHours) + " hours ago"
    }

    let differenceInDays = Math.floor(differenceInSeconds / (3600 * 24));

    if (differenceInDays === 0) {
      return "Today"
    }

    if (differenceInDays === 1) {
      return "Yesterday"
    }

    if (differenceInDays > 0 && differenceInDays <= 30)
      return Math.round(differenceInDays) + " days ago";

    let differenceInMonths = Math.floor(differenceInDays / 30);

    if (differenceInMonths <= 12)
      return differenceInMonths + " month ago";

    let differenceInYears = Math.floor(differenceInMonths / 12);

    return differenceInYears + " year ago";
  }


  openEnterLabel() {
    const dialog = this.dialog.open(AddLabelComponent, {
      data: {
        messageId: this.messageId,
      },
      backdropClass: 'backdrop-background',
    });

    dialog.afterClosed().subscribe(() => {
      this.getLabelList();
    });

  }

  getLabelList() {

    this.replieService.getLabelList(this.messageId).subscribe((resp: any) => {

      if (resp.responseCodeJson.code == 200)
        this.labelListData = resp.list;
    })
  }

  addToCampaign() {
    this.dialog.open(AddProspectComponent, {
      data: {
        replyFrom: this.replieList[0].replyFrom,
        cc: this.parseList(this.replieList[0].cc) || [],
        bcc: this.parseList(this.replieList[0].bcc) || []
      }
    })
  }

  parseList(arr: any){
    return JSON.parse(arr)
  }

}