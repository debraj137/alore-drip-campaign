import { Component, Input, OnInit } from '@angular/core';
import { SideMenuTreeService } from 'src/app/service/core/side-menu-tree.service';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/service/core/layout.service';
import { IHomeSideBar } from 'src/app/model/tree-sidebar';
import { SettingPopupModalNewComponent } from '../setting-popup-modal-new/setting-popup-modal-new.component';
import { CreateNewCampaignBaseComponent } from '../create-new-campaign-base/create-new-campaign-base.component';
import { GetFavoriteService } from 'src/app/service/resource/get-favorite.service';
import { SidebarComponent } from 'src/app/layout/sidebar/sidebar.component';
import { ICampaignBaseItem } from 'src/app/model/campaign';
import { GetSharedByMeService } from 'src/app/service/resource/get-shared-by-me.service';
import { GetSharedWithMeService } from 'src/app/service/resource/get-shared-with-me.service';
import { MyCampaignBaseService } from 'src/app/service/resource/my-campaign-base.service';
import { url } from 'inspector';
import { URL } from 'url';

@Component({
  selector: 'app-tree-sidebar',
  templateUrl: './tree-sidebar.component.html',
  styleUrls: ['./tree-sidebar.component.scss'],
})
export class TreeSidebarComponent implements OnInit {

  @Input() parentData!: IHomeSideBar;
  @Input() treeItem!: IHomeSideBar;
  @Input() level!: number;
  @Input() calledFrom!: String;
  emptyScreen: boolean = false;
  selected: String = '';
  expanded: boolean = false;
  childLoader: boolean = false;

  constructor(
    public treeService: SideMenuTreeService,
    public layoutService: LayoutService,
    public campaignService: CampaignService,
    private router: Router,
    private dialog: MatDialog,
    private favData: GetFavoriteService,
    private getFavoriteService: GetFavoriteService,
    private getSharedByMeService: GetSharedByMeService,
    private getSharedWithMeService: GetSharedWithMeService,
    private mycampaignbase: MyCampaignBaseService,
    private activatedRote: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.emptyScreen = false;
    this.calledFrom == this.treeItem?.name;
    
    if (this.isActive(this.treeItem.name, this.treeItem.level)) {
      this.expanded = true
      this.getTreeChildData(true);
    }
  }
  getTreeChildData(isDataExist: boolean) {
    if (!isDataExist) {
      this.expanded = !this.expanded
      this.changeSidebarTree();
    }


    switch (this.treeItem.name) {
      case "Work Campaign Base":
        break;

      case "My Favorite":
        this.getFavourite()
        break;

      case "Shared with me":
        this.getSharedWithMe();
        break;

      case "Shared by me":
        this.getSharedByMe();
        break;

      case "My Campaign base":
        this.getMyCampaignBase();
        break;
      // temporary solution oga please fix this

      default:
        break;
    }
  }

  treeDataMappig(apiResp: any) {
    this.treeItem.childrens = apiResp.list.map((obj: ICampaignBaseItem) => {
      return {
        name: obj.campaignBase.campaignBaseName,
        data: obj.campaignBase,
        emoji: obj.campaignBase.emoji,
        level: 40,
        childrens: obj.campaignList.map((campaign: any) => {
          return {
            name: campaign.campaignName,
            emoji: campaign.emoji,
            data: campaign,
            level: 50,
          }
        })
      }
    })
  }

  pushCampaignToBase(tree: any) {
   
    if (!["Work Campaign Base","My Favorite","Shared with me","Shared by me","My Campaign base"].includes(tree.name) && tree.childrens.length == 0) {
      tree.loader = true;
      let baseId = tree.data.campaignBaseId;
      let flag = 0;
      this.campaignService.getBaseSpecificCampaignList(baseId, flag).subscribe((resp: any) => {
        if (resp.responseCodeJson.code === 200) {

          let campaignList: [] = resp.list.map((campaign: any) => {
            return {
              name: campaign.campaignName,
              emoji: campaign.emoji,
              data: { campaignId: campaign.campaignId },
              level: 50,
            }
          })
          let index = 0;
          tree.childrens = campaignList;
          tree.loader = false;

        }
      })
    }
  }

  getFavourite() {
    this.childLoader = true
    this.getFavoriteService.getFav().subscribe((res: any) => {
      if (res.responseCodeJson.code === 200) {
        this.childLoader = false
        if (res.list < 1) {
          this.emptyScreen = true;
        }
        this.treeDataMappig(res)
      }
    })
  }
  getSharedWithMe() {
    this.childLoader = true
    this.getSharedWithMeService.getSharedWithMe().subscribe((res: any) => {
      if (res.responseCodeJson.code === 200) {
        this.childLoader = false
        if (res.list < 1) {
          this.emptyScreen = true;
        }
        this.treeDataMappig(res)
      }
    })
  }

  getSharedByMe() {
    this.childLoader = true
    this.getSharedByMeService.getSharedByMe().subscribe((res: any) => {
      if (res.responseCodeJson.code === 200) {
        this.childLoader = false
        if (res.list < 1) {
          this.emptyScreen = true;
        }
        this.treeDataMappig(res)
      }
    })
  }

