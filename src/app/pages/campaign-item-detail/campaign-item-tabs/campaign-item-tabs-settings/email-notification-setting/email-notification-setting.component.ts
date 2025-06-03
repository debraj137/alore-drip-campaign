import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharePermissionEnum } from 'src/app/model/enum/share-permission-enum';
import { IMailSequenceDetail } from 'src/app/model/mail-sequence';
import { LayoutService } from 'src/app/service/core/layout.service';
import { CampaignSettingService } from 'src/app/service/resource/campaign-setting.service';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { SignatureService } from 'src/app/service/core/signature.service';
import { MatDialog } from '@angular/material/dialog';
import { MailSignatureDialogComponent } from './mail-signature-dialog/mail-signature-dialog.component';
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { map, mergeMap } from 'rxjs';
import { AddProfileImageDialogComponent } from 'src/app/pages/user-profile/user-info/add-profile-image-dialog/add-profile-image-dialog.component';

@Component({
  selector: 'app-email-notification-setting',
  templateUrl: './email-notification-setting.component.html',
  styleUrls: ['./email-notification-setting.component.scss']
})
export class EmailNotificationSettingComponent implements OnInit {

  @Input() campaignId: string = '';
  @ViewChild('froalaEditorContainer') froalaEditorContainer!: ElementRef;

  updateReportSetting: boolean = false;
  updateReportSettingLoader: boolean = false;
  dailyReportSetting: boolean = false;
  dailyReportSettingLoader: boolean = false;
  isNewNotification: boolean = false;
  notificationId: string = '';
  currentCampaignDetails!: IMailSequenceDetail;
  templateList: any;
  docEditor!: any;
  dataIndex: number = 0;
  value: any;
  changedData: string = '';
  indexPriority: number = 0;
  userSignature = {}
  isSignatureDataLoaded: boolean = false;
  profilePicture : string = ''

