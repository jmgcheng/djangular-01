import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
/*
  router-outlet will error if you don't import RouterModule
*/ 

import { HttpClientModule } from '@angular/common/http';

// import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductModule } from './products/product.module';
import { PurchaseModule } from './purchases/purchase.module';
import { SaleModule } from './sales/sale.module';


import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

/*
  import SharedModule in app.module.ts and product.module.ts so we can reuse HeaderComponent, FooterComponent, AsideComponent
*/ 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    
  ],
  imports: [
    BrowserModule,
    // ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'about-us', component: AboutComponent },
      { path: '', component: HomeComponent },
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