  getMyCampaignBase() {
    this.childLoader = true
    this.mycampaignbase.getCampaignBase().subscribe((res: any) => {
      if (res.responseCodeJson.code === 200) {
        this.childLoader = false
        if (res.list < 1) {
          this.emptyScreen = true;
        }
        this.treeDataMappig(res)
      }
    })
  }


  changeSidebarTree() {
    if (this.parentData) {
      this.treeService.changeActiveTree({
        name: this.parentData.name,
        level: this.parentData.level
      })
    }
    this.treeService.changeActiveTree({
      name: this.treeItem.name,
      level: this.treeItem.level
    })
  }

  verifyCampaignReciepe(campaignData: IHomeSideBar) {
    const baseCampaignId = this.parentData.data.campaignBaseId
    const campaignId = campaignData.data.campaignId

    if (!this.treeService.campaignLoader.value) {
      this.treeService.campaignLoader.next(campaignId)
      this.campaignService.getCurrentCampaignSettings(
        campaignId
      ).subscribe((res: any) => {
        const completionStatus: number = res.object.completionStatus;
        this.treeService.campaignLoader.next('')
        // if user didnt complete their setting before creating campaign,
        // it will continue from previous step, else it will redirect to campaign detail
        if (completionStatus <= 7) {
          this.openSettingDialog(completionStatus + 1, campaignId, res.object)
        } else {
          const campaignId = campaignData.data.campaignId
          this.treeService.changeActiveTree({
            name: this.treeItem.name,
            level: 50,
            id: campaignId
          })
          this.treeService.changeActiveTree({
            name: this.parentData.name,
            level: this.parentData.level
          })
          if (this.checkCurrentPage(baseCampaignId, campaignId)) {
            localStorage.removeItem('campaignTab')
            this.router.navigateByUrl(
              'campaign-Details/' + baseCampaignId + '/campaign-item-detail/' + campaignId
            )
            setTimeout(() => {
              this.layoutService.tickCampaignDetail.next(true)
            }, 10);
          }
        }
      })
    }
  }

  checkCurrentPage(baseCampaignId: string, campaignId: string): boolean {
    return this.router.url != '/campaign-Details/' + baseCampaignId + '/campaign-item-detail/' + campaignId;
  }

  openSettingDialog(step: number, campaignId: string, submittedData: any) {
    const dialog = this.dialog.open(SettingPopupModalNewComponent, {
      backdropClass: 'backdrop-background',
      data: {
        isSingleStep: false,
        activeStep: step === 1 ? step + 1 : step - 1, // prevent user inputing form step 1
        submittedData: submittedData,
        campaignId
      }
    });
  }


  openCreateBaseCampaignDialog() {
    if (this.treeItem.name === "Work Campaign Base") {
      const dialogRef = this.dialog.open(CreateNewCampaignBaseComponent, {
        data: {
          type: 'base',
          parentType: 0
        },
        backdropClass: 'backdrop-background',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'success') {
          this.treeService.tickSideMenu.next(true)
        }
      });
    }
  }

  emptyState() {
    this.changeSidebarTree()
    switch (this.treeItem.name) {
      case "Work Campaign Base":
        this.selected = "Work Campaign Base"
        this.router.navigateByUrl('');
        break;

      case "My Favorite":
        this.selected = "My Favorite"

        this.router.navigateByUrl('fav');
        this.favData.getFav().subscribe((x) => {
          this.treeItem
        });
        break;

      case "Shared with me":
        this.selected = "Shared with me"
        this.router.navigateByUrl('sharedWithMe');
        break;

      case "Shared by me":
        this.selected = "Shared by me"
        this.router.navigateByUrl('sharedByMe');
        break;

      case "My Campaign base":
        this.selected = "My Campaign base"
        this.router.navigateByUrl('myCampaignBase');
        break;

      // temporary solution oga please fix this

      default:
        switch (this.calledFrom) {
          case "Work Campaign Base":
            this.router.navigateByUrl('');
            break;

          case "My Favorite":
            this.router.navigateByUrl('fav');
            break;

          case "Shared with me":
            this.router.navigateByUrl('sharedWithMe');
            break;

          case "Shared by me":
            this.router.navigateByUrl('sharedByMe');
            break;

          case "My Campaign base":
            this.router.navigateByUrl('myCampaignBase');
            break;

          default:
            break;
        }
        break;
    }
  }

  get getActiveCampaign(): string[] {
    const activeTree = this.treeService.activeCampaign
    let treeItem: string[] = []
    Object.keys(activeTree).forEach((value: string) => {
      if (activeTree[value].id) {
        treeItem.push(activeTree[value].name + '_' + activeTree[value].level + '_' + activeTree[value].id)
      } else {
        treeItem.push(activeTree[value].name + '_' + activeTree[value].level)
      }
    })
    return treeItem
  }

  isActive(name: string, level: number, id?: string) {
    let filteredData: any
    if (id) {
      filteredData = this.getActiveCampaign.includes(name + '_' + level + '_' + id)
    } else {
      filteredData = this.getActiveCampaign.includes(name + '_' + level)
    }
    return filteredData
  }
}
