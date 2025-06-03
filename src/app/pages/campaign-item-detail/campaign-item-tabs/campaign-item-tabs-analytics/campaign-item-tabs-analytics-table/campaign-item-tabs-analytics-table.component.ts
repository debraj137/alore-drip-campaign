import { ActivatedRoute } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ICampaignItem } from 'src/app/model/campaign';
import { AnalyticsService } from 'src/app/service/resource/analytics.service';
import { FaqService } from 'src/app/service/resource/faq.service';
import { CampaignService } from 'src/app/service/resource/campaign.service';
import { IMailData } from 'src/app/model/mail-sequence';

@Component({
  selector: 'app-campaign-item-tabs-analytics-table',
  templateUrl: './campaign-item-tabs-analytics-table.component.html',
  styleUrls: [
    './campaign-item-tabs-analytics-table.component.scss',
    '../../../../../../assets/style/custom-material-table.scss'
  ]
})
export class CampaignItemTabsAnalyticsTableComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event : any) {
    this.windowWidth = window.innerWidth;
  }

  columns: string[] = [
    'select',
    'mail_sequence',
    'status',
    'total_sent',
    'to_be_sent',
    'open_rate',
    'reply_rate',
    'bounce_rate',
    'reply_count',
    'open_count',
    // 'positive',
    // 'negative',
    // 'neutral',
    // 'create_date',
    'email_last_sent',
  ];
  values = ['mail_sequence'];
  columnsWithoutFirstIndex = this.columns.filter(item => !this.values.includes(item));
  hidedColumn: string[] = [];
  dataSource = new MatTableDataSource<ICampaignItem>();
  selection = new SelectionModel<ICampaignItem>(true, []);
  mailSequenceData: IMailData[] = [];
  selectCheckbox = false;
  allComplete: boolean = false;
  loading: boolean = true;
  baseId: any;
  campaignId: any;
  windowWidth: number = 0;
  defaultList: any;

  constructor(
    private analyticsService: AnalyticsService,
    private activatedRoute: ActivatedRoute,
    private faqService: FaqService,
    private getPersonalizedMail: CampaignService
  ) {

    this.windowWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.faqService.setPageNumber(3);
    this.baseId = this.activatedRoute.snapshot.paramMap.get('baseid');
    this.campaignId = this.activatedRoute.snapshot.paramMap.get('campaignId');
    this.getPersonalizedEmailReport();

  }

  getPersonalizedEmail() {
    this.getPersonalizedMail.getCampaignMailSequence(this.campaignId).subscribe((resp: any) => {
      this.mailSequenceData = resp.list;
    })
  }
  getDateDifference(date: string): string {

    if(date == '0' || date == null || date == ''){
      return "Inactive"
    }

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

  getPersonalizedEmailReport() {
    this.loading = true;
    this.analyticsService.getPersonalizedEmailReport(this.campaignId).then(
      (response: any) => {
        this.dataSource.data = response.list;
        this.defaultList = response.list
        this.loading = false;
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAll() {
    if (this.isAllSelected() || this.selection.hasValue()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: ICampaignItem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  filterTableHeader(label: string) {
    return label.replace(/_/g, ' ');
  }

  onSelectChecbox() {
    this.selectCheckbox = !this.selectCheckbox;
  }

  onSelectChecboxItem(index: number) {
    // const item = document.querySelector(
    //   `.checkbox-item-${index}`
    // ) as HTMLButtonElement;
    // item.classList.toggle('enabledBox');
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
