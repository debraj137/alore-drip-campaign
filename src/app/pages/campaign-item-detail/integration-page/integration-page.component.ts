import { CampaignService } from 'src/app/service/resource/campaign.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CampaignIntegrationComponentComponent } from './campaign-integration-component/campaign-integration-component.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-integration-page',
  templateUrl: './integration-page.component.html',
  styleUrls: ['./integration-page.component.scss']
})
export class IntegrationPageComponent implements OnInit {

  @Output() integrationChanged = new EventEmitter<any>();
  campaignId : string = ''

  constructor(
    private dialog:MatDialog,
    private campignService : CampaignService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.campaignId = this.activatedRoute.snapshot.paramMap.get('campaignId') || '';
    
  }
  openIntegrateModal() {
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
}
