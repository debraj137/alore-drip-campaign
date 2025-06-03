import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IcsvFileDetail } from 'src/app/model/setting';
import { ProspectService } from 'src/app/service/resource/prospect.service';

@Component({
  selector: 'app-prospect1',
  templateUrl: './prospect1.component.html',
  styleUrls: ['./prospect1.component.scss']
})
export class Prospect1Component implements OnInit {
@Input() campaignId:string=""
  @Output() selectionChanges = new EventEmitter<any>();
  @Input() step1Model: number = 1;
  csvDetail:IcsvFileDetail={
    id: 0,
    createdDate: 0,
    updatedDate: 0,
    deleted: 0,
    csvUploadDataId: '',
    filePath: '',
    fileName: '',
    extension: '',
    campaignId: ''
  };
  step1Selection = [
    {
      label: 'Create new leads',
      desc: 'Create new Leads & ignore from the list any leads that has been already uploaded.'
    },
    {
      label: 'Create new Leads & Update new records of existing leads',
      desc: 'Create new Leads & update only the new records of existing list (no overwrite)'
    },
    {
      label: 'Create new Leads & Update all records of existing leads',
      desc: 'Create new Leads & Update all records of existing leads (overwrite old data)'
    },
    {
      label: 'Update existing leads',
      desc: 'Download existing leads, edit offline and update records (overwrite old data)'
    }
  ]

  constructor(
    private prospectService:ProspectService
  ) { }

  ngOnInit(): void {
    this.prospectService.getCsvFile(this.campaignId).subscribe((res:any)=>{
      if(res.responseCodeJson?.code==200){
        this.csvDetail=res.object;
      
      }else{
        this.csvDetail.filePath="../../../../../assets/sample.csv/sample.csv";
      }

    })
  }

  valueChanges() {
    this.selectionChanges.emit(this.step1Model)
  }
}
