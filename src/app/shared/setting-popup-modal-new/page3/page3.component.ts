import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPage3Data } from 'src/app/model/create-reciepe';
import { ObjectiveService } from 'src/app/service/resource/objective.service';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss']
})
export class Page3Component implements OnInit {

  @Output() pageAction = new EventEmitter<any>();
  @Input() emailNumberCounter : any;
  @Input() campId: any = '';
  @Input() step3Data!: IPage3Data;
  @Input() isValueFixed: boolean = false;
  @Input() nextStep: number = 0;
  @Input() prevStep: number = 0;
  emailCountNumber : any;
  campaignIdfromCampignPage:any;
  
  constructor(
    private objectiveService : ObjectiveService
  ) { }

  ngOnInit(): void {
    this.emailCountNumber = 5;
  }

  imposeMinMaxOfSeq(el:any){
    if(el.value){
      this.emailCountNumber = el.value as number;
      if(parseInt(el.value) < parseInt(el.min)){
        el.value = el.min;
        this.emailCountNumber = el.min as number;
      }
      if(parseInt(el.value) > parseInt(el.max)){
        el.value = el.max;
        this.emailCountNumber = el.max as number;
      }
    }
  }
  addEmailSequenceNumber(){
    this.objectiveService.addNumberOfEmailTemplate(
      this.campId, 
      this.emailCountNumber,
      4
    ).subscribe((resp : any) => {
      this.pageAction.emit({
        page : this.nextStep,
        data : {
          value : this.emailCountNumber,
          limit: this.step3Data.limit,
          templateData: resp?.list
        }
      })
    })
  }
}
