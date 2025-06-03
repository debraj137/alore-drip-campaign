import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { label } from 'src/app/model/objectives';
import { ObjectiveService } from 'src/app/service/resource/objective.service';

@Component({
  selector: 'app-page9',
  templateUrl: './page9.component.html',
  styleUrls: ['./page9.component.scss']
})
export class Page9Component implements OnInit {

  @Output() pageAction = new EventEmitter<any>();
  @Input() campId: any = '';
  searchTag: string = ''
  formControl = this.fb.group({
    color: [null, Validators.required],
    tag: [null, Validators.required],
    tagId :[null]
  });
  tagsControl = this.fb.group({})
  tempSelectedTag: string = '';
  errorMessage: string = '';
  tagsList: string[] = []
  colorSelections : string[] = [
    '#EEEEEE','#CCCCCC','#ACACAC','#666666','#444444',
    '#83CC8B','#61C76C','#20C933','#00B514','#338A17',
    '#AFB5FF','#8E96FF','#6B76FF','#3140FF','#0013FF',
    '#FFB598','#FF9E79','#FF7844','#FF4700','#C53700',
    '#FF9FF2','#FE67E9','#F638DC','#FF00DC','#D600B8',
    '#FFE3AF','#FFD68C','#FFC55C','#FDB22B','#E89500',
    '#FFB3C8','#FF8CAD','#FF4E81','#FF0049','#DA0240',
    '#C2F5E9','#72DDC3','#20D9D2','#7BC8C3','#06A09B',
    '#D0F0FD','#77D1F3','#18BFFF','#4083AC','#0B76B7',
    '#CFDFFF','#9CC7FF','#2D7FF9','#0067FF','#0054D1'
  ];
  deletedTags: string[] = [];
  labelList : any[] = [];
  tagsCounter: number = 0;
  labelEmptyMsgDiv: boolean = false;
  newLabel: any = '';


  constructor(
    private objectiveService : ObjectiveService,
    public fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllLabels();
    this.formControl.controls['color'].setValue(this.colorSelections[2]);
  }

  addLabel() {
    const formControl = this.formControl.value
    // validate when adding tag tags
    if (this.validateExistTags(formControl.tag)) {
      this.errorMessage = 'Label already exist'
    } else if (!this.formControl.valid) {
      this.errorMessage = 'Please select color & fill tag field'
    } else {
      this.addLabelControl(
        formControl.tag,
        formControl.color,
        
        
        true,
        formControl.tagId || '',
       
      )
      this.searchTag = ''
    }
  }

  selectColor(color : string) {

    if (this.tempSelectedTag) {
      this.tagsControl.get(`${this.tempSelectedTag}.color`)?.setValue(color)
    } else {
      this.formControl.controls['color'].setValue(color)
    }
  }
  checkTag(){
    const formControl = this.formControl.value
    // validate when adding tag tags
    if (this.validateExistTags(formControl.tag)) {
      this.errorMessage = 'Label already exist'
    }else{
      this.errorMessage = ''
    }
  }

  validateExistTags(tagName : string) : boolean {
    const tagValidation = this.tagsData.filter(
      (data : string) => {
        const tag = this.tagsControl.get(`${data}.tag`)?.value
        return tag === tagName
      }
    )
    return tagValidation.length >= 1
  }

  getAllLabels(){
    this.newLabel = localStorage.getItem('NewLabelAdded');
    this.objectiveService.getAllLabelsForCampaign(this.campId).subscribe((res:any)=>{
      this.labelList = res.list;

      this.goToEditLabel();
    });
  
  }
  goToEditLabel(){
    this.tagsList = [];
    this.labelList.forEach((obj : label) => {
      this.addLabelControl(
        obj.labelName,
        obj.labelColor,
        false,
        obj.labelId
      )
    });
    if(localStorage.getItem('NewLabelAdded')){
      this.addLabelControl(this.newLabel,this.colorSelections[Math.floor(Math.random() * this.colorSelections.length)],false,'');
      localStorage.removeItem('NewLabelAdded');
    }
  }
  addLabelControl(
    labelName : string,
    labelColor : string,
    
    placeOnTop : boolean,
    labelId : string
  ){
    this.tagsCounter += 1
    if (placeOnTop) {
      this.tagsList.unshift('tags' + this.tagsCounter)
    } else {
      this.tagsList.push('tags' + this.tagsCounter)
    }
  
    this.tagsControl.addControl(
      'tags' + this.tagsCounter,
      this.fb.group({
        tagId: [ labelId || '' ],
        color: [ labelColor, Validators.required],
        tag: [ labelName, Validators.required]
      })
    )
    const tagControl = this.formControl.controls['tag'];
    tagControl.setValue(null);
    const colorControl = this.formControl.controls['color'];
    colorControl.setValue(this.colorSelections[Math.floor(Math.random() * this.colorSelections.length)])
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.tagsData,
      event.previousIndex,
      event.currentIndex
    );
  }

  removeControl(tagName : string) {
    let tagID:string = ''
    tagID = this.tagsControl.get(tagName)?.value.tagId
    this.deletedTags.push(tagID);
    this.tagsList = this.tagsList.filter(
      (value : string) => {
        return value !== tagName
      }
    )
    this.tagsControl.removeControl(tagName)
  }

  submitTagData() {
    // if theres a deleted data it will be submitted first
    if (this.deletedTags.length >= 1) {
      this.deletedTags.forEach((tagId : string) => {
        this.removeTags(tagId);
      });
    }

    // updating label data
    const label : any[] = [];
    this.tagsList.forEach(
      (value:string) =>{
        const labelControl = this.tagsControl.controls[value].value
        label.push({
          labelColor : labelControl.color,
          labelName : labelControl.tag,
          
          labelId : labelControl.tagId
        });
        
      }
    )
    const payload = {
      labelId:'',
      campaignId : this.campId,
      label : label
    };

    this.objectiveService.addLabel(payload).subscribe(
      (res:any)=>{
        if (res.responseCodeJson.code === 200) {
          this.pageAction.emit({page : 11})
          this.getAllLabels();
        }
    })
  }

  removeTags(tagId : string) {
    if (tagId) {
      this.objectiveService.removeLabels(tagId).subscribe(
        (resp : any) => {
          if (resp.responseCodeJson.code === 200) {
            // no action provided
          }
        }
      )
    }
  }

  get tagsData() : string[] {
    const tagControl = this.tagsControl.value
    // if search data value exist it will return tag with included text on search
    if (this.searchTag) {
      return this.tagsList.filter((value : string) => {
        const tag = this.tagsControl.get(`${value}.tag`)?.value
        return tag.includes(this.searchTag)
      })
    } else {
      return this.tagsList;
    }
  }
}
