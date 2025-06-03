import { Component, Input, OnInit } from '@angular/core';
import { FaqService, FaqStructure } from 'src/app/service/resource/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqStructure:FaqStructure[]=[];
 
  expanded: boolean = false;
  
  constructor(
    private faqService:FaqService
  ) { }

  ngOnInit(): void {

    this.faqService.getFaqs(this.faqService.pageType).subscribe((res:any)=>{
      this.faqStructure=res.list.map((obj:any)=>{
        return{
          ...obj,
          expanded: false,
        }
      });
     
    })
  }


}

// answer: "User needs to login/signup using a valid email id to start accessing campaign. Put a valid email to login/signup and start using the platform to create and accessing campaign"
// id: 875724
// question: "How to Sign up?"
// screenType: 0