import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICampaignBaseDetail, ICampaignBaseItem } from 'src/app/model/campaign';
import { CommonService } from 'src/app/service/core/common.service';
import { SideMenuTreeService } from 'src/app/service/core/side-menu-tree.service';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { MyCampaignBaseService } from 'src/app/service/resource/my-campaign-base.service';
import { CreateNewCampaignBaseComponent } from 'src/app/shared/create-new-campaign-base/create-new-campaign-base.component';
import { SearchCampaignComponent } from '../search-campaign/search-campaign.component';


interface IDialogData {
  type: string;
  campaignList: any[];
  baseCampaignId?: string;
}
@Component({
  selector: 'app-my-campaign-base',
  templateUrl: './my-campaign-base.component.html',
  styleUrls: ['./my-campaign-base.component.scss']
})
export class MyCampaignBaseComponent implements OnInit {

  @Input() baseCampaignDetail!: ICampaignBaseDetail;
  @Output() refreshBaseCampaign = new EventEmitter<boolean>(false);

  baseCampaignId: string = ''
  breadcrumbData: any[] = [];
  baseCampaignList: ICampaignBaseItem[] = [];
  emptyMsg: boolean = false;
  loading: boolean = true;

  successValue: boolean = false;
  errorValue: boolean = false;
  disabledButton: boolean = false;

  constructor(

    private mycampaignbase: MyCampaignBaseService,
    private dialog: MatDialog,
    private campaignService: CampaignService,
  ) { }

  ngOnInit(): void {
    this.campaignService.setParentDetail(4);
    this.getCampaignBase();

    this.breadcrumbData = [
      {
        name: 'Home',
        link: '/myCampaignBase',
      },
      {
        name: 'My Campaign Base',
        link: '/myCampaignBase'
      },
    ];
  }

  getCampaignBase() {
    this.mycampaignbase.getCampaignBase().subscribe((res: any) => {
      this.loading = false;
      if (res.responseCodeJson.code === 200) {
        this.baseCampaignList = res.list;
        if (this.baseCampaignList.length < 1) {
          this.emptyMsg = true;
        }
      }
    })
  }



  openCreateBaseModal() {
    const dialogRef = this.dialog.open(CreateNewCampaignBaseComponent, {
      data: {
        type: 'base',
        baseCampaignId: this.baseCampaignId
      },
      backdropClass: 'backdrop-background',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'success') {
        this.getCampaignBase();
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

  openSearchCampaign() {
    const dialogRef = this.dialog.open(SearchCampaignComponent, {
      backdropClass: 'backdrop-background',
    })
  }
}
