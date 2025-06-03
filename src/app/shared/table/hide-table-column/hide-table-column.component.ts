import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hide-table-column',
  templateUrl: './hide-table-column.component.html',
  styleUrls: ['./hide-table-column.component.scss']
})
export class HideTableColumnComponent implements OnInit {

  @Output() onHideColumnChanged = new EventEmitter<string[]>();
  @Input() columns : string[] = [];
  @Input() protectedColumn : string[] = [];
  hidedColumn : string[] = []

  constructor() { }



  ngOnInit(): void {
  }

  columnVisibility(columnName: string) {
    const isColumnHided = this.hidedColumn.find((data) => {
      return data === columnName;
    });
    return isColumnHided;
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
    this.onHideColumnChanged.emit(this.hidedColumn)
  }

  hideAll() {
    this.hidedColumn = this.columns.filter((value : string) => {
      return value !== 'select' && value !== 'campaign_name'
    })
    this.onHideColumnChanged.emit(this.hidedColumn)
  }

  showAll() {
    this.hidedColumn = []
    this.onHideColumnChanged.emit(this.hidedColumn)
  }

  filterTableHeader(label: string) {
    return label.replace(/_/g, ' ');
  }

}
