import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CustomerRoutingModule } from './customer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { StatusComponent } from './status/status.component';
import { ReturnComponent } from './return/return.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { CommonFeedbackFormComponent } from './common-feedback-form/common-feedback-form.component';
import { UserFeedbackViewComponent } from './user-feedback-view/user-feedback-view.component';

@NgModule({
  declarations: [
    DashboardComponent,  
    CustomerHomeComponent, 
    ManageAddressComponent, 
    EditCustomerComponent, 
    OrderlistComponent, 
    StatusComponent, 
    ReturnComponent, 
    AddAddressComponent,
    CommonFeedbackFormComponent,
    UserFeedbackViewComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
