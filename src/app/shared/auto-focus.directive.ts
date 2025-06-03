import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class AutoFocusDirective implements AfterViewInit {

  @Input()
  public focus: boolean = false;
  
  constructor(
    private element: ElementRef
  ) { }
 

  ngAfterViewInit(): void {
  
    setTimeout(() => {
      if(this.focus) {
        this.element.nativeElement.focus();
      }
        }, 500)
  }

}
