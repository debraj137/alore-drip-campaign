import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharePermissionEnum } from 'src/app/model/enum/share-permission-enum';
import { LayoutService } from 'src/app/service/core/layout.service';
import { CampaignSettingService } from 'src/app/service/resource/campaign-setting.service';
import { AddBccModalComponent } from '../add-bcc-modal/add-bcc-modal.component';

@Component({
  selector: 'app-list-bcc',
  templateUrl: './list-bcc.component.html',
  styleUrls: ['./list-bcc.component.scss']
})
export class ListBccComponent implements OnInit {

  @Input() campaignId : string = '';
  bccEmailData: any[] = [];

  constructor(
    private campaignSettingService: CampaignSettingService,
    private dialog: MatDialog,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.getBccEmailData();
  }

  getBccEmailData() {
    this.campaignSettingService
      .getBccEmail(this.campaignId)
      .subscribe((res: any) => {
        if (res.responseCodeJson.code === 200) {
          this.bccEmailData = res.list;
        }
      });
  }

  openAddBCC() {
    const dialog = this.dialog.open(AddBccModalComponent, {
      backdropClass: 'backdrop-background',
      data: {
        campaignId: this.campaignId,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      this.getBccEmailData();
    });
  }
  
  onRemoveEmailBcc(infoId: string) {
    this.campaignSettingService.removeBccEmail(infoId).subscribe((res: any) => {
      this.getBccEmailData();
    });
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
