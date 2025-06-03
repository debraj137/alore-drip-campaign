import { ObjectiveService } from 'src/app/service/resource/objective.service';
import { Component, ElementRef, HostListener, Input, OnInit, Output, ViewChild, ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { first, Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { LayoutService } from 'src/app/service/core/layout.service';
import { SideMenuTreeService } from 'src/app/service/core/side-menu-tree.service';
import { ComponentCanDeactivate } from 'src/app/service/core/leave-route-confirmation';
import { AlertEditorScreenComponent } from 'src/app/shared/alert-editor-screen/alert-editor-screen.component';
import { MatDialog } from '@angular/material/dialog';
import { ScoreService } from 'src/app/service/resource/score.service';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { EmailServiceService } from 'src/app/service/resource/email-service.service';
import { FormControl } from '@angular/forms';
import { MailResponse } from 'src/app/model/mailResponse';
import {HttpClient} from '@angular/common/http'
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { SuccessComponent } from 'src/app/shared/success/success.component';
import { EmailIntegrationService } from 'src/app/service/resource/email-integration.service';
import { CampaignItemTabsSettingsComponent } from '../../campaign-item-detail/campaign-item-tabs/campaign-item-tabs-settings/campaign-item-tabs-settings.component';
import { CampaignSettingService } from '../../../service/resource/campaign-setting.service';
import { EmailEditorService } from '../../../service/resource/email-editor.service';


@Component({
  selector: 'app-email-editor-page',
  templateUrl: './email-editor-page.component.html',
  styleUrls: ['./email-editor-page.component.scss'],
})
export class EmailEditorPageComponent implements OnInit, ComponentCanDeactivate {

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    if (!this.isDataSaved) {
      this.leaveDialogConfirmation(false)
      return false
    } else {
      return true
    }
  }
  
  @Input() body: string = "";
  @Input() subject: string = "";
  
  currentRecipeId: any;
  currentTemplateList: any[] = [];
  campaignId: string = '';
  personalizedEmailId: string = '';
  baseId: string = '';
  currentEmailBody: string = '';
  emailBody: string = '';
  resetFormSubject: Subject<boolean> = new Subject<boolean>();
  currentEmailSubject: string = '';
  updatedEditorValue: any;
  currentTemplateId: any;
  firstLoad: boolean = false;
  breadcrumbData: any[] = [];
  loader: boolean = true;
  isDataSaved: boolean = true;
  selectedLink: string = '';
  isHelperTextShown: boolean = false;
  saveEmailLoader: boolean = false;
  testMailLoader: boolean = false
  isEmailPresent: boolean = false;
  isLoaded: boolean = false;
  renderLastSaveDate: boolean = false;
  dateDifference: string = "";
 
  constructor(
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private objectiveService: ObjectiveService,
    private campaignService: CampaignService,
    private emailService: EmailServiceService,
    private activatedRoute: ActivatedRoute,
    private toastNotification: ToastNotificationService,
    private SideMenuTreeService: SideMenuTreeService,
    public layoutService: LayoutService,
    private dialog: MatDialog,
    private router: Router,
    private score: ScoreService,
    private campaignSettingService: CampaignSettingService,
    private emailEditorService: EmailEditorService
  
  ) { }

  ngOnInit(): void {
    this.layoutService.updateSidebarStatus(true);
    this.baseId = this.activatedRoute.snapshot.paramMap.get('baseid') || '';
    this.campaignId = this.activatedRoute.snapshot.paramMap.get('campaignId') || '';
    this.getCampaignMailSequence(this.campaignId);
    this.getCurrentCampaignDetails(this.campaignId)

    // lisen for changes from sidebar
    this.SideMenuTreeService.mailChanged.subscribe(
      (data) => {
        const mailValue = this.SideMenuTreeService.currentSelectedEmail.value
        if (data) {
          this.clikedOnEmail(mailValue)
        }
      }
    )

    this.SideMenuTreeService.refreshEmailEditor.subscribe(
      (data) => {
        if (data) {
          this.getCampaignMailSequence(this.campaignId)
        }
      }
    )


    
    this.campaignSettingService.getIntegrationDetails(this.campaignId).subscribe((res: any) => {
      if(res){
        if(res.responseCodeJson.message === "Success")
          this.isEmailPresent = true;
      }
      this.isLoaded = true;

    })

  }

  getMailBody(body: any){
    this.body = body;
  }

  getSubjectBody(subject: any){
    this.subject = subject;
  }
  
  getLastSaveDate(date: any){
     this.dateDifference = this.getDateDifference(date);
  }


  getCurrentCampaignDetails(campId: any) {
    this.campaignService.getCurrentCampaignDetails(campId)
      .subscribe((res: any) => {
        if (res?.object?.objectiveId) {
          this.isHelperTextShown = res?.object?.objectiveId === '#' ? false : true
        }
      });
  }

  getCurrentBaseDetails(id: any) {
    this.campaignService.getCurrentBaseDetails(id).subscribe((res: any) => {

      if (res.responseCodeJson.code === 200) {
        this.breadcrumbData = [
          {
            name: 'Home',
            link: '',
          },
          {
            name: res.object?.campaignBaseName,
            link: '/campaign-Details/' + this.baseId,
          },
          {
            name: this.currentTemplateList[0]?.campaignName,
            link:
              '/campaign-Details/' +
              this.baseId +
              '/campaign-item-detail/' +
              this.campaignId,
          },
          {
            name: 'Edit Mails',
            link:
              '/campaign-Details/' +
              this.baseId +
              '/campaign-item-detail/' +
              this.campaignId +
              '/email-editor',
          },
        ];
      }
    });
  }

  getCampaignMailSequence(campaignId: string) {
    this.loader = true
    this.campaignService.getCampaignMailSequence(campaignId).subscribe(
      (res: any) => {
        // mapping list data
        this.currentTemplateList = res.list;
        this.SideMenuTreeService.currentTemplateList.next(res.list);
        

        //mapping selected data
        let selectedEmail : any = null
        if (!this.SideMenuTreeService.currentSelectedEmail.value) {
          selectedEmail = this.currentTemplateList[0]
        } else {
          const emailId = this.SideMenuTreeService.currentSelectedEmail.value.personalizedEmailId
          this.currentTemplateList.forEach((obj : any) => {
            if (obj.personalizedEmailId === emailId) {
              selectedEmail = obj
            }
          })
        }

        this.SideMenuTreeService.currentSelectedEmail.next({
          subject: selectedEmail?.subject,
          body: selectedEmail.body,
          personalizedEmailId: selectedEmail.personalizedEmailId
        })
        this.SideMenuTreeService.activeEmailSidebar.next({
          subject: selectedEmail.subject,
          body: selectedEmail.body,
          personalizedEmailId: selectedEmail.personalizedEmailId
        })
        this.currentEmailSubject = selectedEmail.subject;
        this.currentEmailBody = selectedEmail.body;
        this.currentTemplateId = selectedEmail.personalizedEmailId;

        if (this.baseId) {
          this.getCurrentBaseDetails(this.baseId)
        }

        this.loader = false
      }
    )
  }
  getRecipeEmailtemplates(recipeId: any) {
    this.objectiveService.getEmailTemplatesOfTheRecipe(recipeId).subscribe((res: any) => {
      this.currentTemplateList = res.list;
    });
  }

  clikedOnEmail(event : any) {
    if (!this.isDataSaved) {
      this.leaveDialogConfirmation(true).subscribe((result : string) => {
        if (result === 'save') {
          this.updatePersonalizedEmail(event)
        }
        if (result === 'continue') {
          this.isDataSaved = true;
          if (this.selectedLink) {
            this.router.navigateByUrl(this.selectedLink)
          } else {
            setTimeout(() => {
              this.SideMenuTreeService.currentSelectedEmail.next(event)
              this.SideMenuTreeService.mailChanged.next(true)
            }, 100);
          }
        }
      })
    } else {
      this.changeEmail(event)
    }
  }

  changeEmail(event : any) {
    this.SideMenuTreeService.activeEmailSidebar.next({
      body: event.body,
      subject: event.subject,
      personalizedEmailId: event.personalizedEmailId
    })
    this.score.emailBody.next(event.body)
    this.currentEmailBody = event.body;
    this.currentEmailSubject = event.subject;
    this.currentTemplateId = event.personalizedEmailId;
    this.updatedEditorValue = event.body
    this.resetFormSubject.next(true);
  }

  updatefunc(event: any) {
    if (event) {
      this.updatedEditorValue = event.editorValue;
      this.currentEmailSubject = event.subject;
    }
  }

  updatePersonalizedEmail(data? : any) {
 
    const req = {
      body: this.updatedEditorValue,
      subject:  this.currentEmailSubject,
      emailTemplateId: this.currentTemplateId,
    }
    
    this.body = JSON.stringify(this.updatedEditorValue);
    this.subject = JSON.stringify(this.currentEmailSubject)

    this.saveEmailLoader = true
    this.emailService.updatePersonalizedEmail(req).subscribe((res: any) => {

      if(res.responseCodeJson.code === 200){
        this.dateDifference = this.getDateDifference(res.object.updatedDate);
      }

      this.toastNotification.addNotification(
        "It's true!",
        `You just created a spam free email template`,
        NotificationEnum.INFO
      )
      this.isDataSaved = true;
    
      if (this.selectedLink) {
        this.router.navigateByUrl(this.selectedLink)
      }
      const updateSideTree = this.SideMenuTreeService.currentTemplateList.value.map((obj : any) => {
        if (obj.personalizedEmailId === this.currentTemplateId) {
          return {
            ...obj,
            body: this.updatedEditorValue,
            subject: this.currentEmailSubject
          }
        } else {
          return obj
        }
      })
      this.SideMenuTreeService.currentTemplateList.next(updateSideTree)
      if (data) {
        this.isDataSaved = true
        if (this.selectedLink) {
          this.router.navigateByUrl(this.selectedLink)
        } else {
          setTimeout(() => {
            this.SideMenuTreeService.currentSelectedEmail.next(data)
            this.SideMenuTreeService.mailChanged.next(true)
          }, 100);
        }
      }
      this.saveEmailLoader = false
    });
  }


  autoSave(data ?: any){
   
    const req = {
      body: this.updatedEditorValue,
      subject:  this.currentEmailSubject,
      emailTemplateId: this.currentTemplateId,
    }
    
    this.body = JSON.stringify(this.updatedEditorValue);
    this.subject = JSON.stringify(this.currentEmailSubject)
  
    this.emailService.updatePersonalizedEmail(req).subscribe((res: any) => {
      

      if(res.responseCodeJson.code === 200){
        this.dateDifference = this.getDateDifference(res.object.updatedDate);
      }

      
    });
  }

  deleteTemplateConfirmation() {
    const dialogRef = this.layoutService.openAlertDialog(
      'Hold on',
      'Are you sure you want to delete this Email template from sequence ?',
      true,
      'delete_Popup_Icon',
      'Delete Email from sequence'
    )
    dialogRef.afterClosed().subscribe((result : boolean) => {
      if (result) {
        this.submitDeleteTemplate();
      }
    })
  }

  submitDeleteTemplate() {
    const payload = { 
      templateId: this.SideMenuTreeService.currentSelectedEmail.value?.personalizedEmailId,
      campaignId: this.campaignId
    }

    this.emailService.deletePersonalizedEmail(payload)
    .subscribe((resp : any) => {
      if (resp.responseCodeJson.code === 200) {
        this.getCampaignMailSequence(this.campaignId)
        this.SideMenuTreeService.currentSelectedEmail.next(null)
        this.isDataSaved = true
        this.toastNotification.addNotification(
          'Et tu Brutus?',
          `We deleted the List`,
          NotificationEnum.SUCCESS
        )
      }
    })
  }

  leaveDialogConfirmation(customizeAction : boolean) : any {
    const dialog = this.dialog.open(AlertEditorScreenComponent, {
      panelClass: 'alert-dialog',
      backdropClass: 'backdrop-background'
    })
    if (customizeAction) {
      return dialog.afterClosed()
    } else {
      return dialog.afterClosed().subscribe((result : string) => {
        if (result === 'save') {
          this.updatePersonalizedEmail()
        }
        if (result === 'continue') {
          this.isDataSaved = true
          if (this.selectedLink) {
            this.router.navigateByUrl(this.selectedLink)
          }
        }
      })
    }
  }
  sendMailData(){
    this.testMailLoader = true;
    const campaignId = this.activeRoute.snapshot.paramMap.get('campaignId') || '';
    const personalizedEmailId = this.SideMenuTreeService.currentSelectedEmail.value.personalizedEmailId;
    const data = this.emailService.sendMail(personalizedEmailId, campaignId).subscribe({next: (res: any) => {
       this.openTestInfo(res.responseCodeJson.message);
       this.testMailLoader = false;
     },

     error: (error: any) => {
       this.toastNotification.addNotification(
         'Email Id is not integrated!',
         `Mail not sent`,
         NotificationEnum.DANGER
       )
     }
     });
    }
  
  openResponseNotification(){
    let errors : number = 0;
    if(/^[a-z0-9]+$/i.test(this.body)){
        this.toastNotification.addNotification(
          'Body of the mail is empty!',
          `Mail not sent`,
          NotificationEnum.DANGER
        )
          errors += 1;
      }
      if(this.subject.length == 0 || this.subject === "" || this.subject == null || this.subject === " "){
        this.toastNotification.addNotification(
          'Subject of the mail is empty!',
          `Mail not sent`,
          NotificationEnum.DANGER
        )
        errors += 1;
      }
    if(errors == 0){
      this.sendMailData();
    }
     }

   openTestInfo(message: string) {

    const dialog = this.dialog.open(SuccessComponent,{
      data: {
        title: "Test Mail Sent",
        subHeading: "Mail has been sent successfully",
        message: message,
        img: "setting_Icon_Popup_Modal"
      },
      backdropClass: 'backdrop-background'
    }
    )
   }

   getDateDifference(date: number): string {

    if(date == 0){
      return ""
    }

    let todayDate = new Date();
    let sentOnDate = new Date(date);
    
    let differenceInSeconds = (todayDate.getTime() - sentOnDate.getTime())/1000;
    
    if(differenceInSeconds < 59){
      return  "saved now.."
    }

    let diffrenceinMinutes = (differenceInSeconds / 60);

    if(diffrenceinMinutes < 59){
      return  "saved "+ Math.round(diffrenceinMinutes)+" minutes ago"
    }
    
    let differenceInHours = diffrenceinMinutes/60;

    if(differenceInHours < 24){
      return  "saved "+ Math.round(differenceInHours)+" hours ago"
    }



    let differenceInDays = Math.floor(differenceInSeconds / (3600 * 24));
    
    if (differenceInDays === 0) {
      return "Saved Today"
    } 

    if(differenceInDays === 1){
      return "Saved Yesterday"
    }

    if(differenceInDays > 0 && differenceInDays <= 30)
    return "Saved "+ Math.round(differenceInDays)+" days ago";

    let differenceInMonths = Math.floor(differenceInDays / 30);

    if(differenceInMonths <= 12)
    return "Saved" +differenceInMonths+" month ago";

    let differenceInYears = Math.floor(differenceInMonths/12);

    return "Saved" +differenceInYears+" year ago";
  }
}
