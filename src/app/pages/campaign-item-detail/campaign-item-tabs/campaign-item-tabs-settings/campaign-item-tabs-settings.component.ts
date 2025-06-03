import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IBlockedItem, IreportItem } from 'src/app/model/setting';
import { CampaignSettingService } from 'src/app/service/resource/campaign-setting.service';
import { EmailIntegrationService } from 'src/app/service/resource/email-integration.service';
import { LayoutService } from 'src/app/service/core/layout.service';
import { FaqService } from 'src/app/service/resource/faq.service';
import { CampaignIntegrationComponentComponent } from '../../integration-page/campaign-integration-component/campaign-integration-component.component';
import { SharePermissionEnum } from 'src/app/model/enum/share-permission-enum';
import { IntegrationCheckFlowComponent } from 'src/app/pages/integration-check/integration-check-flow/integration-check-flow.component';
import { I } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-campaign-item-tabs-settings',
  templateUrl: './campaign-item-tabs-settings.component.html',
  styleUrls: ['./campaign-item-tabs-settings.component.scss'],
})
export class CampaignItemTabsSettingsComponent implements OnInit {
  @Input() isIntegrated: boolean = false;
  @Output() integrationChanged = new EventEmitter<boolean>(false);

  disabledButton: boolean = false;
  blockedDomainData: IBlockedItem[] = [];
  blockedEmailData: IBlockedItem[] = [];
  dailyReportData: IreportItem[] = [];
  weeklyReportData: IreportItem[] = [];
  campaignId!: string;
  campaignDetails: any;
  loaded = false;

  window: any;




  constructor(
    private campaignSettingService: CampaignSettingService,
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private emailIntegrationService: EmailIntegrationService,
    private layoutService: LayoutService,
    private faqService: FaqService
  ) { }

  ngOnInit(): void {
    this.campaignId = this.activeRoute.snapshot.paramMap.get('campaignId') || '';
    this.getBlockedData();
    this.getIntegrationData(this.campaignId);
    this.getReportData();
    this.faqService.setPageNumber(7);

    let loaded = false;
    let self = this
    const vesselScriptId = 'vessel-modal-script';
    const newScript = document.createElement('script')
    newScript.setAttribute('id', vesselScriptId);
    newScript.src = "https://cdn.vessel.land/init.js"
    newScript.onload = function () {

      window.Vessel.init({
        onLoad: () => {
          loaded = true;
        },
        onSuccess: (publicToken: any) => {
          // Send publicToken to your backend so it can be exchanged for
          // an accessToken.
          self.emailIntegrationService.vesselTokenExchange(publicToken).subscribe((resp: any) => {
            console.log("response: ", resp)
          })
          // console.log(publicToken)

        }
      });
    };

    if (!document.getElementById(vesselScriptId)) {
      document.body.append(newScript);
    }


  }

  async launchVesselConnect() {

    this.emailIntegrationService.vesselIntegration().subscribe((resp: any) => {
      if (resp.responseCodeJson.code === 200) {
        let linkToken = JSON.parse(resp.object).linkToken
        window.Vessel.open({ linkToken });
      }
    })

  };

  exchangeToken() {

  }

  getReportData() {
    this.campaignSettingService.getRerport(this.campaignId)
      .subscribe((resp: any) => {
        if (
          resp.responseCodeJson.code === 200
        ) {
          this.dailyReportData = []
          this.weeklyReportData = []
          resp.list.forEach((obj: IreportItem) => {
            switch (obj.reportType) {
              case 0:
                this.dailyReportData.push(obj)
                break;
              case 1:
                this.weeklyReportData.push(obj)
                break;
              case 3:
                // monthly report here
                break;

              default:
                break;
            }
          });
        }
      })
  }

  getBlockedData() {
    this.campaignSettingService.getBlockedData(this.campaignId).
      subscribe((resp: any) => {
        if (resp?.responseCodeJson?.code === 200) {
          this.blockedEmailData = resp.object.blocklistEmail.filter(
            (obj: IBlockedItem) => {
              return obj.emailId;
            }
          );
          this.blockedDomainData = resp.object.blocklistDomain.filter(
            (obj: IBlockedItem) => {
              return obj.domainName;
            }
          );
        }
      });
  }

  getIntegrationData(campaignId: any) {
    this.campaignSettingService.getIntegrationDetails(campaignId).subscribe((res: any) => {
      this.campaignDetails = res.object;

    });
  }

  removeEmailIntegration() {
    const dialog = this.layoutService.openAlertDialog(
      'Are you sure?',
      'Unlinking your Email account will ultimately stop all campaigns using that account.',
      true,
      'delete_Popup_Icon',
      'Unlink Email Account'
    );
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.submitRemoveEmailIntegration();
      }
    });
  }

  submitRemoveEmailIntegration() {
    this.emailIntegrationService.removeIntegration(
      this.campaignId
    ).subscribe((resp) => {
      this.integrationChanged.emit(false)
    })
  }
  openIntegrateModal() {
    const dialog = this.dialog.open(IntegrationCheckFlowComponent, {
      backdropClass: 'backdrop-background',
      data: {
        campaignId: this.campaignId
      }
    });
    dialog.afterClosed().subscribe((result: any) => {
      if (result?.accessToken) {
        this.integrationChanged.emit(result)
      }
    })
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

  integrateVessel() {
    this.emailIntegrationService.vesselIntegration().subscribe((resp: any) => {
      console.log(JSON.parse(resp.object).linkToken)
    })
  }
}
