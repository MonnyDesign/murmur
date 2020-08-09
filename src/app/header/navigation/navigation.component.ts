import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html', 
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('megaMenu') megaMenu: ElementRef;
  @ViewChild('megaMenu2') megaMenu2: ElementRef;
  menuHeight = 'auto';
  menu2Height = 'auto'; 
  ulHeight = "";

  public onMegaMenuHeight(isHovered: boolean, list: any){
    const megaMenuHeight = this.megaMenu.nativeElement.clientHeight;
    const megaMenu2Height = this.megaMenu2.nativeElement.clientHeight;
    let listHeight = list.clientHeight + 2;

    if((listHeight > megaMenuHeight) && (listHeight > megaMenu2Height)){
      this.menuHeight = listHeight + 'px';
      this.menu2Height = listHeight + 'px';
      console.log('listHeight: ' + listHeight + ' megaMenuHeight: ' + megaMenuHeight);
    } else {
      this.menuHeight = 'auto';
      this.ulHeight = "100%";
    }

    if (isHovered === false) {
      this.menuHeight = 'auto';
      this.menu2Height = 'auto';
      this.ulHeight = "auto";
    }
  }


  constructor() {

  }

  ngOnInit(){
  }

}
