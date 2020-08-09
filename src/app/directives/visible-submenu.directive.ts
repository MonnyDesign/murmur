import { Directive, ElementRef, Renderer2, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appVisibleSubmenu]'
})
export class VisibleSubmenuDirective {

  constructor(public elRef: ElementRef, public renderer: Renderer2) { }

  @Output() navListHovered = new EventEmitter<boolean>();
  @Output() navListClick = new EventEmitter<any>();
  
  @HostListener('mouseover') onMouseOver(){
      this.renderer.addClass(this.elRef.nativeElement, 'is-visible');
      this.renderer.addClass(this.elRef.nativeElement, 'hovered');
      this.navListHovered.emit(true);
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.renderer.removeClass(this.elRef.nativeElement, 'is-visible');
    this.renderer.removeClass(this.elRef.nativeElement, 'hovered');
    this.navListHovered.emit(false);
  }

}
