import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControlStatus, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { CampaignSettingService } from 'src/app/service/resource/campaign-setting.service';

@Component({
  selector: 'app-add-blocked-mail',
  templateUrl: './add-blocked-mail.component.html',
  styleUrls: [
    './add-blocked-mail.component.scss',
    '../../../../../../../assets/style/form-field.scss'
  ],
})
export class AddBlockedMailComponent implements OnInit {
  blockType: any[] = [
    {
      value: '1',
      label: 'For this campaign',
      subLabel: 'No emails will be sent for this campaign',
      icon: 'target-small',
    },
    {
      value: '2',
      label: 'For all campaigns',
      subLabel: 'No email will be sent from any campaigns',
      icon: 'planet',
    },
  ];
  isEmailInValid: boolean = false;
  isEmailValid: boolean = false;
  showDropdown: boolean = false;
  submitLoader : boolean = false;

  formControl = this.fb.group({
    email: [null, [Validators.required]],
    blockType: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private settingService: CampaignSettingService,
    public dialogRef: MatDialogRef<AddBlockedMailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastNotification: ToastNotificationService
  ) {}

  ngOnInit(): void {
    this.formControl.get('email')?.setValue(this.data.emailId|| '')
    const emailControl = this.formControl.controls['email'];
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

  addBlockedMail() {
    if (!this.submitLoader) {
      this.submitLoader = true;
      const payload = this.formControl.value;
      this.settingService
        .addBlockedEmail(payload.email, payload.blockType?.value, this.data.campaignId)
        .subscribe(
          (resp: any) => {
            this.submitLoader = false;
            if (resp?.responseCodeJson?.code === 200) {
              this.toastNotification.addNotification(
                'Yeah! you just blocked them!',
                ``,
                NotificationEnum.INFO
              )
              this.dialogRef.close('success');
            }

            if (resp?.responseCodeJson?.code === 409) {
              this.toastNotification.addNotification(
                'Mail has already been added to block list!!',
                ``,
                NotificationEnum.DANGER
              )
              this.dialogRef.close('success');
            }
          },
          (error) => {
            this.submitLoader = false;
          }
        );
    }
  }

  dropdownHandler() {
    this.showDropdown = !this.showDropdown;
  }

  getControlError(controlName : string) {
    this.formControl.controls[controlName].errors
  }
}
