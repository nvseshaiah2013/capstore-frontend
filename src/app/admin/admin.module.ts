import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { OrdersComponent } from './orders/orders.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent, AdminHomeComponent, StatisticsComponent, OrdersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
