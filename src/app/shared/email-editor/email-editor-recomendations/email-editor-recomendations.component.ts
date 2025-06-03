import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/service/resource/score.service';

@Component({
  selector: 'app-email-editor-recomendations',
  templateUrl: './email-editor-recomendations.component.html',
  styleUrls: ['./email-editor-recomendations.component.scss']
})
export class EmailEditorRecomendationsComponent implements OnInit {

  recomendationData: any[] = []
  expanded:boolean=false;

  recommendation: boolean = false;

  constructor(
    public scoreService: ScoreService,
  ) { }

  ngOnInit(): void {
    this.scoreService.recomendation.subscribe((value: any) => {
      if (value.length >= 1) {
        this.recomendationData = this.scoreService.recomendation.value
        .map((obj : any) => {
          return {
            value : obj,
            expanded : false
          }
        })
      } else {
        this.recomendationData = []
      }
    })



  }



}
