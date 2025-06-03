import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph-loader',
  templateUrl: './graph-loader.component.html',
  styleUrls: ['./graph-loader.component.scss']
})
export class GraphLoaderComponent implements OnInit {

  @Input() title : string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
