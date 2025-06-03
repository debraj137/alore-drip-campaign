import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ProspectService } from 'src/app/service/resource/prospect.service';
import { MatChipInputEvent } from '@angular/material/chips';
import{FormControl} from '@angular/forms';
@Component({
  selector: 'app-ag-grid-tags-field',
  templateUrl: './ag-grid-tags-field.component.html',
  styleUrls: ['./ag-grid-tags-field.component.scss']
})
export class AgGridTagsFieldComponent implements ICellRendererAngularComp, OnInit {
  
  
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public cellValue!: string;
  public tags: string[] = []
  public selectedTags: string[] = [];
  public paramsData: any;
  public triggerDropDown: boolean = false;
  public isLoaded = true;
  tagControl = new FormControl('');

  constructor(
    private prospectService: ProspectService
  ){

  }

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.tags = params.value;
    this.paramsData = params.data;
    this.isLoaded = true;
  }

  ngOnInit(): void {
      this.tagControl.valueChanges.subscribe((res) => {
          this.selectedTags = res;
      })
  }

  // gets called whenever the user gets the cell to refresh
  refresh(params: ICellRendererParams) {
    this.tags = params.value;
    return true;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.cellValue = this.tags.toString();
      this.selectedTags.push(value);
    }
    
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index,1);
      this.cellValue = this.tags.toString();
    }
  }

  
  

}
