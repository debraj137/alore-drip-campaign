import { AnalyticsService } from './../../service/resource/analytics.service';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SideMenuTreeService } from 'src/app/service/core/side-menu-tree.service';

@Component({
  selector: 'app-mail-detail',
  templateUrl: './mail-detail.component.html',
  styleUrls: ['./mail-detail.component.scss'],
})
export class MailDetailComponent implements OnInit {

  breadcrumbData: any[] = [];
  baseId: any;
  campaignId: any;
  mailId: any;
  personalizedEmailId: any;
  mailName: any;
  currentBaseName: any;
  currentCampaignName: any;
  currentEmailEmoji: any;
  currentTemplateStatus: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private campaignService: CampaignService,
    private analyticsService: AnalyticsService,
    private treeService: SideMenuTreeService,
  ) { }

  ngOnInit(): void {
    this.baseId = this.activatedRoute.snapshot.paramMap.get('baseid');
    this.campaignId = this.activatedRoute.snapshot.paramMap.get('campaignId');
    this.mailId = this.activatedRoute.snapshot.paramMap.get('emailName');
    this.personalizedEmailId = this.activatedRoute.snapshot.paramMap.get("mailId")
    this.getCurrentCampaignDetails(this.campaignId);
    this.getCurrentMailDetails();
  }

  getCurrentMailDetails() {
    this.analyticsService.getPersonalizedEmailReport(this.campaignId).then(
      (response: any) => {
        const value = response.list.forEach((element: any) => {
          if (element.emailName == this.mailId) {
            this.currentTemplateStatus = element.status;
            this.mailName = element.emailId;
            this.currentEmailEmoji = element.emoji;
          }
        });
      });
  }



  getCurrentCampaignDetails(campId: string) {
    this.campaignService.getCurrentCampaignDetails(campId).subscribe((res: any) => {
      this.currentCampaignName = res.object.campaignName;
      this.getCurrentBaseDetails(this.baseId);
    });
  }

  getCurrentBaseDetails(id: any) {
    this.campaignService.getCurrentBaseDetails(id).subscribe((res: any) => {
      this.currentBaseName = res.object.campaignBaseName;
      let level_30 = {
        name: "Work Campaign Base",
        link:''
      }
    
      if(this.treeService.getRootLink != null){
        level_30 = this.treeService.getRootLink
      }
     
      if (res.responseCodeJson.code === 200) {
        this.breadcrumbData = [
          {
            ...level_30
          },
          {
            name: this.currentBaseName,
            link: '/campaign-Details/' + this.baseId,
          },
          {
            name: this.currentCampaignName,
            link: '/campaign-Details/' + this.baseId + '/campaign-item-detail/' + this.campaignId,
          },
          {
            name: this.mailId,
            link: '/campaign-Details/' + this.baseId + '/campaign-item-detail/' + this.campaignId + '/mail-detail/' + this.mailId + '/mailId/' + this.personalizedEmailId,
          },
        ];
      }
    });
  }
}
