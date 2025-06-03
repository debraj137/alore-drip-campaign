import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation, ChangeDetectorRef, SimpleChanges, OnChanges, Renderer2  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PromptService } from '../../service/resource/prompt.service';

import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { PromptsComponent } from './prompts/prompts.component';
@Component({
  selector: 'app-chat-gpt',
  templateUrl: './chat-gpt.component.html',
  styleUrls: ['./chat-gpt.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatGptComponent implements OnInit, OnChanges{

  response =  new FormControl('Generating response...');
  @ViewChild('highlight') private highlight !: ElementRef;


  closePrompt = new BehaviorSubject(false);
  tokenLeft: number = 0;
  showTicks = false;
  thumbLabel = true;
  showDropdown: boolean = false;

  
  temprature: number = 0;
  maximumLength: number = 0;
  topP: number = 0;
  frequence_penalty: number = 0;
  presence_penalty: number = 0;
  promptValue: string = ''
  prompt: string = ''
  chatId: string = ''
  
  

  constructor(
    private promptService: PromptService,
    private dialog: MatDialog,
    private elementRef: ElementRef,
    private cdRef: ChangeDetectorRef,
    private renderer2: Renderer2
  ) { }

  ngOnInit(): void {
    this.response.setValue('Add your prompt!!')
    this.promptService.$prompt.subscribe((resp) => {
      this.addClassToPrompt(resp)
    })

    this.renderer2.listen('span', "click", () => {
      console.log("I am going to delete you");
    });
      
    
  }

  ngOnChanges(s: SimpleChanges){
    console.log(s)
  }

  addClassToPrompt(resp: string){

    resp.replace(/(<([^>]+)>)/ig,'');
    resp = resp.replace(/(\r\n|\r|\n)/g, '<br>')

    resp = resp.replace(/\[/g,'<span  class="highlight" > ')
    resp = resp.replace(/\]/g,'</span>');

    // this.prompt.nativeElement.innerHTML = resp;
    this.promptValue = resp;
    this.prompt = resp;
    this.cdRef.detectChanges();
    
  }

  sendToMailEditor(){
    this.promptService.setEmailBody(this.response.value)
  }

  sendPrompt(){
    this.response.setValue('Generating response...');
    
  

    const payload = {
      prompt: this.prompt ,
      role: 'user',
      userName: 'Divyansh',
      maxToken: 2048,
      chatId: this.chatId
    }

   
    this.promptValue = ''
    this.prompt = '';
    this.promptService.promptConverstation(payload).subscribe((resp: any) => {
      
      this.tokenLeft = 2048 - resp?.object?.usage?.total_tokens;
      this.response.setValue(resp.object.choices[0].message.content);
      this.chatId = resp?.object?.chatId

    })
  }

  saveSettings(){
    const payload = {
      prompt: this.prompt ,
      role: 'user',
      userName: '',
    
      maxToken: this.maximumLength,
    }

    this.promptService.promptConverstation(payload).subscribe((resp: any) => {      
      this.tokenLeft = 2048 - resp?.object?.usage?.total_tokens;

    })
  }

  openPrompt(){
    const dialog = this.dialog.open(PromptsComponent, {
      backdropClass: 'backdrop-background',
     
    });
  
  }


  closePopup(){
    this.promptService.closeChatPrompt()
  }

  selectPrompt(){
    this.openPrompt(); 
  }

  getInnnerHTML(target : any){
    this.prompt = target.innerText

  }

  clickedHighlight(event: any){
    if(event.keyCode == 8){
      console.log(event)
    }
    
  }
  



 

}
