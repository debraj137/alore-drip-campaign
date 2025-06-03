import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharePermissionEnum } from 'src/app/model/enum/share-permission-enum';
import { IBlockedItem } from 'src/app/model/setting';
import { LayoutService } from 'src/app/service/core/layout.service';
import { CampaignSettingService } from 'src/app/service/resource/campaign-setting.service';
import { AddBlockedMailComponent } from '../add-blocked-mail/add-blocked-mail.component';

@Component({
  selector: 'app-list-blocked-email',
  templateUrl: './list-blocked-email.component.html',
  styleUrls: ['./list-blocked-email.component.scss']
})
export class ListBlockedEmailComponent implements OnInit {

  @Input() campaignId : string = '';
  @Input() blockedEmailData: IBlockedItem[] = [];
  @Output() refreshData = new EventEmitter<boolean>(false);
  rowLoader : string = ''

  constructor(
    private dialog : MatDialog,
    private layoutService: LayoutService,
    private campaignSettingService : CampaignSettingService
  ) { }

  ngOnInit(): void {
  }

  onChangingEmailData(i: number, blockType: number) {
    this.blockedEmailData[i].blockType = blockType;
  }

  openAddBlockedMail() {
    const dialog = this.dialog.open(AddBlockedMailComponent, {
      backdropClass: 'backdrop-background',
      data: {
        campaignId: this.campaignId,
        emailId: ''
      }
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshData.emit(true)
      }
    });
  }

  removeBlockedEmail(domainName: string) {
    if (!this.rowLoader) {
      this.rowLoader = domainName
      this.campaignSettingService
        .removeBlockedEmail(domainName)
        .subscribe((resp: any) => {
          this.rowLoader = ''
          if (resp.responseCodeJson.code === 200) {
            this.refreshData.emit(true)
          }
        });
      }
    }
    
  
  get getUserRole() {
    switch (this.layoutService.campaignAccess.value?.toString()) {
      case SharePermissionEnum.OWNER:
        return false
        break;
      default:
        return true
        break;
    }
  }
}
