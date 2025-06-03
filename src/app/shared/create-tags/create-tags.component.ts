import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Inject, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl,  Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { IAddTagPayload, ICampaignTagData, ITagItem } from 'src/app/model/tag';
import { LayoutService } from 'src/app/service/core/layout.service';
import { TagsService } from 'src/app/service/resource/tags.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomTagComponent } from './custom-tag/custom-tag.component';


interface tagsData {
  color: string;
  tag: string;
  tagType : number;
  tagId: string;
}

interface ICreateTagDialogData {
  campaignId: string;
  tags: ICampaignTagData[];
}

@Component({
  selector: 'app-create-tags',
  templateUrl: './create-tags.component.html',
  styleUrls: ['./create-tags.component.scss']
})
export class CreateTagsComponent implements OnInit {

  @ViewChild('searchTagInput') searchTagInput!: ElementRef<HTMLInputElement>;

  tempSelectedTag: string = '';
  filteredTags!: Observable<tagsData[]>;
  searchTag = new FormControl('');
  selectedTag: tagsData[] = []

  errorMessage: string = '';
  tagsCounter: number = 0
  
  deletedTags: string[] = []
  tagsControl = this.fb.group({})
  tagsList: string[] = []

  companySizeControl : FormControl = new FormControl();
  industryControl : FormControl = new FormControl();
  geographyControl : FormControl = new FormControl();
  jobTitleControl : FormControl = new FormControl();

  campaignId: string = JSON.parse(JSON.stringify(localStorage.getItem("campaignId")));


  colorSelections : string[] = [
 
    '#83CC8B','#61C76C',
    '#AFB5FF','#8E96FF',
    '#FFB598','#FF9E79',
    '#FF9FF2','#FE67E9',
    '#FFE3AF','#FFD68C',
    '#FFB3C8','#FF8CAD',
    '#C2F5E9','#72DDC3',
    '#77D1F3',
    '#CFDFFF','#9CC7FF',
  ]



  
  companySize: string[] = [
    'Self-Employed',
    '1-50',
    '51-100',
    '101-500',
    '501-1000',
    '1001-5000'
  ]

  industries: string[] = [
    'Software Development',
    'IT',
    'Marketing Services',
    'Human Resurce Services',
    'SASS',
    'ITES'
  ]

  geographies: string[] = [
    'Australia', 'Singapore','UAE','India','Netherland','France','Germany','United Kingdom','USA'
  ]

  jobTitles: string[] = [
    'C.E.O','C.O.O','C.T.O','C.H.O','C.M.O','Vice President','Director'
  ]

  constructor(
    public dialogRef: MatDialogRef<CreateTagsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICreateTagDialogData,
    private fb: FormBuilder,
    private tagService : TagsService,
    private layoutService: LayoutService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.companySizeControl.valueChanges.subscribe((resp) => {
      this.selectedTag.push({
        color: this.getRandomColor,
        tag: resp,
        tagType: 1,
        tagId: ''
      })
    })

    this.industryControl.valueChanges.subscribe((resp) => {
      this.selectedTag.push({
        color: this.getRandomColor,
        tag: resp,
        tagType: 2,
        tagId: ''
      })
    })


    this.geographyControl.valueChanges.subscribe((resp) => {
      this.selectedTag.push({
        color: this.getRandomColor,
        tag: resp,
        tagType: 3,
        tagId: ''
      })
    })


    this.jobTitleControl.valueChanges.subscribe((resp) => {
      this.selectedTag.push({
        color: this.getRandomColor,
        tag: resp,
        tagType: 4,
        tagId: ''
      })
    })


    this.getTagData()

    if(this.data.tags?.length) {
      this.data.tags.forEach((obj : any) => {

        let bclr : string = obj.borderColor
       if('borderColor' in obj){
        bclr = obj.borderColor;
        }

        this.selectedTag.push({
          color: bclr,
          tag: obj.name,
          tagId: obj.tagId,
          tagType: obj.tagType
        })
      })
    }

  
  }

