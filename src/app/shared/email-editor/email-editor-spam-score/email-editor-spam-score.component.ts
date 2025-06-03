import { getRtlScrollAxisType } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISpamScore } from 'src/app/model/email-editor';
import { NotificationEnum } from 'src/app/model/enum/notification-enum';
import { SideMenuTreeService } from 'src/app/service/core/side-menu-tree.service';
import { ToastNotificationService } from 'src/app/service/core/toast-notification.service';
import { ScoreService } from 'src/app/service/resource/score.service';

@Component({
  selector: 'app-email-editor-spam-score',
  templateUrl: './email-editor-spam-score.component.html',
  styleUrls: ['./email-editor-spam-score.component.scss']
})
export class EmailEditorSpamScoreComponent implements OnInit {

  spamscoreDetail!:ISpamScore ;
  expanded: boolean = true;
  loader: boolean = false;
  spamScore: number = 0;
  campaignId: string = ''
  constructor(
    private score: ScoreService,
    private toastNotification: ToastNotificationService,
    private sideMenuService: SideMenuTreeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.campaignId = this.router.url.split('/')[4]
    // this.sideMenuService.currentSelectedEmail.subscribe((value : any) => {
    //   this.getScore();
    // })
  }

  getScore() {
    this.loader = true
    this.score.getScore(
      this.score.emailBody.value,
      this.score.emailSubject.value,
      this.campaignId
    ).subscribe((res: any) => {
      this.loader = false
      if (res.responseCodeJson.code == 200) {
        this.toastNotification.addNotification(
          'success!',
          ``,
          NotificationEnum.SUCCESS
        )
        this.score.recomendation.next(res.list)
        this.spamscoreDetail=res.object
        this.spamScore=this.spamscoreDetail.Score
      }
    })
  }
}
