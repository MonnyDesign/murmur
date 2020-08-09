import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { ClientNavComponent } from './header/client-nav/client-nav.component';
import { MediaBannerComponent } from './home/media-banner/media-banner.component';

import { HoverDirective } from './directives/hover.directive';
import { VisibleSubmenuDirective } from './directives/visible-submenu.directive';
import { DropdownDirective } from './directives/dropdown.directive';

import { Routes, RouterModule } from '@angular/router';
import { BusinessCardsComponent } from './products/business-cards/business-cards.component';
import { HomeComponent } from './home/home.component';
import { BcMediaBannerComponent } from './products/business-cards/bc-media-banner/bc-media-banner.component';
import { HomeContentComponent } from './home/home-content/home-content.component';
import { FooterComponent } from './footer/footer.component';
import { OriginalBcComponent } from './products/business-cards/original-bc/original-bc.component';
import { ModalBoxComponent } from './products/business-cards/original-bc/modal-box/modal-box.component';
import { OriginalBcMediaBannerComponent } from './products/business-cards/original-bc/original-bc-media-banner/original-bc-media-banner.component';
import { StickyNavComponent } from './products/navs/sticky-nav/sticky-nav.component';
import { ProductMenuComponent } from './products/navs/product-menu/product-menu.component';

import { ProductsService } from './services/products.service'; 

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'business-cards', component: BusinessCardsComponent },
  { path: 'business-cards/original-business-cards', component: OriginalBcComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    ClientNavComponent,
    MediaBannerComponent,
    HoverDirective,
    VisibleSubmenuDirective,
    BusinessCardsComponent,
    HomeComponent,
    BcMediaBannerComponent,
    HomeContentComponent,
    FooterComponent,
    OriginalBcComponent,
    ModalBoxComponent,
    OriginalBcMediaBannerComponent,
    DropdownDirective,
    StickyNavComponent,
    ProductMenuComponent
      ],
  imports: [ 
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    RouterModule.forRoot(appRoutes)
      ],
  providers: [ProductsService],
  bootstrap: [AppComponent] 
})
export class AppModule { }
