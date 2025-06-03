import { ObjectiveService } from './../../service/resource/objective.service';
import { Component, OnInit } from '@angular/core';
import { ELOOP } from 'constants';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SettingPopupModalNewComponent } from 'src/app/shared/setting-popup-modal-new/setting-popup-modal-new.component';
import { FaqService } from 'src/app/service/resource/faq.service';
import { LayoutService } from 'src/app/service/core/layout.service';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss']
})
export class ObjectiveComponent implements OnInit {

  breadcrumbData: any[] = [];
  aloreObjectiveList: any;
  backgroundImages: any;
  reciepeListOfCurrentObjective: any;
  newObjectList: any;
  yourObjectiveList: any;
  objectiveList: any;
  currentSelectedObj = 0;
  currentSelectedFlag: boolean = false;
  campaignId : string = '';


  constructor(
    private objectService: ObjectiveService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private dialog : MatDialog,
    private faqService: FaqService,
    public layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.layoutService.updateSidebarStatus(!this.getNavStatus)
    this.faqService.setPageNumber(1);
    this.campaignId = this.activatedRoute.snapshot.paramMap.get('campaignId') || '';
    localStorage.setItem('campaignId', this.campaignId)
    if (this.campaignId) {
      this.breadcrumbData = [
        {
          name: 'Home',
          link: '/',
        },
        {
          name: 'Select a recipe',
          link: '/objectives',
        },
      ];
      this.getAllobjectives();
      this.getObjectWithRecipes();
    } else {
      this.router.navigateByUrl('')
    }

    
  }

  get getNavStatus(): Boolean {
    let bool = this.layoutService.getSidebarStatus;
    return bool;
  }

  openReciepeForm() {

    const dialog = this.dialog.open(SettingPopupModalNewComponent, {
        backdropClass: 'backdrop-background',
        data: {
          isSingleStep : false,
          activeStep : 3, // prevent user inputing form step 1
          campaignId : this.campaignId,
          createObjective : false
        }
    });
  }

  createNewObjective() {
    const dialog = this.dialog.open(SettingPopupModalNewComponent, {
      backdropClass: 'backdrop-background',
      data: {
        isSingleStep : false,
        activeStep : 3, // prevent user inputing form step 1
        campaignId : this.campaignId,
        createObjective : true
      }
  });
  }

  getAllobjectives() {
    this.objectService.getAllobjectives().subscribe((response: any) => {
      this.objectiveList = response.list;
      this.aloreObjectiveList = response.list.filter((element: any) => {
        return element.type == 0;
      });
      this.yourObjectiveList = response.list.filter((element: any) => {
        return element.type == 1;
      });
    });
  }
  getAllImages() {
    this.objectService.getAllImages().subscribe((response: any) => {
      this.backgroundImages = response.list;
    });
  }

  getObjectSepcificreciepes(index: number) {
    this.objectService.getObjectSepcificreciepes(this.objectiveList[index].objectiveId).subscribe((res: any) => {
      this.reciepeListOfCurrentObjective = res.object;
    });
    this.currentSelectedObj = index;
    const element = document.getElementById("obj" + index) as HTMLElement;
    element.scrollIntoView();
    element.style.borderColor = "#334bfa";
  }

  getObjectWithRecipes() {
    this.objectService.getObjectWithRecipes().subscribe((res: any) => {
      this.newObjectList = res.list;
    })
  }

  
}
