import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailIntegrationService } from 'src/app/service/resource/email-integration.service';

@Component({
  selector: 'app-email-integration',
  templateUrl: './email-integration.component.html',
  styleUrls: ['./email-integration.component.scss']
})
export class EmailIntegrationComponent implements OnInit {

  campId : any;
  valueVerfication: any;
  baseId: any;

  @Output() integrationAction = new EventEmitter<any>();
  @Input() campaignId : string = ''

  constructor(
    private integrationService : EmailIntegrationService,
    private router: Router,
    private route: ActivatedRoute
  
  ) { }

  ngOnInit(): void {

    this.campId =  localStorage.getItem('campaignId')
    this.baseId = localStorage.getItem('campaignBaseId')

  }

  getUrl(url : string) {
    this.integrationService.getIntegrationUrl(this.campId, url).subscribe(
      (resp : any) => {
     
        if (resp.responseCodeJson.code === 200) {
          this.goToLink(resp.object);
        }

        // setTimeout(() => {
        //   this.valueVerfication = localStorage.getItem("verifyStatus")
        //   if(this.valueVerfication.accessToken) {
        //     console.log(this.valueVerfication.accessToken)
             
            
        //   }
          
          
         
        // },11000)
        
      }
    )
  }

  goToLink(url: string){
    
    window.addEventListener('storage', () => {
      const verifyStatus = localStorage.getItem('verifyStatus')
      setTimeout(() => {
        if (verifyStatus !== '0') {
          this.integrationAction.emit({
            result : 'success',
            data : JSON.parse(verifyStatus || '{""}')
          })

        } else {
          this.integrationAction.emit({
            result : 'failed',
            data : JSON.parse(verifyStatus || '{""}')
          })
        }
        localStorage.removeItem('campId')
        localStorage.removeItem('verifyStatus')
        window.removeEventListener('storage', () => {})
        
        
        setTimeout(() => {
   
        let url = this.route.snapshot.url.toString();
 
        if(url.includes('objectives')){
          this.router.navigate([''])
        }
        else{
          window.location.reload();
        }

      }, 2000)
        
      },1000)
       
    })

    window.open(url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');

 
  }
}
