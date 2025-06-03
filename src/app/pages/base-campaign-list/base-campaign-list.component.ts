import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICampaignBaseDetail, ICampaignBaseItem } from 'src/app/model/campaign';
import { SideMenuTreeService } from 'src/app/service/core/side-menu-tree.service';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { FaqService } from 'src/app/service/resource/faq.service';
import { CreateNewCampaignBaseComponent } from 'src/app/shared/create-new-campaign-base/create-new-campaign-base.component';
import { SearchCampaignComponent } from '../search-campaign/search-campaign.component';



@Component({
  selector: 'app-base-campaign-list',
  templateUrl: './base-campaign-list.component.html',
  styleUrls: [
    './base-campaign-list.component.scss'
  ]
})
export class BaseCampaignListComponent implements OnInit {

  @Input() baseCampaignDetail!: ICampaignBaseDetail;
  @Output() refreshBaseCampaign = new EventEmitter<boolean>(false);

  parentName: String = "";
  baseCampaignList: ICampaignBaseItem[] = [];
  breadcrumbData: any[] = [];
  emptyMsg: boolean = false;
  loading: boolean = true;
  baseCampaignId: string = ''
  page: number = 0;
  scrollData: boolean = false;

  successValue: boolean = false;
  errorValue: boolean = false;
  disabledButton: boolean = false;



  constructor(
    private dialog: MatDialog,
    private campaignService: CampaignService,
    private activatedRote: ActivatedRoute,
    private faqService: FaqService,
    private treeService: SideMenuTreeService,
  ) {

  }

  ngOnInit(): void {
    this.faqService.setPageNumber(0);
    this.baseCampaignId = this.activatedRote.snapshot.paramMap.get('baseid') || ''

    
    if (this.baseCampaignId) {
      this.getBaseCampaignDetail(this.baseCampaignId)
      this.getParentDetail();
    } 
    else {
      this.treeService.changeActiveTree({
        name: '',
        level: 40
      })
      this.treeService.changeActiveTree({
        name: '',
        level: 50
      })

      this.getAllBase();
      this.campaignService.setParentDetail(0);
      this.breadcrumbData = [
        {
          name: 'Home',
          link: '/',
        },
        {
          name: "Work Campaign Base",
          link: '/'
        },
      ];
      this.parentName = "Work Campaign Base"
    }
  }


  getParentDetail() {
    // switch (this.campaignService.parentDetail) {
    //   case 0:
    //     this.breadcrumbData = [
    //       {
    //         name: 'Home',
    //         link: ''
    //       },
    //       {
    //         name: 'Work Campaign Base',
    //         link: '/'
    //       }
    //     ];
    //     this.parentName = "Work Campaign Base"
    //     break;
    //   case 1:
    //     this.breadcrumbData = [
    //       {
    //         ...this.treeService.getRootLink
    //       },
    //       {
    //         name: 'My Favorite',
    //         link: '/fav'
    //       },
    //     ];
    //     this.parentName = "My Favorite"
    //     break;
    //   case 2:
    //     this.breadcrumbData = [
    //       {
    //         ...this.treeService.getRootLink
    //       },
    //       {
    //         name: 'Shared with me',
    //         link: '/sharedWithMe'
    //       },
    //     ];
    //     this.parentName = "Shared with Me"
    //     break;
    //   case 3:
    //     this.breadcrumbData = [
    //       {
    //         ...this.treeService.getRootLink
    //       },
    //       {
    //         name: 'Shared by me',
    //         link: '/sharedByMe'
    //       },
    //     ];
    //     this.parentName = "Shared By Me"
    //     break;
    //   case 4:
    //     this.breadcrumbData = [
    //       {
    //         name: 'Home',
    //         link: '/'
    //       },
    //       {
    //         name: 'My Campaign Base',
    //         link: '/myCampaignBase'
    //       },
    //       {
    //         name: this.treeService.activeCampaign.level_40.name,
    //         link: '/campaign-Details/' + this.baseCampaignId
    //       },
    //     ];
    //     this.parentName = "My Campaign Base"
    //     break;
    //   case 5:
    //     this.breadcrumbData = [
    //       {
    //         name: 'Home',
    //         link: '/archive',
    //       },
    //       {
    //         name: 'Archive',
    //         link: '/archive'
    //       },
    //     ];
    //     this.parentName = "Archive"
    //     break;
    //   default:
    //     break;
    // }
  }

  getBaseCampaignDetail(baseId: string) {
    this.campaignService.getCampaignBaseDetail(baseId)
      .subscribe((res: any) => {
        this.loading = false;
        if (
          res.baseCampaignDetail.responseCodeJson.code === 200 &&
          res.campaignList.responseCodeJson.code === 200
        ) {
          
          this.baseCampaignList.push({
            campaignBase: res.baseCampaignDetail.object,
            campaignList: res.campaignList.list
          })

          // if (this.campaignService.parentDetail == 0) {

            let level_30_name = localStorage.getItem('currentActiveFolder')
            let parent = level_30_name?.slice(1, level_30_name.length-1)

            if (level_30_name === null || level_30_name === undefined || level_30_name === '')
              level_30_name = "Work Campaign Base";

            setTimeout(() => {
              this.breadcrumbData = [
                {
                  name: 'Home',
                  link:''
                },
                {
                  name: parent,
                  link: ''
                },
                {
                  name: res.baseCampaignDetail.object.campaignBaseName,
                  link: '/campaign-Details/' + this.baseCampaignId
                }
              ];
  
            }, 1500)
           
            this.parentName = parent || ''

          
        }
      });
  }



  getAllBase() {
    this.page = 0;
    this.campaignService.getAllBaseCampaigns(this.page).subscribe(
      (res: any) => {

        this.loading = false;
        if (res.responseCodeJson.code === 200) {
          this.baseCampaignList = res.list;
          this.page++;

          if (this.baseCampaignList.length < 1) {
            this.emptyMsg = true;
          }
        }
      });
  }

  onScroll() {
    // this.scrollData = false;
    this.scrollData = true;
    this.campaignService.getAllBaseCampaigns(this.page).subscribe(
      (res: any) => {

        if (res.responseCodeJson.code === 200) {

          this.baseCampaignList.push(...res.list);
          this.page++;

          setTimeout(() => {
            this.scrollData = false;
          }, 1000)
        }
      });
  }


  openCreateBaseModal() {
    const dialogRef = this.dialog.open(CreateNewCampaignBaseComponent, {
      data: {
        type: 'base',
        baseCampaignId: this.baseCampaignId,
        parentType: this.campaignService.parentDetail === 0 ? 0 : 1
      },
      backdropClass: 'backdrop-background',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.getAllBase();
      }

    });
  }

  openCreateCampaignModal(isEdit: boolean) {
    const dialogRef = this.dialog.open(CreateNewCampaignBaseComponent, {
      data: {
        type: isEdit ? 'base-edit' : 'campaign',
        baseCampaignId: this.baseCampaignId,
        data: isEdit ? this.baseCampaignDetail : null
      },
      backdropClass: 'backdrop-background',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.refreshBaseCampaign.emit(true)
    });
  }



}
