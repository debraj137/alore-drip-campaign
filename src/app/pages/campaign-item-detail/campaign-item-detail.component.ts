import { EmailIntegrationService } from 'src/app/service/resource/email-integration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, SimpleChange } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICampaignTabs } from 'src/app/model/campaign';
import { CreateTagsComponent } from 'src/app/shared/create-tags/create-tags.component';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { LayoutService } from 'src/app/service/core/layout.service';
import { shareModalComponent } from 'src/app/shared/shareModal/shareModal.component';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { ICampaignTagData } from 'src/app/model/tag';
import { IMailData } from 'src/app/model/mail-sequence';
import { SideMenuTreeService } from 'src/app/service/core/side-menu-tree.service';
import { ProspectService } from 'src/app/service/resource/prospect.service';
import { interval, timeout } from 'rxjs';
import { UploadProspectComponent } from 'src/app/shared/database/upload-prospect/upload-prospect.component';
import { SharePermissionEnum } from 'src/app/model/enum/share-permission-enum';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-campaign-item-detail',

  templateUrl: './campaign-item-detail.component.html',
  styleUrls: ['./campaign-item-detail.component.scss',]
})
export class CampaignItemDetailComponent implements OnInit {

  replieThread: boolean = false;


  loader: boolean = true
  activeTab: string = '';
  played: boolean = true;

  tabs: ICampaignTabs[] = [
    {
      label: 'Analytics',
      icon: '#card',
    },
    {
      label: 'Mail sequence',
      icon: '#discount',
    },
    {
      label: 'Database',
      icon: '#receipt',
    },
    {
      label: 'Activity',
      icon: '#activity',
    },
    {
      label: 'Replies',
      icon: '#receipt',
    },
    {
      label: 'Settings',
      icon: '#settings',
    }

  ];
  breadcrumbData: any[] = [];
  baseId: any;
  campaignId: any = '';
  currentCampaignName: string = '';
  campaignOwnerName: string = '';
  currentBaseName: any;
  currentCampaignEmoji: string = '';
  isIntegrated: boolean = true;
  favorite: boolean = false;
  currentCampignStatus: any;
  campaignTags: ICampaignTagData[] = []
  activityBadge: Number = 0;
  campaignDetailLoader: boolean = false;
  mailSequenceData: IMailData[] = [];
  mailSequenceBadge: number = 0;
  unReadReplieCount: any;
  // allIntergration: boolean = false;
  // mailForCheck: any;
  // databaseForCheck: any;







  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public campaignService: CampaignService,
    private integrationService: EmailIntegrationService,
    public layoutService: LayoutService,
    private router: Router,
    private treeService: SideMenuTreeService,
    private toastNotification: ToastNotificationService,
    private prospectService: ProspectService,
  ) { }

  ngOnInit(): void {
    this.activeTab = localStorage.getItem('campaignTab') || 'Analytics'

    this.layoutService.tickCampaignDetail
      .subscribe((data: any) => {
        if (data) {
          console.log(data)
          this.baseId = this.activatedRoute.snapshot.paramMap.get('baseid');
          localStorage.setItem('baseId', this.baseId)
          this.campaignId = this.activatedRoute.snapshot.paramMap.get('campaignId');
          localStorage.setItem('campaignId', this.campaignId)
          localStorage.setItem('baseId', this.baseId)





          this.checkIntegration(this.campaignId);
          this.getCurrentCampaignDetails(this.campaignId);

          this.checkFavourite(this.campaignId);


          this.getCampaignMailSequence(this.campaignId)
          this.getCampaignProspect()
          this.getBadgeCounter()
        }


      });
    this.campaignService.activityBadgeCount(this.campaignId);
    this.getReplieCount();
  }
