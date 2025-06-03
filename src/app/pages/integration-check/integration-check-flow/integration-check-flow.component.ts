
import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from 'src/app/service/resource/user-profile.service';
import { CampaignIntegrationComponentComponent } from '../../campaign-item-detail/integration-page/campaign-integration-component/campaign-integration-component.component';

@Component({
  selector: 'app-integration-check-flow',
  templateUrl: './integration-check-flow.component.html',
  styleUrls: ['./integration-check-flow.component.scss']
})
export class IntegrationCheckFlowComponent implements OnInit {
  @Output() integrationChanged = new EventEmitter<boolean>(false);


  integratedUserList: any[] = [];
  campaignId!: string;
  isListLoaded: boolean = false;
  campId: any;
  baseId: any;
  list: any;

  constructor(
    public dialogRef : MatDialogRef<IntegrationCheckFlowComponent>,
    private userData : UserProfileService,
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.campaignId = this.activeRoute.snapshot.paramMap.get('campaignId') || '';
    this.baseId = localStorage.getItem('baseId')
    this.getIntegratedUserData();
  }


  getIntegratedUserData() {
    this.userData.getIntegrationUser(this.baseId).subscribe((resp:any) => {
    
      if(resp.responseCodeJson.code === 200) {
        this.integratedUserList = resp.list;
        this.isListLoaded = true;
      }
    })
  }

  openGmailModal() {
    this.dialogRef.close();
    const dialog = this.dialog.open(CampaignIntegrationComponentComponent, {
      backdropClass: 'backdrop-background',
      data: {
        campaignId : this.campaignId
      }
    });
    dialog.afterClosed().subscribe((result : any) => {
      if (result?.accessToken) {
        this.integrationChanged.emit(result)
      }
    })
  }

  clickIndex(singleObj: number) {
    this.campId = localStorage.getItem("campaignId");
    this.list = singleObj
    this.list.campaignId = this.campId;
    this.list.id = "";

    this.userData.addAllIntegration(this.list).subscribe((resp) => {
      window.location.reload();
    })

  }

}
