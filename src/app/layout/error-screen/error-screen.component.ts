import { HostListener, Component, OnInit, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators'
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-error-screen',
  templateUrl: './error-screen.component.html',
  styleUrls: ['./error-screen.component.scss']
})

export class ErrorScreenComponent implements OnInit, OnDestroy{
  
  

  constructor(
    private router: Router
  ) { }
  
  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {

    this.router.navigate(["' '"]);
  }


}
