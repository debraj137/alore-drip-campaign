import { ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { Component, Input, OnInit } from '@angular/core';
import { IMailData, IMailSequenceDetail } from 'src/app/model/mail-sequence';
import { FaqService } from 'src/app/service/resource/faq.service';

@Component({
  selector: 'app-campaign-item-tabs-mail-sequence',
  templateUrl: './campaign-item-tabs-mail-sequence.component.html',
  styleUrls: ['./campaign-item-tabs-mail-sequence.component.scss']
})
export class CampaignItemTabsMailSequenceComponent implements OnInit {

  @Input() campaignName!: string;
  loader : boolean = true;
  campaignId: string = '';
  baseId: string = '';
  currentCampaignDetails!: IMailSequenceDetail;
  mailSequenceData: IMailData[] = [];


  constructor(
    private campaignService : CampaignService,
    private activatedRoute : ActivatedRoute,
    private faqService:FaqService
  ) { }

  ngOnInit(): void {
    this.faqService.setPageNumber(4);
    this.baseId = this.activatedRoute.snapshot.paramMap.get('baseid') || '';
    this.campaignId = this.activatedRoute.snapshot.paramMap.get('campaignId') || '';
    this.getMailSequenceData()
  }

  getMailSequenceData() {
    this.getCampaignMailSequence(this.campaignId);
    this.getCurrentCampignSettings(this.campaignId);
  }

  getCampaignMailSequence(campId:any){
    this.campaignService.getCampaignMailSequence(campId).subscribe(
      (res:any)=>{
        this.mailSequenceData = res.list.map((obj : any) => {
          return {
            ...obj,
            expand: true,
          }
        });
      }
    )
  }
  getCurrentCampignSettings(campid:any){
    this.loader = true
    this.campaignService.getCurrentCampaignSettings(campid).subscribe(
      (res:any)=>{
        this.loader = false
        this.currentCampaignDetails = res.object;
      }
    )
  }
}
