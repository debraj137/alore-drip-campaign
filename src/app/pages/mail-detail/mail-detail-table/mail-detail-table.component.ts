import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ICampaignItem } from 'src/app/model/campaign';
import { AnalyticsService } from 'src/app/service/resource/analytics.service';

@Component({
  selector: 'app-mail-detail-table',
  templateUrl: './mail-detail-table.component.html',
  styleUrls: [
    './mail-detail-table.component.scss',
    '../../../../assets/style/custom-material-table.scss',
  ],
})
export class MailDetailTableComponent implements OnInit {

  @Input() campaignId: string = ''
  @Input() mailId: string = '';
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth;
  }

  columns: string[] = [
    'date',
    'total_sent',
    'to_be_sent',
    'open_rate',
    'reply_rate',
    'bounce_rate',
    'reply_count',
    'open_count',
  ];

  values = ['date'];
  windowWidth: number = 0;

  defaultList: any;

  columnsWithoutFirstIndex = this.columns.filter(item => !this.values.includes(item));
  hidedColumn: string[] = [];
  dataSource = new MatTableDataSource<any>();
  totalLinks: number = 0;
  links: any;
  isLoading = false;

  constructor(
    private analyticService: AnalyticsService
  ) {
  }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
    const start = new Date(2022, 5, 15, 0, 0, 0, 0);
    const end = new Date(2022, 6, 15, 0, 0, 0, 0);
    const fromDate = `${start.getFullYear()}-${this.verifyNumberDigit(start.getMonth() + 1)}-${this.verifyNumberDigit(start.getDate())}`
    const toDate = `${end.getFullYear()}-${this.verifyNumberDigit(end.getMonth() + 1)}-${this.verifyNumberDigit(end.getDate())}`

    this.getEmailDayTable(fromDate, toDate);
  }

  getEmailDayTable(fromDate: string, toDate: string) {
    const payload = {
      campaignId: this.campaignId,
      emailId: this.mailId,
      fromDate: fromDate,
      toDate: toDate,
    };
    this.isLoading = true;
    this.analyticService
      .getPersonalizedEmailDayWish(payload)
      .subscribe((res: any) => {
        if (res.responseCodeJson.code === 200) {

          this.dataSource.data = res?.list;

          if (res.list.length > 0) {
            this.links = res?.list[0]?.links;


            let i = 1;
            this.links.map((obj: any) => {
              this.columns.push("" + obj.id)
              i++;
            })
            
          }
          this.isLoading = false;
        }
      });
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

  onHideColumn(columnName: string, value: any) {
    const isChecked = value;
    if (isChecked) {

      this.hidedColumn = this.hidedColumn.filter((data: string) => {
        return data !== columnName;
      });
    } else {
      this.hidedColumn.push(columnName);
    }
  }

  columnVisibility(columnName: string) {
    const isColumnHided = this.hidedColumn.find((data) => {
      return data === columnName;
    });
    return isColumnHided;
  }

  filterTableHeader(label: string) {
    // return label.replace(/_/g, ' ');
  }

  getTruncatedLink(link: string) {
    let tempLink = link.substring(7);

    if (tempLink.length > 11) {
      tempLink = tempLink.substring(0, 11) + "..."
    }

    return tempLink

    return tempLink
  }

  verifyNumberDigit(num: number) {
    if (num <= 9) {
      return '0' + num
    } else {
      return num
    }
  }

  get filteredColumnList(): string[] {
    const filteredColumn = this.columns.filter((data: string) => {
      if (this.windowWidth <= 1340) {
        return data !== 'positive' && data !== 'negative' && data !== 'neutral';
      } else {
        return data
      }
    });
    return filteredColumn
  }


  get getFilteredColumn(): string[] {
    {
      const filteredColumn = this.columns.filter((data: string) => {
        if (this.windowWidth <= 1340) {
          return !this.hidedColumn.includes(data) && data !== 'positive' && data !== 'negative' && data !== 'neutral';
        } else {
          return !this.hidedColumn.includes(data);
        }
      });
      return filteredColumn;
    }
  }
}