// end of ngOnInit

  getReplieCount() {

    this.campaignService.getUnreadReplie(this.campaignId).subscribe((resp: any) => {
      this.unReadReplieCount = resp.object

    })
  }


  getBadgeCounter() {
    this.campaignService.getBadgeCounter(this.campaignId).subscribe(
      (resp: any) => {
        if (resp.responseCodeJson.code === 200) {
          this.mailSequenceBadge += resp.object
        }

      }
    )
  }




  openUploadProspectPopup() {
    const dialog = this.dialog.open(
      UploadProspectComponent, {
      backdropClass: 'backdrop-background',
      width: '100%',
      height: '100%',
      maxWidth: 'none',
      maxHeight: 'none',
      panelClass: 'prospect-dialog-container',
      data: this.campaignId
    })
    dialog.afterClosed().subscribe((result: string) => {
      if (result === 'success') {
        this.layoutService.databaseBadge.next(0)
      }
    })
  }

  getCampaignProspect() {
    this.loader = true
    this.prospectService.getCampaignProspect(this.campaignId)
      .subscribe((resp: any) => {
        if (resp.responseCodeJson.code === 200) {
          this.layoutService.databaseBadge.next(resp.list.length <= 0 ? 1 : 0)
        }
      })
  }

  getCampaignMailSequence(campId: any) {
    this.campaignService.getCampaignMailSequence(campId).subscribe(
      (res: any) => {
        res.list.forEach((element: any) => {

          if (element.body === "Add Body" || element.body === "<p>Add Body<p>" || element.body === "" || element.body === "<p></p>") {
            this.mailSequenceBadge += 1;

          } if (element.subject === "Set your subject" || element.subject === "<p>Set your subject</p>" || element.subject === "" || element.subject === "<p></p>") {

            this.mailSequenceBadge += 1;
          }

        });


      }
    )
  }

  onTabChanged(tab: ICampaignTabs) {
    localStorage.setItem('campaignTab', tab.label)
    this.activeTab = tab.label;
  }

  checkIntegration(campId: any) {
    this.loader = true
    this.integrationService.getIntegrationStatus(campId).subscribe((res: any) => {
      if (res.responseCodeJson.message == "Success") {
        this.loader = false
        this.isIntegrated = true
      } else {
        this.loader = false
        this.isIntegrated = false
      }
    });
  }

  openTagsDialog() {
    const dialog = this.dialog.open(CreateTagsComponent, {
      backdropClass: 'backdrop-background',
      data: {
        campaignId: this.campaignId,
        tags: this.campaignTags
      }
    });
    dialog.afterClosed().subscribe((result: any) => {
      this.getCurrentCampaignDetails(this.campaignId);
    })
  }

  getCurrentCampaignDetails(campId: any) {
    this.campaignDetailLoader = true
    this.campaignService
      .getCurrentCampaignDetails(campId)
      .subscribe((res: any) => {
        this.layoutService.campaignAccess.next(res.object.role)
        this.campaignDetailLoader = false
        this.campaignTags = res.object.tags
        this.currentCampaignName = res.object.campaignName;
        this.currentCampaignEmoji = res.object.emoji;
        this.currentCampignStatus = res.object.status;
        this.campaignOwnerName = res.object.campaignOwner;
        if (this.currentCampignStatus === 'Active')
          this.played = true
        else this.played = false
        this.getCurrentBaseDetails(this.baseId)

      });


  }

  getCurrentBaseDetails(id: any) {
    this.campaignService.getCurrentBaseDetails(id).subscribe((res: any) => {
      if (res.responseCodeJson.code === 200) {
        this.currentBaseName = res.object.campaignBaseName;
        this.breadcrumbData = [
          {
            name: "Home",
            link: ''
          },
          {
            name: this.currentBaseName,
            link: '/campaign-Details/' + this.baseId,
          },
          {
            name: this.currentCampaignName,
            link:
              '/campaign-Details/' +
              this.baseId +
              '/campaign-item-detail/' +
              this.campaignId,
          },
        ];
      }
    });
  }


  onIntegrationSuccess(event: any) {
    if (event) {
      this.isIntegrated = true
    } else {
      this.isIntegrated = false
    }
  }

  addToFavourite() {
    if (this.favorite) {
      this.removeFav();
    } else if (!this.favorite) {
      this.campaignService.addToFavourite(this.campaignId).subscribe((res: any) => {
        if (res.responseCodeJson.code == 200) {
          this.treeService.tickSideMenu.next(true)
          this.favorite = true;
          this.toastNotification.addNotification(
            'Allow us to teleport you, back to your favorite place!',
            `the ${this.currentCampaignName} has been added to your favorites`,
            NotificationEnum.SUCCESS
          )
        }
      })
    }
  }

  checkFavourite(campId: any) {
    this.campaignService.checkFavourite(campId).subscribe((res: any) => {
      if (res.responseCodeJson.message === "Campaign marked as favourite") {
        this.favorite = true;
      } else if (res.responseCodeJson.message === "Campaign not favourite") {
        this.favorite = false;
      }
    })
  }

  removeFav() {
    this.campaignService.removeFav(this.campaignId).subscribe((res: any) => {
      if (res.responseCodeJson.code == 200) {
        this.treeService.changeActiveTree({
          name: 'My Favorite',
          level: 30
        })
        this.toastNotification.addNotification(
          "It's true!",
          `You just removed the campaign from favorite`,
          NotificationEnum.INFO
        )
        // this.router.navigateByUrl('fav')
        this.treeService.tickSideMenu.next(true)
        this.favorite = false;
        // add notification here
      }
    })
  }

  deleteCampaignConfirmation() {
    const dialogRef = this.layoutService.openAlertDialog(
      'Hold on',
      'Are you sure want to delete this campaign?',
      true,
      'delete_Popup_Icon',
      'Delete Campaign'
    )
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteCampaign()
      }
    })
  }

  deleteCampaign() {
    this.campaignService.deleteCampaign(
      this.campaignId
    ).subscribe((res: any) => {
      if (res.responseCodeJson.code == 200) {
        this.router.navigateByUrl('/campaign-Details/' + this.baseId)
      }
    });
  }

  openShareDialog() {
    const dialog = this.dialog.open(shareModalComponent, {
      data: {
        baseCampaignId: this.baseId,
        campaignId: this.campaignId
      },
      backdropClass: 'backdrop-background',
    });
  }

  async openResponseNotification() {

    const data = await (this.http.post(`${environment.coreBackendUrl}/campaign/testMail?campaignId='2395f50f-5fbe-45ed-a360-feda25ad03d3`, {
    }).subscribe({
      next: d => {
        // console.log(d);
        this.toastNotification.addNotification(
          'Email Sent!',
          `the ${this.currentCampaignName} has been added to your favorites`,
          NotificationEnum.SUCCESS
        )
      },
      error: error => {
        this.toastNotification.addNotification(
          'Some Error Occured!',
          `the ${this.currentCampaignName} is not updated`,
          NotificationEnum.DANGER
        )
      }
    }));


  }


  // add api to change status

  changeStatus() {
    this.campaignService.getCampaignStatus(
      this.campaignId,
      !this.played)
      .subscribe((res: any) => {

        if (res.responseCodeJson.code === 200) {
          this.played = !this.played;

          this.getCurrentCampaignDetails(this.campaignId);

          if (!this.played) {
            this.toastNotification.addNotification(
              'We love you',
              `even though you made us pause the campaign`,
              NotificationEnum.INFO
            )
          } else {
            this.toastNotification.addNotification(
              'Yuhuu! We did it again',
              `${this.currentCampaignName} successfully started.`,
              NotificationEnum.SUCCESS
            )
          }
        }
      })
  }


  get getShareAccess() {
    switch (this.layoutService.campaignAccess.value?.toString()) {
      case SharePermissionEnum.OWNER:
        return false
        break;

      default:
        return true
        break;
    }
  }


  get getUserRole() {
    switch (this.layoutService.campaignAccess.value?.toString()) {
      case SharePermissionEnum.OWNER:
        return true
        break;
      case SharePermissionEnum.EDITOR:
        return true
        break;

      default:
        return false
        break;
    }
  }

}

