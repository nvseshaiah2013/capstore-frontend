import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { OrdersComponent } from './orders/orders.component';
import { CategoryComponent } from './category/category.component';
import { MinimumOrderValueComponent } from './minimum-order-value/minimum-order-value.component';



const routes: Routes = [
  {path:'',component:DashboardComponent,children:[
   /*
    Write the same routing required here inside.
    For Example: 
    { path :'addCustomer' , component: AddCustomerComponent }
   
   */
  { path :'home' , component: AdminHomeComponent },
  { path :'stats' , component: StatisticsComponent },
  {path:'orders',component:OrdersComponent},
  {path:'viewCustomers',component:ViewCustomersComponent},
  {path:'minOrderValue',component:MinimumOrderValueComponent},
  {path:'category',component:CategoryComponent},
  { path :'**' , component: AdminHomeComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
