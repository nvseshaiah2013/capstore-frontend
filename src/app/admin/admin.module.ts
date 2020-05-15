import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { OrdersComponent } from './orders/orders.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { CategoryComponent } from './category/category.component';
import { MinimumOrderValueComponent } from './minimum-order-value/minimum-order-value.component';


@NgModule({
  declarations: [DashboardComponent, AdminHomeComponent, StatisticsComponent, OrdersComponent,ViewCustomersComponent, CategoryComponent, MinimumOrderValueComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
