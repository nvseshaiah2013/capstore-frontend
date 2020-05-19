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


@NgModule({

  declarations: [
    DashboardComponent, 
    InventoryComponent, 
    OrdersComponent, 
    MerchantHomeComponent, 
    AddProductComponent,
    UpdateProductComponent,
    MerchantStatisticsComponent, InvitesComponent],

  imports: [
    CommonModule,
    MerchantRoutingModule,
    HttpClientModule
  ]
})
export class MerchantModule { }
