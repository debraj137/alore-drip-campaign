import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/core/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-objective-card',
  templateUrl: './objective-card.component.html',
  styleUrls: ['./objective-card.component.scss'],
})
export class ObjectiveCardComponent implements OnInit {
  @Input() article: any;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {}

  getIcon(type: string): string {
    return this.commonService.getIcon(type);
  }
}
