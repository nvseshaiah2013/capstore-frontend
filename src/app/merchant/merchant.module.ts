import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MerchantRoutingModule } from './merchant-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrdersComponent } from './orders/orders.component';
import { MerchantHomeComponent } from './merchant-home/merchant-home.component';


@NgModule({
  declarations: [DashboardComponent, InventoryComponent, OrdersComponent, MerchantHomeComponent],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    FontAwesomeModule
  ]
})
export class MerchantModule { }
