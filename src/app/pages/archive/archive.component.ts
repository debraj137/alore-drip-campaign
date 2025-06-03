import { Component, OnInit } from '@angular/core';
import { ICampaignBaseItem } from 'src/app/model/campaign';
import { ArchiveServiceService } from 'src/app/service/resource/archive-service.service';
import { CampaignService } from 'src/app/service/resource/campaign.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  breadcrumbData: any[] = [];
  baseCampaignList: ICampaignBaseItem[] = [];
  emptyMsg: boolean = false;
  loading: boolean = true;

  constructor(
    private campaignService: CampaignService,
    private archiveServiceService: ArchiveServiceService
  ) { }

  ngOnInit(): void {
    this.getArchieve()
    this.campaignService.setParentDetail(5);

    this.breadcrumbData = [
      {
        name: 'Home',
        link: '',
      },
      {
        name: 'Archive',
        link: '/archive'
      },
    ];
  }
  getArchieve() {

    this.archiveServiceService.getArchieve().subscribe((res: any) => {
      this.loading = false;
      if (res.responseCodeJson.code === 200) {
        this.baseCampaignList = res.list;
        if (this.baseCampaignList.length < 1) {
          this.emptyMsg = true;
        }
      }
    })
  }

}
