import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CampaignSettingService } from 'src/app/service/resource/campaign-setting.service';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';

@Component({
  selector: 'app-add-bcc-modal',
  templateUrl: './add-bcc-modal.component.html',
  styleUrls: [
    './add-bcc-modal.component.scss',
    '../../../../../../../assets/style/form-field.scss',
  ],
})
export class AddBccModalComponent implements OnInit {
  loader: boolean = false;
  isBccValid: boolean = true;
  isBccSuccess: boolean = false;
  isForwardValid: boolean = true;
  isForwardSuccess: boolean = false;
  campaignId: any;
  formControl = this.fb.group({
    bccEmail: [null, [Validators.required]],
    forwardEmail: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private settingService: CampaignSettingService,
    public dialogRef: MatDialogRef<AddBccModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastNotification: ToastNotificationService
  ) { }

  ngOnInit(): void {
    this.campaignId = this.data?.campaignId;
    const bccEmailControl = this.formControl.controls['bccEmail'];
    const forwardEmailControl = this.formControl.controls['forwardEmail'];
    bccEmailControl.valueChanges.subscribe((value: string) => {
      const splittedValue = value.split('.');
      if (
        !value.includes('@') ||
        splittedValue[0]?.length < 1 ||
        splittedValue[1]?.length < 1 ||
        splittedValue.length <= 1 ||
        splittedValue[1].includes(',') ||
        splittedValue[0].includes(',')
      ) {
        this.isBccValid = false;
        this.isBccSuccess = false;
      } else {
        this.isBccValid = true;
        this.isBccSuccess = true;
      }
    });
    forwardEmailControl.valueChanges.subscribe((value: string) => {
      const splittedValue = value.split('.');
      if (
        !value.includes('@') ||
        splittedValue[0]?.length < 1 ||
        splittedValue[1]?.length < 1 ||
        splittedValue.length <= 1 ||
        splittedValue[1].includes(',') ||
        splittedValue[0].includes(',')
      ) {
        this.isForwardValid = false;
        this.isForwardSuccess = false;
      } else {
        this.isForwardValid = true;
        this.isForwardSuccess = true;
      }
    });
  }

  addBccMail() {
    this.loader = true;
    const payload = this.formControl.value;
    this.settingService.addBccEmail(payload, this.campaignId)
      .subscribe(
        (resp: any) => {
          this.loader = false;
          if (resp?.responseCodeJson?.code === 200) {
            this.toastNotification.addNotification(
              'Another one!',
              `added new email`,
              NotificationEnum.SUCCESS
            )
            this.dialogRef.close(payload);
          }

          if (resp?.responseCodeJson?.code === 409) {
            this.toastNotification.addNotification(
              'Email has already been added!',
              '',
              NotificationEnum.DANGER)
          }


        },
        (error) => {
          this.loader = false;
          this.dialogRef.close(payload);
        }
      );
  }
}
