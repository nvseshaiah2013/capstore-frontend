import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrdersComponent } from './orders/orders.component';
import { MerchantHomeComponent } from './merchant-home/merchant-home.component';
import { MerchantStatisticsComponent } from './merchant-statistics/merchant-statistics.component';
import { HttpClientModule } from '@angular/common/http';
import { InvitesComponent } from './invites/invites.component';
import { AddProductComponent } from './merchant-product/add-product/add-product.component';
import { UpdateProductComponent } from './merchant-product/update-product/update-product.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { ListCouponComponent } from './list-coupon/list-coupon.component';
import { FilterCouponPipe } from './pipes/filter-coupon.pipe';


@NgModule({

  declarations: [
    DashboardComponent, 
    InventoryComponent, 
    OrdersComponent, 
    MerchantHomeComponent, 
    AddProductComponent,
    UpdateProductComponent,
    MerchantStatisticsComponent, InvitesComponent, AddCouponComponent, ListCouponComponent, FilterCouponPipe],

  imports: [
    CommonModule,
    MerchantRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MerchantModule { }
