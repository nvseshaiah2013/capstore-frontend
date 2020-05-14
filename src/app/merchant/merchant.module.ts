import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [DashboardComponent, InventoryComponent, OrdersComponent],
  imports: [
    CommonModule,
    MerchantRoutingModule]
})
export class MerchantModule { }
