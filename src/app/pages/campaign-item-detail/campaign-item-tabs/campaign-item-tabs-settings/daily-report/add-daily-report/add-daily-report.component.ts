import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsComponent } from 'src/app/layout/notifications/notifications.component';
import { CampaignSettingService } from 'src/app/service/resource/campaign-setting.service';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
@Component({
  selector: 'app-add-daily-report',
  templateUrl: './add-daily-report.component.html',
  styleUrls: [
    './add-daily-report.component.scss',
    '../../../../../../../assets/style/default-modal-style.scss',
    '../../../../../../../assets/style/form-field.scss'
  ]
})
export class AddDailyReportComponent implements OnInit {

  submitLoader : boolean = false;

  formControl = this.fb.group({
    email: [null, [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public campaignId: string,
    public dialogRef: MatDialogRef<AddDailyReportComponent>,
    private fb: FormBuilder,
    private campaignSettingService: CampaignSettingService,
    private notification: ToastNotificationService
  ) { }

  ngOnInit(): void {
    const emailControl = this.formControl.controls['email']
    emailControl.valueChanges.subscribe((value : string) => {
      const splittedValue = value.split('.')
      const splittedValue2 = value.split('@')
      if (
        !value.includes('@') ||
        splittedValue[0]?.length < 1 ||
        splittedValue[1]?.length < 1 ||
        splittedValue.length <= 1 ||
        splittedValue[1].includes(',') ||
        splittedValue[0].includes(',')
      ) {
        emailControl.setErrors({
          invalid : true
        })
      }
    })
  }

  submitDailyReport() {
    if(!this.submitLoader) {
      this.submitLoader = true
      const emailValue = this.formControl.controls['email'].value
      this.campaignSettingService.createReport(
        this.campaignId,
        0,
        emailValue
      ).subscribe((resp : any) => {
        this.submitLoader = false
        if (resp.responseCodeJson.code === 200) {
          this.dialogRef.close(true)
        }
        if (resp.responseCodeJson.code === 409){
          this.notification.addNotification(
            'Email has already been added!',
            '',
            NotificationEnum.DANGER)
        }
      })
    }
  }
}
