import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICampaignBaseItem } from 'src/app/model/campaign';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { GetSharedWithMeService } from 'src/app/service/resource/get-shared-with-me.service';
import { SearchCampaignComponent } from '../search-campaign/search-campaign.component';

@Component({
  selector: 'app-shared-with-me',
  templateUrl: './shared-with-me.component.html',
  styleUrls: ['./shared-with-me.component.scss']
})
export class SharedWithMeComponent implements OnInit {

  breadcrumbData: any[]=[];
  baseCampaignList: ICampaignBaseItem[]=[];
  emptyMsg: boolean = false;
  loading: boolean = true;


  successValue: boolean = false;
  errorValue: boolean = false;
  disabledButton: boolean = false;
  

  constructor(
    private sharedwithme: GetSharedWithMeService,
    private campaignService: CampaignService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
this.getSharedWithMe()
    this.campaignService.setParentDetail(2);

    this.breadcrumbData = [
      {
        name: 'Home',
        link: '',
      },
      {
        name: 'Shared with me',
        link: '/sharedWithMe'
      },
    ];
  }

  getSharedWithMe(){

    this.sharedwithme.getSharedWithMe().subscribe((res:any) => {
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
