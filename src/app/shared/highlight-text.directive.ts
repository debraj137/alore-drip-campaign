import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightText]'
})
export class HighlightTextDirective implements OnChanges {

  constructor(
    private elementRef: ElementRef
  ) { }
  @Input() input : string = '';
  @HostListener('input', ['$event'])
  onInput(e:any){
      // console.log(e.data)
  }

  ngOnChanges(changes: SimpleChanges){
    // console.log(changes['input']);
    // console.log(this.elementRef.nativeElement)
  }
}
