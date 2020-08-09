import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]' 
})
export class HoverDirective {


  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseOver(){
      this.renderer.addClass(this.elRef.nativeElement, 'open');

  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.elRef.nativeElement, 'open');
  }

}
