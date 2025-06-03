import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-editor-help-text',
  templateUrl: './email-editor-help-text.component.html',
  styleUrls: ['./email-editor-help-text.component.scss']
})
export class EmailEditorHelpTextComponent implements OnInit {

  @Input() helpText : string = ''
  expanded: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
