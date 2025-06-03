import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharePermissionEnum } from 'src/app/model/enum/share-permission-enum';
import { IreportItem } from 'src/app/model/setting';
import { LayoutService } from 'src/app/service/core/layout.service';
import { CampaignSettingService } from 'src/app/service/resource/campaign-setting.service';
import { AddDailyReportComponent } from '../add-daily-report/add-daily-report.component';

@Component({
  selector: 'app-list-daily-report',
  templateUrl: './list-daily-report.component.html',
  styleUrls: ['./list-daily-report.component.scss']
})
export class ListDailyReportComponent implements OnInit {

  @Input() campaignId : string = '';
  @Input() dailyReportData : IreportItem[] = [];
  @Output() refreshData = new EventEmitter<boolean>(false);
  rowLoader : string = ''

  constructor(
    private dialog : MatDialog,
    private layoutService: LayoutService,
    private campaignSettingService: CampaignSettingService,
  ) { }

  ngOnInit(): void {
  }

  addDailyReport() {
    const dialog = this.dialog.open(AddDailyReportComponent, {
      backdropClass: 'backdrop-background',
      data : this.campaignId
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshData.emit(true)
      }
    });
  }

  removeReport(reportId : string) {
    if (!this.rowLoader) {
      this.rowLoader = reportId
      this.campaignSettingService.removeReport(reportId)
      .subscribe((resp : any) => {
        this.rowLoader = ''
        if(resp.responseCodeJson.code === 200) {
          this.refreshData.emit(true)
        }
      })
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
