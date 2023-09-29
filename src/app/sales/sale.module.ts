import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SaleListComponent } from './sale-list.component';
import { SaleDetailComponent } from './sale-detail.component';
import { SaleEditComponent } from './sale-edit.component';

import { AuthGuard } from '../user/auth.guard';

@NgModule({
  declarations: [
    SaleListComponent,
    SaleDetailComponent,
    SaleEditComponent
  ],
  imports: [
    ReactiveFormsModule,

    RouterModule.forChild([
      {
        path: 'sales',
        component: SaleListComponent,
        canActivate: [AuthGuard],     // make sure only login user can check this page
      },
      {
        path: 'sales/:id',
        component: SaleDetailComponent,
        canActivate: [AuthGuard],     // make sure only login user can check this page
      },
      {
        path: 'sales/:id/edit',
        component: SaleEditComponent,
        canActivate: [AuthGuard],     // make sure only login user can check this page
      },
    ]),


    SharedModule,
  ]
})
export class SaleModule { }