  signature0 = '<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&ampdisplay=swap" rel="stylesheet"></head><body><div style="max-width:550px;border-radius:5px;filter:drop-shadow(0 4px 12px rgba(0, 0, 0, .08)) drop-shadow(0 4px 12px rgba(24, 24, 24, .08));border-radius:5px;background-color:#fff;position:relative;font-family:Inter;" class="signature-card"><div style="height:100%;text-align:left" class="signature_inner"><h6 style="margin:0;padding:0;display:flex;font-style:normal;font-weight:700;font-size:18px;line-height:28px;text-align:center;color:#181818">{{name}}</h6><p style="display:flex;font-style:normal;margin:0;padding:0;font-weight:400;font-size:14px;line-height:24px;text-align:center;color:#474a57">{{title}} at {{companyName}}</p><p style="display:flex; font-style:normal;margin:0;padding:0;font-weight:400;font-size:14px;line-height:24px;text-align:center;color:#474a57;">{{email}} | {{phone}}</p></div></div></body></html>'
  signature1 = '<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&ampdisplay=swap" rel="stylesheet"></head><body><div style="display:flex;width:auto;filter:drop-shadow(0 4px 12px rgba(0, 0, 0, .08)) drop-shadow(0 4px 12px rgba(24, 24, 24, .08));background-color:#fff;font-family:Inter" class="signature-card"><div style="height:100%" class="signature_inner"><div style="display:flex;align-items:center;gap:25px" class="avtar-card whole-content"><div style="display:flex;height:48px;width:48px;margin:auto 22px auto auto;border-radius:18px" class="avtar-box"><img style="width:100%;height:100%;border-radius:100%;object-fit:cover" src="{{image}}" alt="avtar"></div><div style="border:1px dashed rgba(24,24,24,.2)" class="dot-divider-verticle"></div><div style="margin-left:36px" class="content"><h6 style="font-style:normal;font-weight:700;font-size:18px;line-height:28px;color:#181818;margin:0;padding:0">{{name}}</h6><p style="font-style:normal;font-weight:400;font-size:14px;line-height:24px;color:#474a57;margin:0;padding:0;margin-bottom:8px!important" class="mb-8">{{title}}</p><p style="font-style:normal;font-weight:400;font-size:14px;line-height:24px;color:#474a57;margin:0;padding:0">{{email}}</p><p style="font-style:normal;font-weight:400;font-size:14px;line-height:24px;color:#474a57;margin:0;padding:0">{{phone}}</p><p style="font-style:normal;font-weight:400;font-size:14px;line-height:24px;color:#474a57;margin:0;padding:0">{{companyName}}</p></div></div></div></div></body></html>'
  signature2 = '<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&ampdisplay=swap" rel="stylesheet"></head><body><div style="display:flex;width:auto;background-color:#fff;font-family:Inter" class="signature-card"><div style="height:100%" class="signature_inner"><div style="align-items:center;gap:25px" class="avtar-card whole-content"><div style="display:flex;height:48px;width:48px;margin-bottom:15px;border-radius:18px" class="avtar-box"><img style="width:100%;height:100%;border-radius:100%;object-fit:cover" src="{{image}}" alt="avtar"></div><div style="border:1px dashed rgba(24,24,24,.2)" class="dot-divider-verticle"></div><div style="max-width:550px;border-radius:5px;border-radius:5px;background-color:#fff;position:relative;font-family:Inter" class="signature-card"><div style="height:100%;text-align:left" class="signature_inner"><h6 style="margin:0;padding:0;display:flex;font-style:normal;font-weight:700;font-size:18px;line-height:28px;text-align:center;color:#181818">{{name}}</h6><p style="display:flex;font-style:normal;margin:0;padding:0;font-weight:400;font-size:14px;line-height:24px;text-align:center;color:#474a57">{{title}} at {{companyName}}</p><p style="display:flex;font-style:normal;margin:0;padding:0;font-weight:400;font-size:14px;line-height:24px;text-align:center;color:#474a57">{{email}} | {{phone}}</p></div></div></div></div></body></html>'
  signature3 = '<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&ampdisplay=swap" rel="stylesheet"></head><body><div style="display:flex;width:auto;background-color:#fff;font-family:Inter" class="signature-card"><div style="height:100%" class="signature_inner"><div style="align-items:center;gap:25px" class="avtar-card whole-content"><div style="max-width:550px;margin-bottom:15px;background-color:#fff;position:relative;font-family:Inter" class="signature-card"><div style="height:100%;text-align:left" class="signature_inner"><h6 style="margin:0;padding:0;display:flex;font-style:normal;font-weight:700;font-size:18px;line-height:28px;text-align:center;color:#181818">{{name}}</h6><p style="display:flex;font-style:normal;margin:0;padding:0;font-weight:400;font-size:14px;line-height:24px;text-align:center;color:#474a57">{{title}} at {{companyName}}</p><p style="display:flex;font-style:normal;margin:0;padding:0;font-weight:400;font-size:14px;line-height:24px;text-align:center;color:#474a57">{{email}} | {{phone}}</p></div></div><div style="border:1px dashed rgba(24,24,24,.2)" class="dot-divider-verticle"></div><div style="display:flex;height:48px;width:48px;margin-top:15px;border-radius:18px" class="avtar-box"><img style="width:100%;height:100%;border-radius:100%;object-fit:cover" src="{{image}}" alt="avtar"></div></div></div></body></html>'



  signatureSvgList: any = [
    {
      no: 0,
      img: "../../../../../../assets/icon/first.svg",
      checked: false

    },
    {
      no: 1,
      img: "../../../../../../assets/icon/second.svg",
      checked: false
    },
    {
      no: 2,
      img: "../../../../../../assets/icon/third.svg",
      checked: false
    },
    {
      no: 3,
      img: "../../../../../../assets/icon/forth.svg",
      checked: false
    },
  ]

  constructor(
    private campaignSettingService: CampaignSettingService,
    private campaignService: CampaignService,
    private layoutService: LayoutService,
    public signatureService: SignatureService,
    private dialog: MatDialog,
    private toastNotification: ToastNotificationService,
  ) { }

  ngOnInit(): void {
    this.getUserNotificationSettings();
    this.getCampaignSetting();
    this.getData();
    this.getUserImage();


  }

  getUserImage() {
    this.signatureService.getUserProfileImage().subscribe((resp: any) => {
      if (resp.responseCodeJson.code === 200) {
        this.profilePicture = resp.object.profilePicture || '';
      }
    })
  }


  getData() {
    this.signatureService.getSignature().subscribe((resp: any) => {

      if (resp.responseCodeJson.code === 200 || resp.responseCodeJson.code === 409) {

        if (resp.object)
          this.indexPriority = resp?.object?.priority;

        this.signatureSvgList[this.indexPriority].checked = true;
        this.isSignatureDataLoaded = true;

      }
    })
  }

  changeupdate() {
    this.updateReportSettingLoader = true
    this.campaignService.changeUpdate(this.campaignId).subscribe((res: any) => {
      this.updateReportSetting = res.object.updates;
      this.updateReportSettingLoader = false

    })
  }


