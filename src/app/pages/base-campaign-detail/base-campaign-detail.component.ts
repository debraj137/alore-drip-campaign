import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ICampaignBaseDetail, ICampaignBaseItem, ICampaignItem } from 'src/app/model/campaign';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { SharePermissionEnum } from 'src/app/model/enum/share-permission-enum';
import { LayoutService } from 'src/app/service/core/layout.service';
import { SideMenuTreeService } from 'src/app/service/core/side-menu-tree.service';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { ArchiveServiceService } from 'src/app/service/resource/archive-service.service';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { CreateNewCampaignBaseComponent } from 'src/app/shared/create-new-campaign-base/create-new-campaign-base.component';
import { SettingPopupModalNewComponent } from 'src/app/shared/setting-popup-modal-new/setting-popup-modal-new.component';
import { HideTableColumnComponent } from 'src/app/shared/table/hide-table-column/hide-table-column.component';
import { RenameCampaignComponent } from '../rename-campaign/rename-campaign.component';

@Component({
  selector: 'app-base-campaign-detail',
  templateUrl: './base-campaign-detail.component.html',
  styleUrls: [
    './base-campaign-detail.component.scss',
    '../../../assets/style/custom-material-table.scss',
  ]
})
export class BaseCampaignDetailComponent implements OnInit {

