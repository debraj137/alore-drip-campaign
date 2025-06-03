import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharePermissionEnum } from 'src/app/model/enum/share-permission-enum';
import { IBlockedItem } from 'src/app/model/setting';
import { LayoutService } from 'src/app/service/core/layout.service';
import { CampaignSettingService } from 'src/app/service/resource/campaign-setting.service';
import { AddBlockedDomainComponent } from '../add-blocked-domain/add-blocked-domain.component';

@Component({
  selector: 'app-list-blocked-domain',
  templateUrl: './list-blocked-domain.component.html',
  styleUrls: ['./list-blocked-domain.component.scss']
})
export class ListBlockedDomainComponent implements OnInit {

  @Input() campaignId : string = '';
  @Input() blockedDomainData: IBlockedItem[] = [];
  @Output() refreshData = new EventEmitter<boolean>(false);
  rowLoader : string = ''

  constructor(
    private dialog : MatDialog,
    private layoutService: LayoutService,
    private campaignSettingService : CampaignSettingService
  ) { }

  ngOnInit(): void {
  }

  onChangingBlockData(i: number, blockType: number) {
    this.blockedDomainData[i].blockType = blockType;
  }

  openAddBlockedDomain() {
    const dialog = this.dialog.open(AddBlockedDomainComponent, {
      backdropClass: 'backdrop-background',
      data: {
        campaignId: this.campaignId,
        domain: ''
      }
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshData.emit(true)
      }
    });
  }

  removeBlockedDomain(domainName: string) {
    if (!this.rowLoader) {
      this.rowLoader = domainName
      this.campaignSettingService
        .removeBlockedDomain(domainName)
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
