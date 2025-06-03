import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LayoutService } from 'src/app/service/core/layout.service';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PromptService } from '../../service/resource/prompt.service';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],

})
export class MainLayoutComponent implements AfterViewChecked, OnInit {
  userObj: any = {};
  userList = new BehaviorSubject<any[]>([]);
  isAuthorized: boolean = true;
  faqSection: boolean = false;
  chatGPTSection: boolean = false;
  workCampaignBase: boolean = false;
  version : any;
  isloaded: boolean = false;
  showScrollBar: boolean = false;
  menuState = "";
  onEditorPage: boolean = true;

  constructor(
    public layoutService: LayoutService,
    public router: Router,
    public route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    public relaod : ToastNotificationService,
    private snackBar: MatSnackBar,
    private promptService: PromptService
   
  
  ) {}

  ngOnInit(): void {

    this.promptService.$close.subscribe((resp) => {
      if(resp == false){
          this.chatGPTSection = !this.chatGPTSection;
          this.cdRef.detectChanges();

      } 
    })

    addEventListener('offline', (event) => {
      this.snackBar.open("You are currently offline", "Ok", {
        duration: 3000
      })
    })

    addEventListener('online', (event) => {
      this.snackBar.open("You are back online", "Ok", {
        duration: 3000
      })
    })
    
    // this.emptyHardReload();
    
    if(!localStorage.getItem('campAnalytics'))
    localStorage.setItem('campAnalytics', JSON.stringify([]));
  }

  ngAfterViewChecked(): void {

    if (!this.isNavTreeShow) {
      this.layoutService.updateSidebarStatus(false);
      this.cdRef.detectChanges();
     
    }
    if (this.isNavTreeShow) {
      this.layoutService.updateSidebarStatus(true);
      this.cdRef.detectChanges();
      
    }
    
    
  }

  ngDoCheck(){
    let url = this.router.url;
   
    if(url.includes('campaign-Details'))
    this.showScrollBar = true;
    else
    this.showScrollBar = false;

    if(url.includes('email-editor'))
      this.onEditorPage = true;
    else
      this.onEditorPage = false;
    

   
  }

  setUserList() {
    const usrObj = JSON.parse(localStorage.getItem('usrCompObj') || '');
    const userData = {
      ...usrObj,
      firstName: this.userObj.firstName,
      lastName: this.userObj.lastName,
      email: this.userObj.userEmailId,
    };
    if (localStorage.getItem('usrList')) {
      const userList = JSON.parse(localStorage.getItem('usrList') || '');
      if (!userList.some((obj: any) => obj.userId === userData.userId)) {
        localStorage.setItem(
          'usrList',
          JSON.stringify([userData, ...userList])
        );
      }
    } else {
      localStorage.setItem('usrList', JSON.stringify([userData]));
    }
  }

  get currentRoute() : string {
    return this.router.url
  }

  get isNavTreeShow() {
    let bool: Boolean = this.layoutService.getSidebarStatus;
    return bool;
  }

  get getPaddingLeft() {
    return this.isNavTreeShow ? 155 : 420
  }

  convertToNumber(string: string) {
    return Number(string);
  }

  emptyHardReload() {
    this.relaod.hardreload().subscribe((resp:any) => {
      if(resp.responseCodeJson.code === 200) {
        this.isloaded = true;
        this.version = resp.list[0].version;

      }
    })
  }

  get refresh() {
    return window.location.reload();
  }

 }