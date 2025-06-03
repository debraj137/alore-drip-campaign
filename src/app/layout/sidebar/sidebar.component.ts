import { Component, OnInit } from '@angular/core';
import { SideMenuTreeService } from 'src/app/service/core/side-menu-tree.service';
import { LayoutService } from 'src/app/service/core/layout.service';
import { MatDialog } from '@angular/material/dialog';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { IBaseList, IHomeSideBar, } from 'src/app/model/tree-sidebar';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { CreateNewCampaignBaseComponent } from 'src/app/shared/create-new-campaign-base/create-new-campaign-base.component';
import { CommonService } from 'src/app/service/core/common.service';
import { ICampaignBaseItem, ICampaignItem } from 'src/app/model/campaign';
import { Router } from '@angular/router';
import { SearchCampaignComponent } from 'src/app/pages/search-campaign/search-campaign.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  oldX = 0;
  width = 291;

  treeData: IHomeSideBar[] = [
    {
      name: 'Work Campaign Base',
      level: 30,
      childrens: [],

    },
    {
      name: 'My Favorite',
      level: 30,
      childrens: []
    },
    {
      name: 'Shared with me',
      level: 30,
      childrens: []
    },
    {
      name: 'Shared by me',
      level: 30,
      childrens: []
    },
    {
      name: 'My Campaign base',
      level: 30,
      childrens: []
    },
  ]
  treeLoader: boolean = false;
  customBase: IBaseList[] = [];

  constructor(
    public layoutService: LayoutService,
    public treeService: SideMenuTreeService,
    private campaignService: CampaignService,
    private commonService: CommonService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.layoutService.sidebar.next(false);
  }

  get getNavStatus(): Boolean {
    let bool = this.layoutService.getSidebarStatus;
    return bool;
  }

  ngOnInit(): void {
    this.treeService.tickSideMenu.subscribe((data) => {
      this.getTreeData();
    });
  }

  getIcon(type: string): string {
    return this.commonService.getIcon(type);
  }
  openArchive() {
    this.router.navigateByUrl('archive');
  }

  openTrash() {
    this.router.navigateByUrl('trash');
  }

  getTreeData() {
    this.treeLoader = true
    this.campaignService.getAllBaseCampaignsList().subscribe((res: any) => {
      this.treeLoader = false;
      if (res.responseCodeJson.code === 200) {
        this.treeData[0].childrens = res.list.map((obj: any) => {
          return {
            name: obj.campaignBaseName,
            data: { campaignBaseId: obj.campaignBaseId },
            emoji: obj.emoji,
            level: 40,
            childrens: []
          }
        })
      }
    });
  }

  

  move(event: CdkDragMove) {
    if (event.distance.x >= 1) {
      this.oldX = this.oldX < 0 ? 0 : this.oldX;
      this.width += event.distance.x - this.oldX;
    } else {
      this.oldX = this.oldX > 0 ? 0 : this.oldX;
      this.width += event.distance.x - this.oldX;
    }
    this.oldX = event.distance.x;
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(CreateNewCampaignBaseComponent, {
      data: {
        type: 'base',
      },
      backdropClass: 'backdrop-background',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.getTreeData();
      }
    });
  }

  openSearchCampaign() {
    const dialogRef = this.dialog.open(SearchCampaignComponent, {
      backdropClass: 'backdrop-background',
      autoFocus: true,
      //  restoreFocus: true,
    })
  }

  onDragEnded(event: any) {
    console.log(event.pageX);
    console.log(event.pageY);

    event.pageX = 500;
    console.log(event.pageX);
    console.log(event)
  }



}
