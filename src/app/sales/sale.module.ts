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
        canActivate: [AuthGuard],
      },
      {
        path: 'sales/:id',
        component: SaleDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'sales/:id/edit',
        component: SaleEditComponent,
        canActivate: [AuthGuard],
      },
    ]),


    SharedModule,
  ]
})
export class SaleModule { }
