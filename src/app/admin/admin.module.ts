import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent, AdminHomeComponent, StatisticsComponent, ViewCustomersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
    
  ]
})
export class AdminModule { }
