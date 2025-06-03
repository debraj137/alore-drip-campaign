import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampaignSettingService } from 'src/app/service/resource/campaign-setting.service';
import { ToastNotificationService } from '../../../../../../service/core/toast-notification.service';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';

@Component({
  selector: 'app-add-weekly-report',
  templateUrl: './add-weekly-report.component.html',
  styleUrls: [
    './add-weekly-report.component.scss',
    '../../../../../../../assets/style/default-modal-style.scss',
    '../../../../../../../assets/style/form-field.scss'
  ]
})
export class AddWeeklyReportComponent implements OnInit {

  submitLoader : boolean = false;

  formControl = this.fb.group({
    email: [null, [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public campaignId: any,
    public dialogRef: MatDialogRef<AddWeeklyReportComponent>,
    private fb: FormBuilder,
    private campaignSettingService: CampaignSettingService,
    private toastNotification: ToastNotificationService
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
        1,
        emailValue
      ).subscribe((resp : any) => {
        this.submitLoader = false
        if (resp.responseCodeJson.code === 200) {
          this.dialogRef.close(true)
        }
        
        if (resp.responseCodeJson.code === 409){
          this.toastNotification.addNotification(
            'Email has already been added!',
            '',
            NotificationEnum.DANGER)
        }
      })
    }
  }

}
