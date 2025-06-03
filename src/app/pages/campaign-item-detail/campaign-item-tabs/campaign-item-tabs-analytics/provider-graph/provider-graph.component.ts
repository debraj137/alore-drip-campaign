import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-provider-graph',
  templateUrl: './provider-graph.component.html',
  styleUrls: ['./provider-graph.component.scss']
})
export class ProviderGraphComponent implements OnInit {

  baseId : string = ''
  campaignId : string = ''
  
  @Input() providerIndex: number = 0;

  constructor(
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.baseId = this.activatedRoute.snapshot.paramMap.get('baseid') || '';
    this.campaignId = this.activatedRoute.snapshot.paramMap.get('campaignId') || '';
  }

}
