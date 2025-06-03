import { Component, OnInit } from '@angular/core';
import { FaqService } from 'src/app/service/resource/faq.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadProspectComponent } from 'src/app/shared/database/upload-prospect/upload-prospect.component';
import { ActivatedRoute } from '@angular/router';
import { ProspectService } from 'src/app/service/resource/prospect.service';
import { ColDef, ColumnApi, FirstDataRenderedEvent, GridApi, GridReadyEvent, IDatasource, IGetRowsParams, ValueGetterParams } from 'ag-grid-community';
import { IcsvFileDetail } from 'src/app/model/setting';
import { AgGridEmailFieldComponent } from 'src/app/shared/ag-grid-custom-field/ag-grid-email-field/ag-grid-email-field.component';
import { LayoutService } from 'src/app/service/core/layout.service';
import { lastValueFrom } from 'rxjs';
import { AgGridTagsFieldComponent } from 'src/app/shared/ag-grid-custom-field/ag-grid-tags-field/ag-grid-tags-field.component';
import { AgGridHeaderFieldComponent } from 'src/app/shared/ag-grid-custom-field/ag-grid-header-field/ag-grid-header-field.component';
import { SharePermissionEnum } from 'src/app/model/enum/share-permission-enum';
import { AgGridProspectFieldComponent } from 'src/app/shared/ag-grid-custom-field/ag-grid-prospect-field/ag-grid-prospect-field.component';
import { AgGridTagComponent } from 'src/app/shared/ag-grid-custom-field/ag-grid-tag/ag-grid-tag.component';
import { objectivesSettingsDays } from '../../../../model/objectives';
import Pusher from 'pusher-js';
import * as PusherTypes from 'pusher-js';
import { CampaignDbRefreshPopupComponent } from './campaign-db-refresh-popup/campaign-db-refresh-popup.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AddProspectDatabaseComponent } from './add-prospect-database/add-prospect-database.component';

@Component({
  selector: 'app-campaign-item-tabs-database',
  templateUrl: './campaign-item-tabs-database.component.html',
  styleUrls: [
    './campaign-item-tabs-database.component.scss',
    '../../../../../assets/style/form-field.scss'
  ]
})


export class CampaignItemTabsDatabaseComponent implements OnInit {

