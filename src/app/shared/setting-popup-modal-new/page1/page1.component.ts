import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ObjectiveService } from 'src/app/service/resource/objective.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {

  @Output() pageAction = new EventEmitter<any>();
  @Input() recipeId : any;
  @Input() campId : any;
  @Input() step1Data: number = 0;
  selectedOption: number = 1;

  constructor(
    private objectiveService : ObjectiveService
  ) { }

  ngOnInit(): void {
    if (this.step1Data) {
      this.selectedOption = this.step1Data
    }
  }

  checkSelection(){
    if(this.selectedOption == 1){
      this.objectiveService.ContinueWithTheDefaultSettings(
        this.recipeId
        ,this.campId
      ).subscribe(
        (res:any)=>{
          // if success it will close the dialog
          this.pageAction.emit({
            page : 0
          })
        }
      );
    }
    else{
      // it will next to page 2
      this.pageAction.emit({
        page : 2
      })
    }
  }
}
