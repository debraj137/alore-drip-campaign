import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControlStatus, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { CampaignSettingService } from 'src/app/service/resource/campaign-setting.service';

@Component({
  selector: 'app-add-blocked-domain',
  templateUrl: './add-blocked-domain.component.html',
  styleUrls: [
    './add-blocked-domain.component.scss',
    '../../../../../../../assets/style/form-field.scss'
  ],
})
export class AddBlockedDomainComponent implements OnInit {
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
    }
  ];
  isDomainInValid: boolean = false;
  isDomainValid: boolean = false;
  submitLoader : boolean = false;

  formControl = this.fb.group({
    domain: [null, Validators.required],
    blockType: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private settingService: CampaignSettingService,
    public dialogRef: MatDialogRef<AddBlockedDomainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastNotification: ToastNotificationService
  ) {}

  ngOnInit(): void {
    this.formControl.get('domain')?.setValue(this.data.domain.split('@')[1] || '')
    const domainControl = this.formControl.controls['domain']
    domainControl.valueChanges.subscribe((value : string) => {
      const splittedValue = value.split('.')
      if(
        !value.includes('.') ||
        splittedValue[0].length < 1 ||
        splittedValue[1].length < 1 ||
        splittedValue.length <= 1
      ) {
        // domain must include '.'
        domainControl.setErrors({
          dotError : true
        })
      } else if (value.includes('@')) {
        // domain cannot include '@'
        domainControl.setErrors({
          atError : true
        })
      }
    })
  }
  
  addBlockedMail() {
    if (!this.submitLoader) {
      this.submitLoader = true;
      const payload = this.formControl.value;
      this.settingService
        .addBlockedDomain(payload.domain, payload.blockType.value, this.data?.campaignId)
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
                  'Domain already been added!',
                  '',
                  NotificationEnum.DANGER)
              }
          
          },
          (error) => {
            this.submitLoader = false;
          }
        );
    }
  }

  getControlValidation(controlName : string) {
    return this.formControl.get(controlName)?.errors
  }
}
