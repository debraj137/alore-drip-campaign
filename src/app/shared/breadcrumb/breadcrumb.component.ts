import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() data: any;
  @Output() selectedLink = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit(
  ): void {
 
  }

  navigate(link: string) {
    this.selectedLink.emit(link)
    this.router.navigateByUrl(link);
  }
}