  openCustomTagDialog(){
    const dialog = this.dialog.open(CustomTagComponent, {
      
      backdropClass: 'backdrop-background',
    });

    dialog.afterClosed().subscribe(
      (res: any)=>{
        // Receive data from dialog component
        // res contains data sent from the dialog
        this.selectedTag.push({
          color: this.getRandomColor,
          tag: res.tagValue,
          tagType: res.tagType,
          tagId: ''
        })
      }
    );
  }

  

  getTagData() {
    this.tagService.getTagList(this.campaignId).subscribe(
      (resp : any) => {
        if (resp.responseCodeJson.code === 200) {

          resp.list.forEach((obj : ITagItem) => {
            
          });

          this.filteredTags = this.searchTag.valueChanges.pipe(
            startWith(''),
            map(tag => (tag ? this.filterUser(tag) : this.tagsData.slice())),
          );
        }
      }
    )
  }

  filterUser(value: string): tagsData[] {
    if(typeof value === 'string') {
      const filterValue = value?.toLowerCase();
      return this.tagsData.filter((tag : tagsData) => {
        return tag.tag.toLowerCase().includes(filterValue)
      });
    } else {
      return []
    }
  }

  submitTagData() {
    // if theres a deleted data it will be submitted first
    if (this.deletedTags.length >= 1) {
      this.deletedTags.forEach((tagId : string) => {
        this.removeTags(tagId);
      })
    }

    // saving attached tag to campaign
    this.saveTag();

    // updating tag data
    const payload : IAddTagPayload[] = []
    
    this.selectedTag.map((obj: any) => {

      payload.push({
        userId: this.layoutService.usrCompObj.userId,
        tagId : obj.tagId,
        name: obj.tag,
        borderColor: obj.color,
        textColor: '#000000'
      })
    })
    

    
    this.tagService.addTags(payload,this.campaignId).subscribe(
      (resp : any) => {
        if (resp.responseCodeJson.code === 200) {
          // add notification here
          this.dialogRef.close()
        }
      }
    )
  }

  addTags(value: string) {
    
    
  }

  removeTagChips(tag: tagsData): void {
    const index = this.selectedTag.indexOf(tag);

    if (index >= 0) {
      this.selectedTag.splice(index, 1);
      this.removeTags(tag.tagId)
    }

  }


  saveTag() {
    const tags : string[] = this.selectedTag.map((obj : tagsData) => {
      return obj.tag
    })
    this.tagService.addTagsToCampaign(
      tags, this.data.campaignId
    ).subscribe((resp : any) => {
      // action required
    })
  }

 

  

  removeTags(tagId : string) {
    if (tagId) {
      this.tagService.removeTags(tagId).subscribe(
        (resp : any) => {
          if (resp.responseCodeJson.code === 200) {
            // add notitifcation
          }
        }
      )
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.tagsList,
      event.previousIndex,
      event.currentIndex
    );
  }

  validateExistTags(tagName : string) : boolean {
    const tagValidation = this.tagsList.filter(
      (data : string) => {
        const tag = this.tagsControl.get(`${data}.tag`)?.value
        return tag === tagName
      } 
    )
    return tagValidation.length >= 1
  }

  get tagsData() : any[] {
    // if search data value exist it will return tag with included text on search
    const filteredTag = this.tagsList.map((value : string) => {
      const tag = this.tagsControl.get(`${value}`)?.value
      return tag
    })
    return filteredTag
  }

  get getRandomColor() : string{
    const randomNumber = Math.floor(Math.random() * (49 - 0 + 1))%16;
    return this.colorSelections[randomNumber]
  }

  companySizeValue(i: any) {
    let value = this.companySize[i];
    this.companySizeControl.setValue(value);
  }

  industry(i: any) {
    let value = this.industries[i];
    this.industryControl.setValue(value);
  }

  geography(i: any) {
    let value = this.geographies[i];
    this.geographyControl.setValue(value);
  }

  jobTitle(i: any) {
    let value = this.jobTitles[i];
    this.jobTitleControl.setValue(value);
  }

}