  @Input() baseCampaignDetail!: ICampaignBaseDetail;
  @Input() campaignList!: ICampaignItem[];
  @Output() refreshBaseCampaign = new EventEmitter<boolean>(false);
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth;
  }

  // table variable
  columns: string[] = [
    'select',
    'campaign_name',
    'status',
    'sender',
    'total_sent',
    'open_rate',
    'create_date',
    'email_last_sent',
    'action'
  ];
  hidedColumn: string[] = [];
  dataSource = new MatTableDataSource<ICampaignItem>();
  selection = new SelectionModel<ICampaignItem>(true, []);

  baseCampaignId: string = ''
  dummySelect: any[] = [
    { value: 'Lead Generation-0', viewValue: 'Lead Generation' },
    { value: 'Link Building-1', viewValue: 'Link Building' },
    { value: 'Generate referral-2', viewValue: 'Generate referral' },
    { value: 'Connecting with Investors-3', viewValue: 'Connecting with Investors' },
  ];
  breadcrumbData: any[] = [];
  selectedCampaignId: string = '';
  selectedCampaignLoader: string = '';
  campaignId: any = '';
  currentCampaignName: string = '';
  favorite: boolean = false;
  windowWidth: number = 0;
  selectOptionValue: boolean = false;
  value: any;
  campList: any;
  areCampiagnsSeleted: boolean = false;


  currentCampId: string = '';

  constructor(
    public campaignService: CampaignService,
    private dialog: MatDialog,
    public router: Router,
    private layoutService: LayoutService,
    private activatedRote: ActivatedRoute,
    private treeService: SideMenuTreeService,
    private toastNotification: ToastNotificationService,
    private archive: ArchiveServiceService,
  ) {
    this.windowWidth = window.innerWidth;
  }

  ngOnInit(): void {

    this.dataSource.data = this.campaignList;
    this.campList = this.dataSource.data;
    this.baseCampaignId = this.activatedRote.snapshot.paramMap.get('baseid') || '';

    let currentActiveFolder = localStorage.getItem('currentActiveFolder') || ''
    currentActiveFolder = currentActiveFolder?.substring(1, currentActiveFolder.length - 1)

    if (currentActiveFolder === "Work Campaign Base")
      this.campaignService.setParentDetail(0)

    else if (currentActiveFolder === "My Favorite")
      this.campaignService.setParentDetail(1)

    else if (currentActiveFolder === "Shared with me")
      this.campaignService.setParentDetail(2)

    else if (currentActiveFolder === "Shared by me")
      this.campaignService.setParentDetail(3)

    else if (currentActiveFolder === "My Campaign base")
      this.campaignService.setParentDetail(4)



    this.selection.changed.subscribe((resp: any) => {
      if (resp.source.selected.length > 0) {
        this.areCampiagnsSeleted = true;
      }

      if (resp.source.selected.length == 0) {
        this.areCampiagnsSeleted = false;
      }
    })

  }

  addArchive(data: any) {
    this.archive.addArchive(this.selectedCampaignId).subscribe(
      (res: any) => {
        if (res.responseCodeJson.code === 200) {

          let index = 0;
          this.dataSource.data.map((obj: any) => {
            if (obj.campaignId === data.campaignId) {
              this.dataSource.data.splice(index, 1);
              this.dataSource._updateChangeSubscription();
            }
            index++;
          })
          this.toastNotification.addNotification(
            'You just archived your campaigns here!',
            `the ${data.campaignName} has been archived`,
            NotificationEnum.DANGER
          )
        }
      }
    )
  }

  removeArchive(data: any) {
    this.archive.removeArchive(this.selectedCampaignId).subscribe((res: any) => {
      this.refreshBaseCampaign.emit(true)
      this.toastNotification.addNotification(
        "It's true!",
        `You just removed the campaign from archive`,
        NotificationEnum.INFO
      )
    })
  }

  addToFavourite() {
    if (this.favorite) {
      this.removeFav();
    } else if (!this.favorite) {
      this.campaignService.addToFavourite(this.selectedCampaignId).subscribe((res: any) => {
        if (res.responseCodeJson.code == 200) {
          this.favorite = true;
          this.toastNotification.addNotification(
            'Allow us to teleport you, back to your favorite place!',
            `the ${this.currentCampaignName} has been added to your favorites`,
            NotificationEnum.SUCCESS
          )
          // this.refreshBaseCampaign.emit(true)
        }
      })
    }
  }

  removeFav() {
    this.campaignService.removeFav(this.selectedCampaignId).subscribe((res: any) => {
      if (res.responseCodeJson.code == 200) {
        this.favorite = false;
        // this.refreshBaseCampaign.emit(true)
        this.toastNotification.addNotification(
          "It's true!",
          `You just removed the campaign from favorite`,
          NotificationEnum.INFO
        )
      }
    })
  }


  changeCampaignStatus(campaignId: string, status: number) {
    this.campaignService.changeCampaignStatus(campaignId, status).subscribe((res: any) => {
      if (res.responseCodeJson.code == 200) {
        this.favorite = false;
        if (status == 1) {

          this.dataSource.data.map((obj: any) => {
            if (obj.campaignId === campaignId) {
              obj.status = 'Active';
              this.dataSource._updateChangeSubscription();
            }
          })

          this.toastNotification.addNotification(
            "It's true!",
            `Campaign has been marked as Active!`,
            NotificationEnum.INFO
          )
        }

        else {
          this.dataSource.data.map((obj: any) => {
            if (obj.campaignId === campaignId) {
              obj.status = 'Completed';
              this.dataSource._updateChangeSubscription();
            }
          })

          this.toastNotification.addNotification(
            "It's true!",
            `Campaign has been marked as Completed!`,
            NotificationEnum.INFO
          )
        }

      }
    })
  }


  drop(event: CdkDragDrop<string[]>) {
    const checkboxPosition = 1;
    const actionPosition = this.columns.length - 1;
    if (
      // to prevent checkbox moving
      event.previousIndex >= checkboxPosition &&
      event.currentIndex >= checkboxPosition &&
      // to prevent action button moving
      event.previousIndex < actionPosition &&
      event.currentIndex < actionPosition
    ) {
      moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    }
  }

  columnVisibility(columnName: string) {
    const isColumnHided = this.hidedColumn.find((data) => {
      return data === columnName;
    });
    return isColumnHided;
  }

  toggleAll() {
    if (this.isAllSelected || this.selection.hasValue()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  deleteSelectedCampaigns() {

    this.areCampiagnsSeleted = true;
    let toBeDeletedArray: any = []
    this.selection.selected.forEach((obj) => {
      toBeDeletedArray.push(obj?.campaignId)
    });


    const dialogRef = this.layoutService.openAlertDialog(
      'Hold on',
      'Are you sure want to delete these campaign?',
      true,
      'delete_Popup_Icon',
      'Delete Campaign'
    )
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // this.deleteCampaign(campaignId)  API call for multiple delete

        this.campaignService.deleteMultipleCampaigns(
          toBeDeletedArray
        ).subscribe((res: any) => {

          let toBeRemovedIndex: number[] = [];
          if (res.responseCodeJson.code == 200) {
        

            this.dataSource.data.map((obj: any, index: number) => {
              if (toBeDeletedArray.includes(obj.campaignId)) {
                toBeRemovedIndex.push(index)
              }
            })

          

            for (var i = toBeRemovedIndex.length - 1; i >= 0; i--)
              this.dataSource.data.splice(toBeRemovedIndex[i], 1);


            this.dataSource._updateChangeSubscription();
            this.toastNotification.addNotification(
              'Et tu Brutus?',
              'We deleted the campaigns',
              NotificationEnum.DANGER
            )
            this.treeService.tickSideMenu.next(true)
          }
        });
      }
    })
  }

  filterTableHeader(label: string) {
    return label.replace(/_/g, ' ');
  }

  onHideColumn(hidedColumn: string[]) {
    this.hidedColumn = hidedColumn
  }

  addBaseToWorkBase() {

    if (this.campaignService.parentDetail > 2 && this.campaignService.parentDetail !== 5) {
      const baseId = this.baseCampaignDetail.campaignBaseId
      this.campaignService.addToWorkBase(baseId).subscribe(
        (resp: any) => {
          this.toastNotification.addNotification(
            'Allow us to teleport you, back to your WorkSpace place!',
            `the ${this.currentCampaignName} has been added to your WorkSpace`,
            NotificationEnum.SUCCESS
          )
        }
      )

    }
  }

  restartCampaign(data: any) {
    this.campaignService.restartCampaign(data.campaignId)
      .subscribe((resp: any) => {
        // this.toastNotification.addNotification(
        //   'Allow us to teleport you, back to your WorkSpace place!',
        //   `the ${this.currentCampaignName} has been added to your WorkSpace`,
        //   NotificationEnum.SUCCESS
        // )
      })
  }

  openCreateCampaignModal(isEdit: boolean) {
    const dialogRef = this.dialog.open(CreateNewCampaignBaseComponent, {
      data: {
        type: isEdit ? 'base-edit' : 'campaign',
        baseCampaignId: this.baseCampaignDetail.campaignBaseId,
        data: isEdit ? this.baseCampaignDetail : null
      },
      backdropClass: 'backdrop-background',
    });


    dialogRef.afterClosed().subscribe((result) => {
      this.refreshBaseCampaign.emit(true)
    });
  }

  verifyCampaignReciepe(campaignId: string, campaignName: string) {

    if (!this.selectedCampaignLoader) {
      this.selectedCampaignLoader = campaignId
      this.campaignService.getCurrentCampaignSettings(
        campaignId
      ).subscribe((res: any) => {
        this.selectedCampaignLoader = ''
        const completionStatus: number = res.object.completionStatus;
        // if user didnt complete their setting before creating campaign,
        // it will continue from previous step, else it will redirect to campaign detail
        if (completionStatus <= 7) {
          this.openSettingDialog(completionStatus + 1, campaignId, res.object)
        } else {
          const baseCampaignId = this.baseCampaignDetail.campaignBaseId
          this.treeService.changeActiveTree({
            name: this.baseCampaignDetail?.campaignBaseName,
            level: 40
          })
          this.treeService.changeActiveTree({
            name: campaignName,
            level: 50
          })
          localStorage.removeItem('campaignTab')
          this.router.navigateByUrl(
            'campaign-Details/' + baseCampaignId + '/campaign-item-detail/' + campaignId
          )
          this.currentCampId = campaignId
        }
      })
    }
  }


  getDateDifference(date: string): string {

    if (date == '0')
      return '-';

    let todayDate = new Date();
    let sentOnDate = new Date(date);
    sentOnDate.setDate(sentOnDate.getDate());
    let differenceInTime = todayDate.getTime() - sentOnDate.getTime();
    // To calculate the no. of days between two dates
    let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    let currentDate = differenceInDays + " days ago"

    if (differenceInDays === 0) {
      return "Today"
    } else if (differenceInDays === 1) {
      return "Yesterday";
    }
    return currentDate;
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

  duplicateCamp(campaignId: string) {

    this.campaignService.duplicateCampaign(campaignId, this.baseCampaignDetail.campaignBaseId).subscribe((resp: any) => {

      if (resp.responseCodeJson.code === 200) {
        this.dataSource.data.push(resp.object)
        this.dataSource._updateChangeSubscription();
        this.toastNotification.addNotification(
          "It's true!",
          `You just created a duplicate Campaign`,
          NotificationEnum.INFO
        )
        //  window.location.reload();

      }
    })
  }


  viewBaseCampaign(baseId: any) {
    this.campaignService.getBaseSpecificCampaignList(baseId, this.campaignService.parentDetail === 0 ? 0 : 1).subscribe(
      (res: any) => {
        this.treeService.changeActiveTree({
          name: this.baseCampaignDetail?.campaignBaseName,
          level: 40
        })
        this.campaignService.currentCamapignList = res.list;
        this.router.navigate(['/campaign-Details', baseId]);
      }

    )
  }

  deleteCampaignConfirmation(campaignId: any) {

    const dialogRef = this.layoutService.openAlertDialog(
      'Hold on',
      'Are you sure want to delete this campaign?',
      true,
      'delete_Popup_Icon',
      'Delete Campaign'
    )
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteCampaign(campaignId)
      }
    })
  }

  deleteCampaign(campaignId: any) {
    this.campaignService.deleteCampaign(
      this.selectedCampaignId
    ).subscribe((res: any) => {
      if (res.responseCodeJson.code == 200) {
        // this.refreshBaseCampaign.emit(true)
        let index = 0;
        this.dataSource.data.map((obj: any) => {
          if (obj.campaignId === campaignId) {
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
          }
          index++;
        })
        this.dataSource._updateChangeSubscription();
        this.toastNotification.addNotification(
          'Et tu Brutus?',
          'We deleted the campaign',
          NotificationEnum.DANGER
        )
        this.treeService.tickSideMenu.next(true)
      }
    });
  }

  deleteBaseConfirm() {
    const dialogRef = this.layoutService.openAlertDialog(
      'Hold on',
      'Are you sure want to delete this base?',
      true,
      'delete_Popup_Icon',
      'Delete Base'
    )
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteBaseCampaign()
      }
    })
  }

  deleteBaseCampaign() {
    this.campaignService.deleteBase(
      this.baseCampaignDetail.campaignBaseId
    ).subscribe((res: any) => {
      if (res.responseCodeJson.code == 200) {
        this.toastNotification.addNotification(
          'Et tu Brutus?',
          'We deleted the Base',
          NotificationEnum.DANGER
        )
        this.refreshBaseCampaign.emit(true)
        this.treeService.tickSideMenu.next(true)
      }
    });
  }

  changeStatus(data: any) {
    let isRunning: boolean = false
    if (data.status === 'Running') {
      isRunning = false
    } else {
      isRunning = true
    }
    this.campaignService.getCampaignStatus(
      this.selectedCampaignId,
      isRunning)
      .subscribe((res: any) => {
        if (res.responseCodeJson.code === 200) {
          // this.played = !this.played;
          if (!isRunning) {
            this.toastNotification.addNotification(
              'We love you',
              `even though you made us pause the campaign`,
              NotificationEnum.INFO
            )
          } else {
            this.toastNotification.addNotification(
              'Yuhuu! We did it again',
              `${data.campaignName} successfully started.`,
              NotificationEnum.SUCCESS
            )
          }
        }
        this.refreshBaseCampaign.emit(true)
      })
  }

  getUserInitial(userName: string) {

    userName = userName.trim();

    if (userName != null || userName != undefined || userName != "" || userName != " ") {

      let splittedName = userName.split(' ');

      if (splittedName.length >= 2) {
        return splittedName[0][0] + splittedName[1][0]
      } else if (splittedName.length > 1) {
        return splittedName[0][0] + splittedName[0][1]
      } else if (splittedName.length >= 1) {
        return splittedName[0][0] + splittedName[0][1]
      }
      else {
        return 'NA'
      }

    }
    return 'NA'
  }

  restoreCampaign(data: any) {
    this.campaignService.restoreCampaign(data.campaignId).subscribe((resp: any) => {
      this.toastNotification.addNotification(
        'Yuhuu! We did it again',
        `${data.campaignName} successfully restored.`,
        NotificationEnum.SUCCESS
      )
      this.refreshBaseCampaign.emit(true)
    })
  }

  renameCampaignName(campaignId: string) {
    const dialogRef = this.dialog.open(RenameCampaignComponent, {

      backdropClass: 'backdrop-background',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {

        this.dataSource.data.map((obj: any) => {
          if (obj.campaignId === campaignId) {
            obj.campaignName = result.campaignName;
            this.dataSource._updateChangeSubscription();
          }
        })
      }
    })
  }


  get isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  get filteredColumnList(): string[] {
    const filteredColumn = this.columns.filter((data: string) => {

      if (this.windowWidth <= 1700) {
        return data

      } else {
        return data
      }
    });
    return filteredColumn
  }

  get getFilteredColumn(): string[] {
    const filteredColumn = this.columns.filter((data: string) => {
      if (this.windowWidth <= 1700) {
        return !this.hidedColumn.includes(data);
      } else {
        return !this.hidedColumn.includes(data);
      }
    });
    return filteredColumn;
  }

  getUserRole(role: any) {
    switch (role?.toString()) {
      case SharePermissionEnum.OWNER:
        return false
        break;
      case SharePermissionEnum.EDITOR:
        return false
        break;
      default:
        return true
        break;
    }
  }

  selectOption() {
    this.selectOptionValue = true;
    this.selectOptionValue = this.value;
  }

  threeDotClick(data: any) {

    localStorage.setItem("clickedCampId", this.selectedCampaignId)
    localStorage.setItem("currentCampaignName", data.campaignName)
  }

  selectedCampaigns(campaign: any) {
    console.log(campaign)
  }
}
