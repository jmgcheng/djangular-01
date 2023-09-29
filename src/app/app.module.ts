import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
/*
  router-outlet 
    - will error if you don't import RouterModule
*/ 

import { HttpClientModule } from '@angular/common/http';
/* 
  HttpClientModule 
    - so that services can use http. Gives you error if you dont import
*/

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { UserModule } from './user/user.module';
import { ProductModule } from './products/product.module';
import { PurchaseModule } from './purchases/purchase.module';
import { SaleModule } from './sales/sale.module';
/* 
  UserModule, ProductModule, PurchaseModule, SaleModule 
    - just to seperate the modules
*/


import { SharedModule } from './shared/shared.module';
/* 
  SharedModule
    - import SharedModule in app.module.ts and product.module.ts so we can reuse HeaderComponent, FooterComponent, AsideComponent
    - i still don't get the point why other modules need to import this even if you already import it here.
      - shouldn't they just share if its here in the main module?
*/

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'about-us', component: AboutComponent },  // about-us and home actually not required in this setup but just leave it there
      { path: '', component: HomeComponent },           // about-us and home actually not required in this setup but just leave it there
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]),
    SharedModule,
    ProductModule,
    UserModule,
    PurchaseModule,
    SaleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
