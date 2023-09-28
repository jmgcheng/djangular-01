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
        canActivate: [AuthGuard],
      },
      { 
        path: 'products', 
        component: ProductListComponent,
        canActivate: [AuthGuard],
      },
    ]),

    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 }),
    
    SharedModule,
    
  ]
})
export class ProductModule { }
