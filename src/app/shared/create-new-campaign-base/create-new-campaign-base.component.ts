import { Component, Inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { ICampaignBaseItem, ICreateCampaign } from 'src/app/model/campaign';
import { CommonService } from 'src/app/service/core/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SideMenuTreeService } from 'src/app/service/core/side-menu-tree.service';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { MyCampaignBaseService } from 'src/app/service/resource/my-campaign-base.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { ContentObserver } from '@angular/cdk/observers';
import { forkJoin } from 'rxjs';
import { TreeSidebarComponent } from '../tree-sidebar/tree-sidebar.component';

interface IDialogData {
  type: string;
  campaignList: any[];
  baseCampaignId?: string;
  data?: any;
  parentType?: number;
}

@Component({
  selector: 'app-create-new-campaign-base',
  templateUrl: './create-new-campaign-base.component.html',
  styleUrls: [
    './create-new-campaign-base.component.scss',
    '../../../assets/style/default-modal-style.scss',
  ],

})
export class CreateNewCampaignBaseComponent implements OnInit {

  showEmoji: boolean = false;
  showBaseCampaign: boolean = false;
  showColorPicker: boolean = false;
  arrowPosition: boolean = false;
  tagsControl = this.fb.group({});
  color: string = '';
  num: number = 0;
  baseName: string = '';
  isWorkBaseListLoaded: boolean = false;
  isPersonalBaseListLoaded: boolean = false;
  isDefaultBaseNameLoaded: boolean = false;

  campaignBaseName: string = "";
  colorSelections: string[] = [
    '#EEEEEE', '#CCCCCC', '#ACACAC', '#666666', '#444444',
    '#83CC8B', '#61C76C', '#20C933', '#00B514', '#338A17',
    '#AFB5FF', '#8E96FF', '#6B76FF', '#3140FF', '#0013FF',
    '#FFB598', '#FF9E79', '#FF7844', '#FF4700', '#C53700',
    '#FF9FF2', '#FE67E9', '#F638DC', '#FF00DC', '#D600B8',
    '#FFE3AF', '#FFD68C', '#FFC55C', '#FDB22B', '#E89500',
    '#FFB3C8', '#FF8CAD', '#FF4E81', '#FF0049', '#DA0240',
    '#C2F5E9', '#72DDC3', '#20D9D2', '#7BC8C3', '#06A09B',
    '#D0F0FD', '#77D1F3', '#18BFFF', '#4083AC', '#0B76B7',
    '#CFDFFF', '#9CC7FF', '#2D7FF9', '#0067FF', '#0054D1'
  ]
  emojiRandomizer: string[] = [
    '1F600',
    '1F603',
    '1F604',
    '1F601',
    '1F605',
    '1F929',
    '1F60D',
    '1F618',
    '1F619',
    '1F92B',
    '1F636',
    '1F612',
    '1F614',
    '1F924',
    '1F915',
    '1F922',
    '1F976',
    '1F973',
    '1F97A',
    '1F630',
    '1F613',
    '1F971',
    '1F62B',
    '1F927',
    '1F634',
  ];
  createCampaignFromRecipeStatus: string | null = '';
  dataExist: string[] = [];
  submitLoader: boolean = false;
  baseCampaignList: ICampaignBaseItem[] = [];
  personalCampaignList: any[] = [];
  createcamapignFromCampaign: any;
  baseFlag: any;
  isCampaignNameExist: boolean = false;

  currentBaseId !: any;
  currentBaseName !: any;

  formControl = this.fb.group({
    campaigName: ['', Validators.required],
    campaignIcon: ['', Validators.required],
    baseId: [''],
  });


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateNewCampaignBaseComponent>,
    public campaignService: CampaignService,
    private commonService: CommonService,
    private treeService: SideMenuTreeService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private toastNotification: ToastNotificationService,
    private mycampaignbase: MyCampaignBaseService
  ) { }

  ngOnInit(): void {


    forkJoin([this.getAllWorkCampaign(), this.getPersonalCampaign()])
    this.color = this.colorSelections[Math.floor((Math.random() * 40) + 1)]
    this.dataExist = this.data.campaignList || [];
    const randomEmoji = this.emojiRandomizer[Math.floor(Math.random() * 25 + 1)];
    this.formControl.get('campaignIcon')?.setValue(randomEmoji);


    if (this.data.type.includes('campaign')) {
      this.formControl.addControl(
        'baseName',
        new FormControl(null, Validators.required)
      );
      this.currentBaseId = this.router.url.split("/")[2];


      if (this.currentBaseId !== "" && this.currentBaseId !== undefined) {
        this.campaignService.getCurrentBaseDetails(this.currentBaseId).subscribe((resp: any) => {

          if (resp.responseCodeJson.code === 200) {
            this.currentBaseName = resp.object.campaignBaseName;
            this.formControl?.get('baseName')?.setValue(this.currentBaseName);
            this.formControl.get('baseId')?.setValue(this.currentBaseId);
            this.isDefaultBaseNameLoaded = true;
          }
        })
      }

      if (this.currentBaseId == undefined || this.currentBaseId == "") {
        this.isDefaultBaseNameLoaded = true;
      }



      const baseNameControl = this.formControl.controls['campaigName']
      baseNameControl.valueChanges.subscribe((value: string) => {
        this.checkingCampaignName(value)
      })
    }

    if(this.data.type === 'base'){
      this.isDefaultBaseNameLoaded = true;
    }

    if (this.data.type === 'base-edit') {
      this.color = this.data.data.color
      this.formControl.patchValue({
        campaigName: this.data.data.campaignBaseName,
        campaignIcon: this.data.data.emoji
      })
      this.isDefaultBaseNameLoaded = true;
    }
  }

  checkingCampaignName(campaignName: string) {
    const formValue = this.formControl.value
    if (formValue.baseId) {
      this.submitLoader = true
      this.campaignService.checkCampaignName(formValue.baseId, campaignName.trim())
        .subscribe((resp: any) => {
          this.submitLoader = false
          if (resp.responseCodeJson.message === 'Campaign can be created ') {
            this.isCampaignNameExist = false
          } else {
            this.isCampaignNameExist = true
          }
        })
    }
  }

  getAllWorkCampaign() {
    this.campaignService.getAllBaseCampaignsList().subscribe((res: any) => {
      this.baseCampaignList = res.list;
      this.isWorkBaseListLoaded = true;

    })
  }

  getPersonalCampaign() {
    this.mycampaignbase.getAllPersonalCampaignLists().subscribe((res: any) => {
      this.personalCampaignList = res.list;
      this.isPersonalBaseListLoaded = true;
    })
  }

  // getAllWorkBaseList(){
  //   this.campaignService.getAllBaseCampaignsList().subscribe((res: any) => {
  //     this.baseCampaignList = res.list;
  //     this.isWorkBaseListLoaded = true;

  //   })
  // }

 



  getToolTipData(): string {
    return 'Enter ' + (this.data.type.includes('base') ? 'Base Name' : 'Campaign Name');
  }
  getIcon(type: string): string {
    return this.commonService.getIcon(type);
  }

  onSelectEmoji(event: any) {
    this.formControl.controls['campaignIcon']?.setValue(event.emoji.unified);
    this.showEmoji = false;
  }

  clearChooseBaseInput() {
    this.formControl.get('baseName')?.setValue("");
  }

  onSubmit() {
    const formControl = this.formControl.value;
    const payload: ICreateCampaign = {
      emoji: formControl.campaignIcon,
      campaignName: formControl.campaigName.trim(),
      backgroundColor: this.color,
      tags: [''],
      campaignBaseId: formControl.baseId,
      parentType: (this.data.parentType === undefined || this.data.parentType === null) ? 1 : 0
    };
    if (this.data.type.includes('base')) {
      this.campaignService.createCampaign(payload).subscribe(
        (resp: any) => {
          if (resp.responseCodeJson.code === 200) {
            this.toastNotification.addNotification(
              'Yuhuu! We did it again.',
              `${formControl.campaigName} successfully started.`,
              NotificationEnum.SUCCESS
            )
            this.dialogRef.close('success');
          } 
          
          else {
            this.toastNotification.addNotification(
              'Campaign Base already exists',
              `Please change name of your base`,
              NotificationEnum.DANGER
            )
          }
          this.treeService.tickSideMenu.next(true)
        },
        (error: any) => {
          console.log(error)
        }
      );
    } else {
      this.campaignService.createNewCampaignInBase(payload)
        .subscribe(
          (res: any) => {
            if (res.responseCodeJson.code === 200) {
              this.dialogRef.close()
              this.toastNotification.addNotification(
                'Yuhuu! We did it again.',
                `${formControl.campaigName} successfully started.`,
                NotificationEnum.SUCCESS
              )
              this.router.navigateByUrl('objectives/' + res.object.campaignId);
              this.treeService.tickSideMenu.next(true)
            } else if (res.responseCodeJson.code === 409) {
              this.isCampaignNameExist = true
            }

            else if(res.responseCodeJson.code === 404) {
              this.toastNotification.addNotification(
                'Campaign Base does not exist',
                '',
                NotificationEnum.DANGER
              )
            }
          });
    }

    localStorage.setItem('campaignBaseId', formControl.baseId)
  }

  onSubmitEdit() {
    if (this.data.type.includes('base')) {
      const formValue = this.formControl.value
      this.campaignService.updateBaseCampaign(
        this.color,
        this.data.baseCampaignId || '',
        formValue.campaigName,
        formValue.campaignIcon
      ).subscribe((resp: any) => {
        this.toastNotification.addNotification(
          'Yuhuu! We did it again',
          `${formValue.campaigName} successfully updated.`,
          NotificationEnum.SUCCESS
        )
        this.dialogRef.close('success');
      })
    } else {
      this.dialogRef.close()
    }
  }

  get filteredBaseCampaignList(): any[] {
    const baseNameControl = this.formControl.controls['baseName']?.value
    if (baseNameControl) {
      return this.baseCampaignList.filter((obj: any) => {
        const baseName = obj.campaignBaseName.toLowerCase()
        return baseName.includes(baseNameControl.toLowerCase())
      })
    } else {
      return this.baseCampaignList
    }
  }

  get fiteredPersonalCampaignList(): any[] {
    const baseNameControl = this.formControl.controls['baseName']?.value
    if (baseNameControl) {
      return this.personalCampaignList.filter((obj: any) => {
        const baseName = obj.campaignBaseName.toLowerCase()
        return baseName.includes(baseNameControl.toLowerCase())
      })
    } else {
      return this.personalCampaignList
    }
  }

  selectCampaignBase(campaignBaseObj: any) {
    let campaignBaseId = campaignBaseObj.campaignBaseId;
    this.campaignBaseName = campaignBaseObj.campaignBaseName;
    this.formControl.get('baseName')?.setValue(campaignBaseObj.campaignBaseName);
    this.formControl.get('baseId')?.setValue(campaignBaseObj.campaignBaseId);
  }

  selectPersonalBase(campaignBaseObj: any){
    let campaignBaseId = campaignBaseObj.campaignBaseId;
    this.campaignBaseName = campaignBaseObj.campaignBaseName;
    this.formControl.get('baseName')?.setValue(campaignBaseObj.campaignBaseName);
    this.formControl.get('baseId')?.setValue(campaignBaseObj.campaignBaseId);
  }

  get objectiveCampaign(): boolean {
    return this.data.type === 'objective';
  }


}

