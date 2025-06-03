import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmailIntegrationService } from 'src/app/service/resource/email-integration.service';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  message : string = 'generating email...'
  campID: any;
  baseID: any

  constructor(
    private route : ActivatedRoute,
    private integrationService: EmailIntegrationService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.campID = localStorage.getItem('campaignId');
    this.baseID = localStorage.getItem('baseId');
    const code : string = this.route.snapshot.queryParamMap.get('code') || '';



    
    if (code) {
      // checking campaign id from localstorage
      // verifying email
      this.verifyEmail(code);
    }

  }

  verifyEmail(code : string) {

    this.integrationService.verifyIntegration(code,this.campID, this.baseID).subscribe((resp: any) => {

        if (resp.responseCodeJson.code === 200 && resp.responseCodeJson.message.toLowerCase() === 'success') {
          this.message = 'email integrated successfully'
          localStorage.setItem('verifyStatus', JSON.stringify(resp.object))
          
        } else if(resp.responseCodeJson.message === 'SameEmail already integrated') {
          this.message = 'This email is already integrated. An email address can be be part of just one warm up campaign.'
          localStorage.setItem('verifyStatus', '0')
        } else {
          this.message = resp.responseCodeJson.message
          localStorage.setItem('verifyStatus', '0')
        }

      
        setTimeout(() => {
          window.close();
        }, 2000)
        
      
        
      
      
        //window.location.href = environment.loginPageUrl;

      },
      
      (error) => {
        window.opener = self;
        window.close();
      }
    )
  }

}
