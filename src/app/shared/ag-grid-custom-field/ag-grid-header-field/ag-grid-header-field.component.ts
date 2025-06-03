import { Component, ElementRef, ViewChild } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';
import { LayoutService } from 'src/app/service/core/layout.service';

export interface ICustomHeaderParams {
  menuIcon: string;
}

@Component({
  selector: 'app-ag-grid-header-field',
  templateUrl: './ag-grid-header-field.component.html',
  styleUrls: ['./ag-grid-header-field.component.scss']
})
export class AgGridHeaderFieldComponent implements IHeaderAngularComp  {
  public params!: IHeaderParams & ICustomHeaderParams;

  headerChecked: boolean = false

  constructor(
    public layoutService: LayoutService
  ) {

  }

  @ViewChild('menuButton', { read: ElementRef }) public menuButton!: ElementRef;

  checkedHeader() {
    this.headerChecked = !this.headerChecked
  }

  agInit(params: IHeaderParams & ICustomHeaderParams): void {
    this.params = params;
  }

  onMenuClicked() {
    this.params.showColumnMenu(this.menuButton.nativeElement);
  }

  onSortRequested(order: 'asc' | 'desc' | null, event: any) {
    this.params.setSort(order, event.shiftKey);
  }

  changeHeader(index : number) {
    const selectedData = this.layoutService.databaseHeaderOrigin.value[index]
    const currentColIndex = Number(this.params.eGridHeader.ariaColIndex) - 1
    const filteredHeader = this.layoutService.databaseHeader.value.map((obj : any, index : number) => {
      if (index === currentColIndex) {
        return selectedData
      } else {
        return obj
      }
    })
    this.layoutService.databaseHeader.next(filteredHeader)
  }

  refresh(params: IHeaderParams) {
    return false;
  }
}
