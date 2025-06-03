import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/service/core/layout.service';
import { SideMenuTreeService } from 'src/app/service/core/side-menu-tree.service';
import { CampaignService } from 'src/app/service/resource/campaign.service';

@Component({
  selector: 'app-email-editor-sidebar',
  templateUrl: './email-editor-sidebar.component.html',
  styleUrls: ['./email-editor-sidebar.component.scss']
})
export class EmailEditorSidebarComponent implements OnInit {

  campaignId: string = ''

  constructor(
    public layoutService: LayoutService,
    public SideMenuTreeService: SideMenuTreeService,
    private campaignService: CampaignService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.campaignId = this.route.url.split('/')[4]
    
  }

  addEmail() {
    this.campaignService.createMailSequence(
      this.campaignId,
      this.SideMenuTreeService.currentTemplateList.value.length  + 1
    ).subscribe((resp) => {
      this.SideMenuTreeService.refreshEmailEditor.next(true)
    })
  }

  clikedOnEmail(item : any) {
    this.SideMenuTreeService.currentSelectedEmail.next({
      body: item.body,
      subject: item.subject,
      personalizedEmailId: item.personalizedEmailId
    })
    this.SideMenuTreeService.mailChanged.next(true)
  }

  get getNavStatus() {
    let bool: Boolean = this.layoutService.getSidebarStatus;
    return bool;
  }

}
