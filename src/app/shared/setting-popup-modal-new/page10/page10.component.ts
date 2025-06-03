import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingPopupModalNewComponent } from '../setting-popup-modal-new.component';
import { EmailIntegrationService } from 'src/app/service/resource/email-integration.service';
import { Router } from '@angular/router';

interface IIntegrationResult {
  result : string;
  data : any
}

@Component({
  selector: 'app-page10',
  templateUrl: './page10.component.html',
  styleUrls: ['./page10.component.scss']
})
export class Page10Component implements OnInit {

  @Output() pageAction = new EventEmitter<any>();
  @Input() nextStep: number = 0;
  @Input() prevStep: number = 0;
  @Input() campId: any = '';
  isIntegrated : boolean = false;
  constructor(
    public dialogRef: MatDialogRef<SettingPopupModalNewComponent>,
    public emailIntegrationService: EmailIntegrationService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  onIntegrationChanged(result : IIntegrationResult) {
    if (result.result === 'success'){
      this.isIntegrated = true;
      this.dialogRef.close();
      this.onSave()
    }
  }

  onSave() {
    this.pageAction.emit({
      page: this.nextStep,
      data : this.campId
    })

  }

  goToGuideLink(){
    window.open('setting/guide', "_blank");
  }

  goToGoogleGuide(){
    window.open('https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes', "_blank");
  }
}
