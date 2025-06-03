import { Component} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ICellRendererParams } from 'ag-grid-community';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-ag-grid-tag',
  templateUrl: './ag-grid-tag.component.html',
  styleUrls: ['./ag-grid-tag.component.scss']
})
export class AgGridTagComponent implements ICellRendererAngularComp{

  data: any;
  params: any;
  
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.data = params.value;

  }

  refresh(params: ICellRendererParams) {
    this.data = params.value;
    return true;
  }

  onRemoveTag(data: string) {
    this.data = '';
    // this.tableService.rowDataSet[this.params.rowIndex][this.params.colDef.field] = '';
    this.params.colDef.fieldType.includes('custom') ? this.updateCustomTags(this.data) : this.updateInbuiltTags();
  }

  checkSingleTagValue(): boolean {
    return JSON.stringify(this.data) !== '{}';
  }

  onRemoveMultiTag(index: number) {
    this.data.splice(index, 1);
    // this.tableService.rowDataSet[this.params.rowIndex][this.params.colDef.field] = this.data;
    this.params.colDef.fieldType.includes('custom') ? this.updateCustomTags(this.data) : this.updateInbuiltTags();
  }

  updateInbuiltTags() {
    
  }

  updateCustomTags(data: any): void {
    
  }









  
}
