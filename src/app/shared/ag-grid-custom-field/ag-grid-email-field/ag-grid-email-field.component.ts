import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-email-field',
  templateUrl: './ag-grid-email-field.component.html',
  styleUrls: ['./ag-grid-email-field.component.scss']
})
export class AgGridEmailFieldComponent implements ICellRendererAngularComp  {

  public cellValue!: string;

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
  }

  // gets called whenever the user gets the cell to refresh
  refresh(params: ICellRendererParams) {
    // set value into cell again
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

 

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  validateEmail(email : string) {
    if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(email)) {
      return false
    } else {
      return true
    }
  }

  // return false;

}