  changeReport() {
    this.dailyReportSettingLoader = true
    this.campaignService.changeReport(this.campaignId).subscribe((res: any) => {
      this.dailyReportSetting = res.object.dailyReport
      this.dailyReportSettingLoader = false

    })
  }

  getCampaignSetting() {
    this.campaignService.getCurrentCampaignSettings(this.campaignId).subscribe(
      (res: any) => {
        this.currentCampaignDetails = res.object;
        this.updateReportSetting = res.object.updates;
        this.dailyReportSetting = res.object.dailyReport
      }
    )
  }


  getUserNotificationSettings() {
    this.campaignSettingService
      .getUserNotificationSettings()
      .subscribe((res: any) => {
        if (
          res.responseCodeJson.message ===
          'No settings found, please add settings'
        ) {
          this.isNewNotification = true;
        } else {
          this.notificationId = res?.object?.notificationId;
          this.updateReportSetting = res?.object?.updates;
          this.dailyReportSetting = res?.object?.dailyReports;
        }
      });
  }

  addOrUpdateNotificationSettings(data: any) {
    if (this.isNewNotification) {
      this.campaignSettingService
        .addNotificationSettings(data)
        .subscribe((res) => { });
    } else {
      this.campaignSettingService
        .updateNotificationSettings(data, this.notificationId)
        .subscribe((res) => { });
    }
  }




  get getUserRole() {
    switch (this.layoutService.campaignAccess.value?.toString()) {
      case SharePermissionEnum.OWNER:
        return false
        break;
      default:
        return true
        break;
    }
  }


  editSignature() {

    this.dialog.open(MailSignatureDialogComponent, {
      backdropClass: 'backdrop-background',
      panelClass: 'objective-layout',
      data: {
        "priority": this.indexPriority
      }
    });
  }

  changeIndexPriority(i: any) {

    this.signatureService.changeSignatureIndex(i);
    this.indexPriority = i.no;
    this.signatureService.getSignature()
      .subscribe(
        (resp: any) => {

          if (resp.responseCodeJson.code === 200) {

            let signature = "";

            switch (i.no) {
              case (0):
                signature = this.signature0;
                break;

              case (1):
                signature = this.signature1;
                break;

              case (2):
                signature = this.signature2;
                break;

              case (3):
                signature = this.signature3;
                break;

            }


            signature = signature.replace("{{name}}", resp.object.name);
            signature = signature.replace("{{title}}", resp.object.title);
            signature = signature.replace("{{email}}", resp.object.emailId);
            signature = signature.replace("{{phone}}", resp.object.phoneNumber);
            signature = signature.replace("{{image}}", this.profilePicture);
            signature = signature.replace("{{companyName}}", resp.object.companyName || '-');
            signature = signature.replace("{{website}}", resp.object.companyUrl || '-');

            let signatureResponseObject = {
              "name": resp.object.name,
              "title": resp.object.title,
              "email": resp.object.emailId,
              "phone": resp.object.phoneNumber,
              "companyName": resp.object.companyName,
              "companyUrl": resp.object.companyUrl,
              "priority": i.no,
              "signature": signature
            }


            this.signatureService.sendSignture(signatureResponseObject).subscribe((resp: any) => {
              if (resp.responseCodeJson.code === 200) {

                this.toastNotification.addNotification(
                  'Your signature has been updated!',
                  ``,
                  NotificationEnum.SUCCESS
                )
              }

              if (resp.responseCodeJson.code !== 200) {

                this.toastNotification.addNotification(
                  resp.responseCodeJson.message,
                  ``,
                  NotificationEnum.DANGER
                )
              }
            })
          }

          if (resp.responseCodeJson.code === 409) {
            this.toastNotification.addNotification(
              'You have not added signature yet!',
              `Please click on 3 dot icon on hover to add or edit`,
              NotificationEnum.DANGER
            )
          }
        }
      )

  }

  removeSignature() {


    let signatureResponseObject = {
      "name": "",
      "title": "",
      "email": "",
      "phone": "",
      "priority": 0,
      "signature": ""
    }


    this.signatureService.sendSignture(signatureResponseObject).subscribe((resp: any) => {
      if (resp.responseCodeJson.code === 200) {

        this.toastNotification.addNotification(
          'Your signature has been removed successfully!',
          ``,
          NotificationEnum.SUCCESS
        )
      }

      if (resp.responseCodeJson.code !== 200) {

        this.toastNotification.addNotification(
          resp.responseCodeJson.message,
          ``,
          NotificationEnum.DANGER
        )
      }
    })
  }



}
