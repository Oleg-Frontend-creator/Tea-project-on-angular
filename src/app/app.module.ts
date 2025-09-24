import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SlickCarouselModule} from "ngx-slick-carousel";
import {WatchOutPopupComponent} from './components/common/watch-out-popup/watch-out-popup.component';
import {HeaderComponent} from './components/common/header/header.component';
import {FooterComponent} from './components/common/footer/footer.component';
import {MainComponent} from './components/pages/main/main.component';
import {ProductCatalogComponent} from './components/pages/product-catalog/product-catalog.component';
import {ProductComponent} from './components/pages/product/product.component';
import {OrderComponent} from './components/pages/order/order.component';
import {HttpClientModule} from "@angular/common/http";
import {ProductCardComponent} from './components/common/product-card/product-card.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    WatchOutPopupComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ProductCatalogComponent,
    ProductComponent,
    OrderComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
