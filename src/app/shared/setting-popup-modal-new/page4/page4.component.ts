import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ObjectiveService } from 'src/app/service/resource/objective.service';

@Component({
  selector: 'app-page4',
  templateUrl: './page4.component.html',
  styleUrls: ['./page4.component.scss']
})
export class Page4Component implements OnInit {

  @Output() pageAction = new EventEmitter<any>();
  @Input() campId: any = '';
  @Input() step4Data: number = 0;
  @Input() nextStep: number = 0;
  @Input() prevStep: number = 0;
  @Input() isSingleStep: boolean = false;
  
  volumeValue: number = 0;
  volumeSelection : number[] = [
    50, 100, 150, 200
  ]

  constructor(
    private objectiveService : ObjectiveService
  ) { }

  ngOnInit(): void {
    if (this.step4Data) {
      this.volumeValue = this.step4Data
    } else {
      this.volumeValue = 100;
    }
  }

  imposeMinMax(el: any) {
    if (el.value != "") {
      if (parseInt(el.value) < 1) {
        el.value = 1;
        this.volumeValue = 1 
      }
      if (parseInt(el.value) > 999) {
        el.value = 999;
        this.volumeValue = 999
      }
    }
  }

  sendVolume(){
    this.objectiveService.sendVolume(
      this.campId,
      this.volumeValue,
      5
    )
    .subscribe(
      (res:any)=>{
        
        this.pageAction.emit({
          page : this.isSingleStep ? 0 : this.nextStep,
          data : this.volumeValue
        })
      }
    );
  }
}
