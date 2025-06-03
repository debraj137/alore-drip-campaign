import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { ProspectService } from 'src/app/service/resource/prospect.service';
import { AgGridEmailFieldComponent } from 'src/app/shared/ag-grid-custom-field/ag-grid-email-field/ag-grid-email-field.component';

@Component({
  selector: 'app-prospect6',
  templateUrl: './prospect6.component.html',
  styleUrls: ['./prospect6.component.scss']
})
export class Prospect6Component implements OnInit {

  @Input() csvId: string = '';
  @Output() isUploadSuccess = new EventEmitter<any>();

  private gridApi!: GridApi<any>;
  filterData: any[] = [{
    type: 'where',
    column: null,
    contains: null,
    value: null
  }]
  tableHeader: any[] = [];
  tableData: any[] = [];
  filteredTableData: any[] = []
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
  loader: boolean = true;
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 110,
    editable: true,
    resizable: true,
  };
  isFilterActive: boolean = false;
  totalFilterUsed: number = 0;
  rowCounter: number = 0
  campId: any;

  constructor(
    private prospectService: ProspectService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.campId = localStorage.getItem("campaignId")
  }

  resetFilter() {
    this.filterData = [{
      type: 'where',
      column: null,
      contains: null,
      value: null
    }]
    this.isFilterActive = false
    this.totalFilterUsed = 0
    this.filteredTableData = []
    this.rowCounter = this.getTableData.length
  }

  applyFilter() {
    this.isFilterActive = true
    this.filteredTableData = []
    this.tableData.forEach((data: any) => {
      let filterCondition: any = ''
      this.filterData.forEach((obj: any) => {
        let condition: string = ''
        switch (obj.contains.replace(/\./g, '')) {
          case 'contains':
            condition = `data.${obj.column.field}.includes('${obj.value}')`
            break;
          case 'doesNotContains':
            condition = `!data.${obj.column.field}.includes('${obj.value}')`
            break;
          case 'is':
            condition = `data.${obj.column.field} === '${obj.value}'`
            break
          case 'isEqualTo':
            if (typeof eval(`data.${obj.column.field}`) === 'number') {
              condition = `data.${obj.column.field} === '${obj.value}'`
            }
            break;
          case 'isNot':
            condition = `data.${obj.column.field} !== '${obj.value}'`
            break;
          case 'isNotEqualTo':
            if (typeof eval(`data.${obj.column.field}`) === 'number') {
              condition = `data.${obj.column.field} !== '${obj.value}'`
            }
            break;
          case 'isEmpty':
            condition = `!data.${obj.column.field}`
            break;
          case 'isNotEmpty':
            condition = `data.${obj.column.field}`
            break;
          case 'isGreaterThan':
            if (typeof eval(`data.${obj.column.field}`) === 'number') {
              condition = `data.${obj.column.field} > '${obj.value}'`
            }
            break;
          case 'isLesserThan':
            if (typeof eval(`data.${obj.column.field}`) === 'number') {
              condition = `data.${obj.column.field} < '${obj.value}'`
            }
            break;
          case 'isGreaterThanEqualTo':
            if (typeof eval(`data.${obj.column.field}`) === 'number') {
              condition = `data.${obj.column.field} >= '${obj.value}'`
            }
            break;
          default:
            break;
        }
        let caseCondition = ''
        if (filterCondition.length) {
          caseCondition = obj.type !== 'or' ? ' && ' : ' || '
        }
        filterCondition += caseCondition + condition
      })
      if (eval(filterCondition)) {
        this.filteredTableData.push(data)
      }
    })
    this.totalFilterUsed = this.filterData.length
    this.rowCounter = this.getTableData.length
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.loader = true
    this.prospectService.getCsvPreview(this.csvId).subscribe((resp: any) => {
      this.loader = false
      if (resp.responseCodeJson.code === 200) {
        this.tableHeader = []
        this.rowCounter = resp.list.length - 1
        resp.list.forEach((value: any, index: number) => {
          if (index <= 0) {
            // mapping header data
            const headerData = resp.list[index]
            headerData.forEach((value: string) => {
              let field : any
              if (value === 'email') {
                field = {
                  headerName: this.replaceUnderscore(this.camelToUnderscore(value)),
                  field: value,
                  cellRenderer: AgGridEmailFieldComponent
                }
              } else {
                field = {
                  headerName: this.replaceUnderscore(this.camelToUnderscore(value)),
                  field: value,
                }
              }
              this.tableHeader.push(field)
            })
          } else {
            let data: any = {}
            this.tableHeader.forEach((obj: any, i: number) => {
              data[obj.field] = value[i]
            })
            this.tableData.push(data)
          }
          if ((index+1) === resp.list.length) {
            const dataSource: IDatasource = {
              rowCount: undefined,
              getRows: (params: IGetRowsParams) => {
                const data = this.tableData
                // At this point in your code, you would call the server.
                // To make the demo look real, wait for 500ms before returning
                setTimeout(function () {
                  // take a slice of the total rows
                  const rowsThisPage = data.slice(params.startRow, params.endRow);
                  // if on or after the last page, work out the last row.
                  let lastRow = -1;
                  if (data.length <= params.endRow) {
                    lastRow = data.length;
                  }
                  // call the success callback
                  params.successCallback(rowsThisPage, lastRow);
                }, 500);
              },
            };
            params.api!.setDatasource(dataSource);
          }


        });
      }
    })
  }

  onCellEditingStopped(event: any) {
    this.prospectService.updateProspect(event.data, this.campId).subscribe((resp: any) => {
   
    })
  }

  removeFilter(filterId: number) {
    this.filterData = this.filterData.filter((obj: any) => {
      return obj.id !== filterId
    })
  }

  addFilter() {
    this.filterData.push({
      type: this.filterData.length >= 2 ? this.filterData[1].type : 'and',
      column: '',
      contains: '',
      value: '',
      id: Math.random() * (9999 - 1) + 1
    })
  }

  changeGridHeight(height: number) {
    this.rowHeight = height;
    this.gridApi?.resetRowHeights()
  }

  downloadCsv() {
    let link = document.createElement('a');
    document.body.appendChild(link);
    // link.download = this.csvDetail.fileName;
    // link.href = this.csvDetail.filePath;
    link.click();
    document.body.removeChild(link);
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

  uploadData() {
    let dataList: any[] = [];
    let tableHeader: string[] = []
    this.tableData.forEach((obj: any) => {
      let tempData: string[] = []
      Object.keys(obj).forEach((key) => {
        tempData.push(obj[key])
      });
      dataList.push(tempData)
    })
    this.tableHeader.forEach((obj : any) => {
      tableHeader.push(obj.field)
    })
    let data = [tableHeader].concat(dataList)
    this.prospectService.uploadCsvPreview(data, this.csvId).subscribe((resp : any) => {
      if (resp.responseCodeJson.code === 200) {
        this.isUploadSuccess.emit(true)
      }
    })
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

  get getTableData(): any[] {
    if (this.filteredTableData.length || this.isFilterActive) {
      return this.filteredTableData
    } else {
      return this.tableData
    }
  }
}