  private gridApi!: GridApi<any>;
  private gridColumnApi!: ColumnApi;
  loader: boolean = true;
  tableLoader: boolean = true;
  successValue: boolean = false;
  errorValue: boolean = false;
  value: string = '';
  campId: string = '';
  tableHeader: any[] = [];
  tableData: any[] = [];
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    editable: true,
    resizable: true,

  };
  maxTableLength: number = 100;
  csvDetail!: IcsvFileDetail;
  rowCounter: number = 0;
  liveProspectStatus: number = 0;
  totalFilterUsed: number = 0;
  page: number = 0;
  pusher: any = "";
  inputRow: {} = {};
  pinnedTopRowData = [this.inputRow];

  isDataEmpty: boolean = false;
  isChannelOpen: boolean = false;
  isUploadComplete: boolean = false;
  breadcrumbData: any[] = [];
  prospectId: string = ''
  components: {
    [p: string]: any;
  } = {
      agColumnHeader: AgGridHeaderFieldComponent,
      agProspect: AgGridProspectFieldComponent,
    };


  rowHeight: number = 40
  rowHeightSelection: any[] = [
    {
      label: 'Small',
      value: 30
    },
    {
      label: 'Medium',
      value: 40
    },
    {
      label: 'Large',
      value: 50
    }
  ]
  filterData: any[] = [{
    type: 'where',
    column: null,
    contain: null,
    value: null
  }]
  containType = {
    // case type :
    // contains includes('value')
    // doesNotContains !includes('value')
    // is === value
    // isNot !== value
    // isEmpty === null
    // isNotEmpty !== null
    // isEqualTo ===
    // isNotEqualTo !==
    // isGreaterThan >
    // isLesserThan <
    // isGreaterThanEqualTo >==
    // isWithin date range
    // isBefore before value
    // isAfter after value
    // isOnOrBefore before or selected value
    // isOnOrAfter after or selected value
    // isAnyOf
    // isNoneOf

    containType1: [
      'contains',
      'doesNotContains',
      'is....',
      'isNot...',
      'isEmpty',
      'isNotEmpty'
    ],
    containType2: [
      'isEqualTo...',
      'isNotEqualTo...',
      'isGreaterThan',
      'isLesserThan..',
      'isGreaterThanEqualTo..',
      'isEmpty',
      'isNotEmpty'
    ],
    containType3: [
      'is....',
      'isNot...',
      'isAnyOf...',
      'isNoneOf...',
      'isEmpty',
      'isNotEmpty'
    ],
    containType4: [
      'is...',
      'isWithin...',
      'isBefore...',
      'isAfter...',
      'isOnOrBefore...',
      'isOnOrAfter',
      'isEmpty',
      'isNotEmpty'
    ],
    containType5: [
      'hasAnyOf..',
      'hasAllOf...',
      'isExactly...',
      'hasNoneOf...',
      'isEmpty',
      'isNotEmpty'
    ]
  }

  

  constructor(
    private dialog: MatDialog,
    private faqService: FaqService,
    private activeRoute: ActivatedRoute,
    private prospectService: ProspectService,
    
    public layoutService: LayoutService
  ) {
    this.pusher = new Pusher("6923d798e727ea103799", {
      cluster: "ap2",
    })
  }


  ngOnInit(): void {
  
    this.campId = this.activeRoute.snapshot.paramMap.get('campaignId') || '';
    this.faqService.setPageNumber(5);
    this.listenChannel()
    this.layoutService.databaseBadge.subscribe((value: number) => {
      this.getTableHeader();
      this.getCsvData();
    })

    // this.dialog.open(AddProspectDatabaseComponent)

    

    this.layoutService.databaseHeader.subscribe((value: any) => {
      setTimeout(() => {
        const allColumnIds: string[] = [];
       
        this.gridColumnApi?.getColumns()!.forEach((column) => {

          if (column.getId() === "tags")
            allColumnIds.push("tagList");

          else
            allColumnIds.push(column.getId());
        });
        this.gridColumnApi?.autoSizeColumns(allColumnIds, false);
      }, 200);
    })
  }

  listenChannel(){

  
    
  
    let channel = this.pusher.subscribe(this.campId)

    
    let callback = channel.bind('ProspectUpload', (resp: any, metadata: any) => {
      if(resp){
        this.liveProspectStatus = resp.ProspectCount;
        this.isChannelOpen = true;
      }
    })


    let callback2  = channel.bind('uploadComplete', (resp: any, metadata: any) => {
   
        this.isUploadComplete = resp.completed;
        setTimeout(() => {
          const dialog = this.dialog.open(CampaignDbRefreshPopupComponent, {
      
            backdropClass: 'backdrop-background',
          });
        },2000)
      
      
    })

   
  }


  resetFilter() {
    if (this.totalFilterUsed) {
      this.filterData = [{
        type: 'where',
        column: null,
        contain: null,
        value: null
      }]
      this.page = 1
      this.totalFilterUsed = 0
      this.getTableHeader()
    }
  }

  onRowEditingStarted(event: any) {

  }

  onCellEditingStopped(event: any) {
    this.prospectService.updateProspect(event.data, this.campId).subscribe((resp: any) => {

    })
  }

  getTableHeader() {
    this.loader = true
    this.prospectService.getProspectAttribute(this.campId).subscribe((resp: any) => {
      if (resp.responseCodeJson.code === 200) {
        this.loader = false
        const tableHeader: any[] = []
        let rowCounter = {
          headerName: '',
          editable: true,
          maxWidth: 65,
          valueGetter: "node.rowIndex + 1",
        }
        tableHeader.push(rowCounter)


        resp.list.forEach((value: string) => {
          let field: any
          switch (value) {

            case 'Status': {
              field = {
                headerName: this.replaceUnderscore(this.camelToUnderscore(value)),
                field: value,
                editable: false,
                cellRenderer: AgGridProspectFieldComponent
              }
            }
              break
            case 'email':
              field = {
                headerName: this.replaceUnderscore(this.camelToUnderscore(value)),
                field: value,
                editable: true,
                cellRenderer: AgGridEmailFieldComponent
              }
              break;
            case 'tags':
              field = {
                headerName: this.replaceUnderscore(this.camelToUnderscore(value)),
                field: "tagList",
                editable: false,
                minWidth: 300,
                cellRenderer: AgGridTagComponent
              }
              break;

            default:
              field = {
                headerName: this.replaceUnderscore(this.camelToUnderscore(value)),
                editable: true,
                field: value,
              }
              break;
          }
          tableHeader.push(field)
        });
        this.layoutService.databaseHeader.next(tableHeader)
        this.layoutService.databaseHeaderOrigin.next(tableHeader)
      }
    })
  }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;

    this.gridColumnApi = params.columnApi;

    const dataSource: IDatasource = {
      rowCount: undefined,
      getRows: async (params: IGetRowsParams) => {
        if (this.totalFilterUsed <= 0) {
          const prospectResp: any = await lastValueFrom(this.prospectService.getCampaignProspect(this.campId, this.page))
          this.tableLoader = true;
          const data = await prospectResp.list
          

          if (data.object < 1 && this.page < 1) {
            this.isDataEmpty = true;
          }

          if (data.length >= 1) {
            this.prospectId = data[0].prospectId
            if (data.length <= 50) {
              this.maxTableLength = data.length
            }


            // this.tableData = data;
            this.tableData = [
              ...data
            ]

         

            this.rowCounter = prospectResp.object
          
            this.page += 1

            // At this point in your code, you would call the server.
            // To make the demo look real, wait for 500ms before returning
            setTimeout(async () => {
              // if on or after the last page, work out the last row.
              let lastRow = -1;
              if (this.rowCounter <= params.endRow) {
                lastRow = this.rowCounter <= 50 ? this.tableData.length : this.rowCounter;
              }
              // call the success callback
              params.successCallback(this.tableData, lastRow);
              params.failCallback();
            }, 500);


          } else {
            this.isDataEmpty = true;
          }
        } else {
          params.successCallback(this.tableData, this.tableData.length);
        }
      },
      destroy() {
          
      },
    };


    params.api!.setDatasource(dataSource);

    setTimeout(() => {
      const allColumnIds: string[] = [];
      this.gridColumnApi.getColumns()!.forEach((column) => {
        allColumnIds.push(column.getId());
      });
      this.gridColumnApi.autoSizeColumns(allColumnIds, false);
    }, 200);
  }

  getCampaignProspect(): any {

    this.prospectService.getCampaignProspect(this.campId)
      .subscribe(async (resp: any) => {

        if (resp.responseCodeJson.code === 200) {
          // this.loader = false
          this.tableData = resp.list
          this.rowCounter = resp.object;
          return resp

        }
      })
  }

  addFilter() {
    this.filterData.push({
      type: this.filterData.length >= 2 ? this.filterData[1].type : 'and',
      column: '',
      contain: '',
      value: '',
      id: Math.random() * (9999 - 1) + 1
    })
  }

  removeFilter(filterId: number) {
    this.filterData = this.filterData.filter((obj: any) => {
      return obj.id !== filterId
    })
  }

  applyFilter() {
    const payload = {
      campaignId: this.campId,
      sortByReq: null,
      commonFilterRequest: {
        type: this.filterData.length >= 2 ? this.filterData[1].type : 'and',
        filterRequestList: this.filterData.map((obj: any) => {
          return {
            clauseType: obj.contains.replace(/\./g, ''),
            columnName: obj.column.headerName,
            columnValue: obj.value
          }
        })
      }
    }
    this.loader = true
    this.prospectService.getFilteredProspect(payload).subscribe(
      (resp: any) => {
        if (resp.responseCodeJson.code === 200) {
          this.page = 1
          this.rowCounter = this.rowCounter
          this.totalFilterUsed = payload.commonFilterRequest.filterRequestList.length
          this.loader = false
          this.tableData = resp.list
          this.isDataEmpty = false;
        }
      }
    )
  }

  camelToUnderscore(key: string): string {
    if (key) {
      var result = key.replace(/([A-Z])/g, " $1");
      return result.split(' ').join('_');
    } else {
      return ''
    }
  }

  replaceUnderscore(key: string): string {
    if (key) {
      let text = key.replace(/_/g, ' ')
      text = text[0].toUpperCase() + text.slice(1);
      return text
    } else {
      return ''
    }
  }

  getvalue() {
    this.value = this.value.trim();
    if (this.value == 'naman') {
      this.errorValue = true;
      this.successValue = false;
    } else if (this.value == 'chandan') {
      this.successValue = true;
      this.errorValue = false;
    } else {
      this.successValue = false;
      this.errorValue = false;
    }
  }

  getContainType(filteredField: string): string[] {
    switch (filteredField) {
      case 'phone':
      case 'workPhone':
        return this.containType.containType2
        break;
      case 'tags':
        return this.containType.containType3
        break;
      case 'date':
        return this.containType.containType4
        break;
      case 'multipleTags':
        return this.containType.containType5
        break;
      default:
        return this.containType.containType1
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



  get isFilterButtonEnabled(): boolean {
    let status: number[] = []
    this.filterData.forEach((obj: any) => {
      if (obj.type && obj.column && obj.contains && obj.value) {
        status.push(1)
      } else {
        status.push(0)
      }
    })
    return status.includes(0)
  }


  get getUserRole() {
    switch (this.layoutService.campaignAccess.value?.toString()) {
      case SharePermissionEnum.OWNER:
        return true
        break;
      case SharePermissionEnum.EDITOR:
        return true
        break;

      default:
        return false
        break;
    }
  }

  addProspectToDb(){
    const dialogRef = this.dialog.open(AddProspectDatabaseComponent, {
      data : {
        campaignId: this.campId,
        prospectId: this.prospectId
      }
    })

    dialogRef.afterClosed().subscribe((resp) => {
  
      console.log(this.tableData)
       this.tableData.push(resp)
    })
   
  }

  
}


