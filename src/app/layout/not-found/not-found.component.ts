import { HostListener, Component, OnInit, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators'
import { Subscription } from 'rxjs';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {


  constructor(
    private router: Router
  ) {
    // this.subscription = router.events.subscribe((event) => {
    //     if(event instanceof NavigationStart){
    //       console.log
    //       this.router.navigate(['/']);
    //     }
    // })
   }

  ngOnInit(): void {
    // this.onRefresh()
  }

  // onRefresh(){
  //   this.router.events
  //   .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
  //   .subscribe(event => {
  //     if (
  //       event.id === 1 &&
  //       event.url === event.urlAfterRedirects
  //     ) {
  //       this.router.navigate(['']);
  //     }
  //   })
  // }

  ngOnDestroy(): void{
    // console.log("destroy not found")
    this.router.navigate(["' '"]);
  }

}
