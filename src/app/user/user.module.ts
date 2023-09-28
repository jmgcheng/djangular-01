import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

import { SharedModule } from '../shared/shared.module';





@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    ReactiveFormsModule,
    
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
    ]),

    SharedModule,
  ]
})
export class UserModule { }
