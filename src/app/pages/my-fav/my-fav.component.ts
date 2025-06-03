import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICampaignBaseItem } from 'src/app/model/campaign';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { GetFavoriteService } from 'src/app/service/resource/get-favorite.service';
import { CreateNewCampaignBaseComponent } from 'src/app/shared/create-new-campaign-base/create-new-campaign-base.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchCampaignComponent } from '../search-campaign/search-campaign.component';



@Component({
  selector: 'app-my-fav',
  templateUrl: './my-fav.component.html',
  styleUrls: ['./my-fav.component.scss']
})
export class MyFavComponent implements OnInit {

  @Output() refreshBaseCampaign = new EventEmitter<boolean>(false);

  baseCampaignId : string = ''
  breadcrumbData: any[] = [];
  baseCampaignList: ICampaignBaseItem[] = [];
  emptyMsg: boolean = false;
  loading: boolean = true;
  baseCampaignDetail: any;

  successValue: boolean = false;
  errorValue: boolean = false;
  disabledButton: boolean = false;
  
  
  constructor(
    private favData: GetFavoriteService,
    private campaignService: CampaignService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.campaignService.setParentDetail(1);
    this.getAllFav()
    this.breadcrumbData = [
      {
        name: 'Home',
        link: '',
      },
      {
        name: 'My Favorite',
        link: '/fav'
      },
    ];
  }

  getAllFav() {

    this.favData.getFav().subscribe((res: any) => {
      this.loading = false;
      if (res.responseCodeJson.code === 200) {
        this.baseCampaignList = res.list;
        if (this.baseCampaignList.length < 1) {
          this.emptyMsg = true;
        }
      }
    })
  }
  openCreateCampaignModal(isEdit : boolean) {

    const dialogRef = this.dialog.open(CreateNewCampaignBaseComponent, {
      data: {
        type: isEdit ? 'base-edit' : 'campaign',
        baseCampaignId: this.baseCampaignId,
        data: isEdit ? this.baseCampaignDetail : null
      },
      backdropClass: 'backdrop-background',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.refreshBaseCampaign.emit(true)
    });
  }

  openSearchCampaign() {
    const dialogRef = this.dialog.open(SearchCampaignComponent, {
     backdropClass: 'backdrop-background',
    }) 
 }
}
