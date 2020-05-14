import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { OrdersComponent } from './orders/orders.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewCustomersComponent } from './view-customers/view-customers.component';


@NgModule({
  declarations: [DashboardComponent, AdminHomeComponent, StatisticsComponent, OrdersComponent,ViewCustomersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
