import { Directive, HostListener, HostBinding, ElementRef} from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    constructor(private elRef: ElementRef) {}

    @HostBinding('class.is-visible') isOpen = false;

    @HostListener('document:click', ['$event'])
    toggleOpen(event: Event){
        if(this.elRef.nativeElement.contains(event.target)){
            this.isOpen = !this.isOpen;
        }else{
            this.isOpen = false;
        }
    }   
} 