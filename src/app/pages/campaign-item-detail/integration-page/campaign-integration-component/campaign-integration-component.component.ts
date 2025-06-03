import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

interface IIntegrationResult {
  result : string;
  data : any
}

@Component({
  selector: 'app-campaign-integration-component',
  templateUrl: './campaign-integration-component.component.html',
  styleUrls: ['./campaign-integration-component.component.scss']
})
export class CampaignIntegrationComponentComponent implements OnInit {

  campaignId : string = ''

  constructor(
    private route : ActivatedRoute,
    public dialogRef : MatDialogRef<CampaignIntegrationComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  
    if(this.data?.campaignId) {
      this.campaignId = this.data.campaignId
    }
  }

  onIntegrationChanged(result : IIntegrationResult) {
    if (result.result === 'success'){
      this.dialogRef.close(result.data)
    }
  }

  goToGuideLink(){
    window.open('setting/guide', "_blank");
  }

  goToGoogleGuide(){
    window.open('https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes', "_blank");
  }
}
