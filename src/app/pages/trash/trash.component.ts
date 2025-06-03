import { Component, OnInit } from '@angular/core';
import {TrashService} from "../../service/resource/trash.service";
import {CampaignService} from "../../service/resource/campaign.service";
import {ICampaignBaseItem} from "../../model/campaign";



@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  breadcrumbData: any[] = [];
  baseCampaignList: ICampaignBaseItem[] = [];
  emptyMsg: boolean = false;
  loading: boolean = true;

  constructor(
    private trashService: TrashService,
    private campaignService: CampaignService,
    
  ) { }

  ngOnInit(): void {
    this.getAllTrash();
    this.breadcrumbData = [
      {
        name: 'Home',
        link: '',
      },
      {
        name: 'Trash',
        link: '/trash'
      },
    ];
  }

  getAllTrash() {

    this.trashService.getTrash().subscribe((res: any) => {
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
