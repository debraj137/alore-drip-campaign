import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prospect5',
  templateUrl: './prospect5.component.html',
  styleUrls: ['./prospect5.component.scss']
})
export class Prospect5Component implements OnInit {

  @Input() step5Model: any = null;

  constructor() { }

  ngOnInit(): void {
  }

}
