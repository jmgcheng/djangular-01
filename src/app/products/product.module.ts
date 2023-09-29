import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
/*
  router-outlet will error if you don't import RouterModule
*/ 

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';

import { SharedModule } from '../shared/shared.module';
/*
  import SharedModule in app.module.ts and product.module.ts so we can reuse HeaderComponent, FooterComponent, AsideComponent
*/ 

/*
  import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
  import { InMemoryDataService } from './in-memory-data.service';
  HttpClientInMemoryWebApiModule and InMemoryDataService for mock api call
    - started commenting this when we started calling real api links
    - it seems to blocks all other api calls and can't make a real call if its here
*/

import { AuthGuard } from '../user/auth.guard';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    RouterModule.forChild([
      { 
        path: 'products/:id', 
        component: ProductDetailComponent,
        canActivate: [AuthGuard],     // make sure only login user can check this page
      },
      { 
        path: 'products', 
        component: ProductListComponent,
        canActivate: [AuthGuard],     // make sure only login user can check this page
      },
    ]),

    /* 
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 }),
        - started commenting this when we started calling real api links
        - it seems to blocks all other api calls and can't make a real call if its here      
    */
    
    SharedModule,
    
  ]
})
export class ProductModule { }
