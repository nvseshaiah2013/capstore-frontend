import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddCustomerComponent } from './add-customer/add-customer.component';


@NgModule({
  declarations: [LoginComponent,AddCustomerComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class UserModule { }
