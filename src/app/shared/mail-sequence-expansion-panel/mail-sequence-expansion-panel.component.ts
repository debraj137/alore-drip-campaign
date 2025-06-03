import { CampaignService } from './../../service/resource/campaign.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IMailData } from 'src/app/model/mail-sequence';
import { ThemeService } from 'ng2-charts';
import { LayoutService } from 'src/app/service/core/layout.service';
import { SideMenuTreeService } from 'src/app/service/core/side-menu-tree.service';
import { SharePermissionEnum } from 'src/app/model/enum/share-permission-enum';

@Component({
  selector: 'app-mail-sequence-expansion-panel',
  templateUrl: './mail-sequence-expansion-panel.component.html',
  styleUrls: ['./mail-sequence-expansion-panel.component.scss']
})
export class MailSequenceExpansionPanelComponent implements OnInit {
  [x: string]: any;

  @Output() refreshMailSequence = new EventEmitter<boolean>(false);
  @Input() editButton : boolean = false;
  @Input() addButton : boolean = false;
  @Input() mailIntergv : boolean = false;
  @Input() mailSequence: IMailData[] = []
  campaignId: string = '';
  baseCampaignId: string = '';
  mailSequenceBadge:number=0;
  currentIndex: number = 0;
  isSubjectMissing: boolean = false;
  isBodyMissing: boolean = false;
  isMailAbsent: boolean = false;
  loader: boolean = true;



  constructor(
    private activatedRoute: ActivatedRoute,
    private campaignService: CampaignService,
    private layoutService: LayoutService,
    public SideMenuTreeService: SideMenuTreeService,
    private route: Router
  ) { }
  ngOnInit(): void {
    this.campaignId = this.activatedRoute.snapshot.paramMap.get('campaignId') || '';
    this.baseCampaignId = this.activatedRoute.snapshot.paramMap.get('baseid') || '';
    this.expand();
    this.campaignService.getCampaignMailSequence(this.campaignId).subscribe((resp: any) => {
      
      if(resp.responseCodeJson.code === 200){

        if(resp.list.length <= 0 && 
           !this.activatedRoute.snapshot.routeConfig?.path?.includes('objectives'))
          this.isMailAbsent = true;

        
      }

      this.loader = false;
      
    })
  }

  goToEditor() {
    this.route.navigateByUrl(`campaign-Details/${this.baseCampaignId}/campaign-item-detail/${this.campaignId}/email-editor/${this.currentIndex}`);
  }
 
  expand(value : boolean = true) {
    this.mailSequence.forEach((obj : IMailData) => {
      obj.expand = value;
    }); 
  }

  toggleIcon(index: any){
    this.mailSequence[index].expand = !this.mailSequence[index].expand;
 
  }

  addEmail() {
    this.campaignService.createMailSequence(
      this.campaignId,
      this.mailSequence.length
    ).subscribe((resp) => {
      this.refreshMailSequence.emit(true);
    })
  }


  getCampaignMailSequence(body:string,subject:string) :number{
    var tot:number=0;

    if(body != '' && body != null)
    body = body.trim();

    if(subject != '' && subject != null)
    subject = subject.trim();
    
    this.isBodyMissing = false;
    this.isSubjectMissing = false;

    let emptyArray = ["Add Body","<p>Add Body<p>","","<p></p>", null, undefined]
    if(emptyArray.includes(body)){
      this.isBodyMissing = true;
      tot+=1;

    }if(emptyArray.includes(subject)){
      this.isSubjectMissing = true;
      tot+=1;
    }
    
  
      return tot;
  }


  get getUserRole() {
    switch (this.layoutService.campaignAccess.value?.toString()) {
      case SharePermissionEnum.OWNER:
        return true
        break;
      case SharePermissionEnum.EDITOR:
        return true
        break;
    
      default:
        return false
        break;
    }
  }


  specificAccordian(i: number) {
    this.currentIndex = i
    this.route.navigateByUrl(`campaign-Details/${this.baseCampaignId}/campaign-item-detail/${this.campaignId}/email-editor/${this.currentIndex}`);
  }

  clikedOnEmail(particularItem : any) {
    
    this.SideMenuTreeService.currentSelectedEmail.next({
      body: particularItem.body,
      subject: particularItem.subject,
      personalizedEmailId: particularItem.personalizedEmailId
    })
    this.SideMenuTreeService.mailChanged.next(true)
  }

  get getNavEmailStatus() {
    let bool: Boolean = this.layoutService.getSidebarStatus;
    return bool;
  }
}
