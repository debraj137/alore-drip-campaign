import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PromptService } from 'src/app/service/resource/prompt.service';

@Component({
  selector: 'app-prompts',
  templateUrl: './prompts.component.html',
  styleUrls: ['./prompts.component.scss']
})
export class PromptsComponent implements OnInit {

  disabledButton: boolean = false;
  subDomains: any = [];
  currentPromt: string = ''

  domains: any = [ ];
  constructor(
    public dialogRef: MatDialogRef<PromptsComponent>,
    public promptService: PromptService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.promptService.getPromptTypes().subscribe((resp: any)=> {
      if(resp.responseCodeJson.code === 200)
        this.domains = resp.list
    })
  }

  chooseDomain(domain: any){
    this.promptService.getPromptSubTypes(domain.typeId).subscribe((resp: any) => {
      if(resp.responseCodeJson.code === 200){
        this.subDomains = resp.list
      } 
    })
    
  }

  usePrompt(){
    this.promptService.setPrompt(this.currentPromt);
    this.dialogRef.close();
  }

  setCurrentPrompt(subTypeId: string){
    this.promptService.getExamplePrompt(subTypeId).subscribe((resp: any) => {
      if(resp.responseCodeJson.code === 200){
        this.currentPromt = resp.object
      } 
    })
   
  }

  trackByName(index: number, name: string){
    return name;
  }

}
