import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-item-tabs-analytics',
  templateUrl: './campaign-item-tabs-analytics.component.html',
  styleUrls: ['./campaign-item-tabs-analytics.component.scss']
})
export class CampaignItemTabsAnalyticsComponent implements OnInit {

  baseId : string = ''
  campaignId : string = ''

  tabLayoutActive: number = 0;


  constructor(
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.baseId = this.activatedRoute.snapshot.paramMap.get('baseid') || '';
    this.campaignId = this.activatedRoute.snapshot.paramMap.get('campaignId') || '';
  }

  onTabLayoutClick(index: number): void {
    this.tabLayoutActive = index;
  }

}
