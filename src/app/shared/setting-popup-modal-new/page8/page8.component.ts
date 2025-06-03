import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { objectSettingsLabels } from 'src/app/model/objectives';
import { ObjectiveService } from 'src/app/service/resource/objective.service';

@Component({
  selector: 'app-page8',
  templateUrl: './page8.component.html',
  styleUrls: ['./page8.component.scss']
})
export class Page8Component implements OnInit {

  @Output() pageAction = new EventEmitter<any>();
  @Input() step8Data: any[] = [];
  @Input() prevStep: number = 0;
  @Input() nextStep: number = 0;
  @Input() createLabelPosition: number = 0;
  @Input() campId: any = '';
  labelEmptyMsgDiv: boolean = false;
  labelSearchvalue: any;
  labelSelection = new SelectionModel<objectSettingsLabels>(true,[]);
  showResultsForLabel: boolean = false;
  labelListResult : any[]= [];
  labelNAmeList: any[] =[]; 
  labelColorList:string[]=[]; 
  labelList : any[] = [];
  successValue: boolean = false;
  errorValue: boolean = false;
  labelNotSelected: boolean = false;
  shownotExist : boolean = false;

  constructor(
    private objectiveSerivce : ObjectiveService
  ) { }

  ngOnInit(): void {
    this.getAllLabels(this.campId)
  }

  getAllLabels(campID:string){
    this.labelEmptyMsgDiv = true;
    this.objectiveSerivce.getAllLabelsForCampaign(campID).subscribe((res:any)=>{
      if(res.list.length == 0 ){
        this.labelEmptyMsgDiv = true;
      }else if(res.list.length>0){
        this.labelEmptyMsgDiv = false;
      }
      this.labelList = res.list;
      this.labelNAmeList = [];
      this.labelColorList = [];
      this.labelList.forEach((obj:any)=>{
       this.labelNAmeList.push(obj.labelName);
       this.labelColorList.push(obj.labelColor);
      });
    });
  }

  getvalueOfLabel(event:any){
    this.labelSearchvalue = event.value;
    if(this.labelSearchvalue == ''){
      this.showResultsForLabel = true;
    }else if(this.labelSearchvalue !== ''){
      this.showResultsForLabel = true;
      this.labelListResult = this.filterArray(this.labelList,'labelName',event.value);
      // this.labelListResult = this.searchLabel(event.value, this.labelNAmeList);
      if(this.labelListResult.length ==0){
        this.shownotExist = true;
      }else if(this.labelListResult.length>0){
        this.shownotExist = false;
      }
    }
  }
//   filterArray(array, fields, value) {
//     array = array.filter((item) => {
//         const found = fields.every((field, index) => { 
//             return item[field] && item[field] === value[index]
//         })
//         return found
//     });
//     return array;
// }

  filterArray(array:any, fields:any, value:any) {
    fields = Array.isArray(fields) ? fields : [fields];
    
    return array.filter((item:any) => fields.some((field:any) => item[field].includes(value)));
  }
  searchLabel(value: any,list:any){
    let filter = value.toLowerCase();
    return list.filter((option: string) => option.toLowerCase().includes(filter));
  }
  nextOnLabel(){
    const paylod = {
      labelId:'',
      campaignId : this.campId,
      label : this.labelSelection.selected,
    }
    this.objectiveSerivce.addLabel(paylod).subscribe(
      (resp : any) => {
        this.pageAction.emit({
          page : this.nextStep
        })
      }
    )
  }
  checkClickOutside(){
    this.showResultsForLabel = false;
  }
  labelchecked(){
    if(this.labelSelection.selected.length>0){
     this.labelNotSelected = false;
    }else if(this.labelSelection.selected.length == 0){
     this.labelNotSelected = true;
    }
   }
   clickedOnLabelResults(item:any,index:any){
      this.labelSelection.select(item);
   }
   addNewLabel(){
    localStorage.setItem('NewLabelAdded',this.labelSearchvalue);
    
   }
   ngOnDestroy(){
    localStorage.removeItem('campaignCreateFlow');
   }
}
