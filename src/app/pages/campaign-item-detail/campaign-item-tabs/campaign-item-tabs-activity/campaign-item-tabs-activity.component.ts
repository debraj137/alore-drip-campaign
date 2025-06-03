import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IActivityItem } from 'src/app/model/activity';
import { ActivityService } from 'src/app/service/resource/activity.service';
import { FaqService } from 'src/app/service/resource/faq.service';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { ProspectService } from 'src/app/service/resource/prospect.service';
import { IcsvFileDetail } from 'src/app/model/setting';

export interface IActivityType {
  style: string;
  icon: string;
  title: string;
}

@Component({
  selector: 'app-campaign-item-tabs-activity',
  templateUrl: './campaign-item-tabs-activity.component.html',
  styleUrls: ['./campaign-item-tabs-activity.component.scss']
})
export class CampaignItemTabsActivityComponent implements OnInit {

  @Output() changeToDatabaseTab = new EventEmitter<boolean>(false);

  loader: boolean = true;
  activityItem: IActivityItem[] = []
  campId: any = '';
  shortName: string = '';
  subShortName: string = '';
  csvDetail!: IcsvFileDetail;
  pageNo: number = 0;

  constructor(
    private activityService: ActivityService,
    private activeRoute: ActivatedRoute,
    public campaignService: CampaignService,
    private faqService: FaqService,
    private prospectService: ProspectService
  ) { }

  ngOnInit(): void {
    this.campId = this.activeRoute.snapshot.paramMap.get('campaignId');
    this.getCsvData()
    this.getActivityData(this.campId);
    this.faqService.setPageNumber(6);


  }

  getActivityData(campid: any) {
    this.loader = true
    this.activityService.getActivityList(campid, this.pageNo++).subscribe(
      (resp: any) => {
        this.loader = false
        if (resp.responseCodeJson.code === 200) {
          this.activityItem = resp.list
        }
        this.activityItem.forEach((element: any) => {
   
          if (element.activityType === 1) {
            if (element.lastName !== null) {
              this.shortName = element.firstName[0] + element.lastName[0]
              this.subShortName = this.shortName[0]
            } else {
              this.shortName = element.firstName[0] + element.firstName[1]
              this.subShortName = this.shortName[0]
            }
          }
        });
        this.campaignService.activityBadgeCount(this.campId)
      }
    )
  }

  getActivity(activity: number): IActivityType {
    switch (activity) {
      case 1:
        return {
          style: 'small',
          icon: '',
          title: ''
        }
      case 2:
        return {
          style: 'small',
          icon: '',
          title: ''
        }
      case 3:
        return {
          style: 'success',
          icon: '#success',
          title: 'Campaign started successfully'
        }
        break;
      case 4:
        return {
          style: 'warning',
          icon: '#pause',
          title: 'Campaign paused'
        }
        break;
      case 5:
        return {
          style: 'danger',
          icon: '#alert',
          title: 'Integration error'
        }
        break;
      case 6:
        return {
          style: 'danger',
          icon: '#stopped',
          title: 'Campaign stopped'
        }
        break;
      case 7:
        return {
          style: 'success',
          icon: '#upload',
          title: 'File upload successful'
        }
        break;
      case 8:
        return {
          style: 'info',
          icon: '#sent',
          title: 'Daily Report sent'
        }
        break;

        case 9:
          return {
            style: 'danger',
            icon: '#remove-favorite',
            title: 'Invite Excepted'
          }
          break;

          case 10:
            return {
              style: 'success',
              icon: '#add-to-favorite',
              title: 'Campaign added to Favourite'
            }
            break;
            

      case 11:
        return {
          style: 'danger',
          icon: '#remove-favorite',
          title: 'Campaign removed from Favourite'
        }
        break;

        case 12:
          return {
            style: 'success',
            icon: '#add-to-favorite',
            title: 'Successfully Integrated'
          }
          break;
     

      default:
        return {
          style: '',
          icon: '',
          title: ''
        }
        break;
    }
  }

  getCsvData() {
    this.prospectService.getCsvFile(this.campId).subscribe((res: any) => {
      if (res.responseCodeJson?.code == 200) {
        this.csvDetail = res.object;
      } else {
        this.csvDetail.filePath = "../../../../../assets/sample.csv/sample.csv";
      }
    })
  }

  downloadCsv() {
    let link = document.createElement('a');
    document.body.appendChild(link);
    link.download = this.csvDetail.fileName;
    link.href = this.csvDetail.filePath;
    link.click();
    document.body.removeChild(link);
  }

  getTime(dateString: string) {
    const date = new Date(dateString)
    return this.verifyNumberDigit(date.getHours()) + ':' + this.verifyNumberDigit(date.getMinutes())
  }

  verifyNumberDigit(num: number) {
    if (num <= 9) {
      return '0' + num
    } else {
      return num
    }
  }

  onScroll(){
    this.activityService.getActivityList(this.campId, this.pageNo++).subscribe(
      (resp: any) => {
        this.loader = false
        if (resp.responseCodeJson.code === 200) {
          this.activityItem.push(...resp.list)
        }
        this.activityItem.forEach((element: any) => {
   
          if (element.activityType === 1) {
            if (element.lastName !== null) {
              this.shortName = element.firstName[0] + element.lastName[0]
              this.subShortName = this.shortName[0]
            } else {
              this.shortName = element.firstName[0] + element.firstName[1]
              this.subShortName = this.shortName[0]
            }
          }
        });
    
      }
    )
  }
}
