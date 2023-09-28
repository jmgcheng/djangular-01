import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { PurchaseListComponent } from './purchase-list.component';
import { PurchaseDetailComponent } from './purchase-detail.component';
import { PurchaseEditComponent } from './purchase-edit.component';

import { AuthGuard } from '../user/auth.guard';

@NgModule({
  declarations: [
    PurchaseListComponent,
    PurchaseDetailComponent,
    PurchaseEditComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'purchases',
        component: PurchaseListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'purchases/:id',
        component: PurchaseDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'purchases/:id/edit',
        component: PurchaseEditComponent,
        canActivate: [AuthGuard],
      },
    ]),

    
    SharedModule,
  ]
})
export class PurchaseModule { }
