import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,

    RouterModule.forChild([
      {
        path: 'purchases',
        component: PurchaseListComponent,
        canActivate: [AuthGuard],     // make sure only login user can check this page
      },
      {
        path: 'purchases/:id',
        component: PurchaseDetailComponent,
        canActivate: [AuthGuard],     // make sure only login user can check this page
      },
      {
        path: 'purchases/:id/edit',
        component: PurchaseEditComponent,
        canActivate: [AuthGuard],     // make sure only login user can check this page
      },
    ]),

    
    SharedModule,
  ]
})
export class PurchaseModule { }
