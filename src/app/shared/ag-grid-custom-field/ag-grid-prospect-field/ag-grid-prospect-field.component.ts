import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp, IHeaderAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IHeaderParams } from 'ag-grid-community';
import { LayoutService } from 'src/app/service/core/layout.service';
import { ProspectService } from 'src/app/service/resource/prospect.service';
import { ICustomHeaderParams } from '../ag-grid-header-field/ag-grid-header-field.component';
import { databaseAttribute } from 'src/app/model/databaseAttribute';

@Component({
  selector: 'app-ag-grid-prospect-field',
  templateUrl: './ag-grid-prospect-field.component.html',
  styleUrls: ['./ag-grid-prospect-field.component.scss']
})
export class AgGridProspectFieldComponent implements  ICellRendererAngularComp {
  
  value: string = "";
  public gotValue: boolean = false;
  private paramsData : any;
  statusValue = [
    {
      status: 'Blocked',
      value: 0
    },
    {
      status: 'Unsubscribe',
      value: 1
    },
    {
      status: 'Replied',
      value: 2
    },
    {
      status: 'Active',
      value: 3
    }
  ]


  public params!: IHeaderParams & ICustomHeaderParams;

  public cellValue!: any;
  firstLetter: any;
  finalvalue: any;


  constructor(
    public layoutService: LayoutService,
    public prospectService: ProspectService
  ) { }

 

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.cellValue =  this.getStatus(params);
    this.paramsData = params.data;
    
  }

  // gets called whenever the user gets the cell to refresh
  refresh(params: ICellRendererParams):boolean {
    // set value into cell again
    this.cellValue = this.getStatus(params);
    return true;
  }

  getStatus(params: ICellRendererParams) {

  
      if (params.data === undefined) {
        return
      }
      else{
      if(params.data.prospectStatusIndicator >= 0){
        this.cellValue = params.data.prospectStatusIndicator;
        }
        else{
          this.cellValue = 3;
        }
        this.getdata();
        return;
      }
        
  
    
  } 


  getdata() {
    switch (this.cellValue) {
      case 0:
        {
          this.value = "Blocked";
          this.firstLetter = this.value[0].toUpperCase()
          this.gotValue = true;
          
          return
        }

        case 1:
        {
          this.value = "Unsubscribed";
          this.firstLetter = this.value[0].toUpperCase()
          this.gotValue = true;
          

          return
        }

        case 2:
        {
          this.value = "Replied";
          this.firstLetter = this.value[0].toUpperCase()
          this.gotValue = true;
          
          return
        }

        case 3:
        {
          this.value = "Active";
          this.firstLetter = this.value[0].toUpperCase()
          this.gotValue = true;
          
          return
        }
    }
  }

  changeProspectData(index: number) {
    this.value = this.statusValue[index].status;
    const tableUpdate: databaseAttribute = {};
    tableUpdate.Status = this.value;
    this.cellValue = this.statusValue[index].status;
    this.paramsData.prospectStatusIndicator = index;
    this.prospectService.updateProspect(this.paramsData, localStorage.getItem("campaignId")).subscribe();

  }

  onCellEditingStopped(event: any) {
    let rowData = event.value;
  }
}
