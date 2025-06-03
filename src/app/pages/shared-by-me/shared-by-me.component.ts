import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICampaignBaseItem } from 'src/app/model/campaign';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { GetSharedByMeService } from 'src/app/service/resource/get-shared-by-me.service';
import { SearchCampaignComponent } from '../search-campaign/search-campaign.component';

@Component({
  selector: 'app-shared-by-me',
  templateUrl: './shared-by-me.component.html',
  styleUrls: ['./shared-by-me.component.scss']
})
export class SharedByMeComponent implements OnInit {

  breadcrumbData: any[]=[];
  baseCampaignList: ICampaignBaseItem[]=[];
  emptyMsg: boolean = false;
  loading: boolean = true;

  successValue: boolean = false;
  errorValue: boolean = false;
  disabledButton: boolean = false;
  
  constructor(
    private sharedbyme: GetSharedByMeService,
    private campaignService: CampaignService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getSharedByMe()
    this.campaignService.setParentDetail(3);

    this.breadcrumbData = [
      {
        name: 'Home',
        link: '',
      },
      {
        name: 'Shared by me',
        link: '/sharedByMe'
      },
    ];

  }

  getSharedByMe(){

    this.sharedbyme.getSharedByMe().subscribe((res:any) => {
      this.loading = false;
      if (res.responseCodeJson.code === 200) {
        this.baseCampaignList = res.list;
        if (this.baseCampaignList.length < 1) {
          this.emptyMsg = true;
        }
      }
    })
  }

  openSearchCampaign() {
    const dialogRef = this.dialog.open(SearchCampaignComponent, {
     backdropClass: 'backdrop-background',
    }) 
 }

}
