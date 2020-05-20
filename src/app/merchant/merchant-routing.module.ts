import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrdersComponent } from './orders/orders.component';
import { MerchantHomeComponent } from './merchant-home/merchant-home.component';
import { StatisticsComponent } from '../admin/statistics/statistics.component';
import { MerchantStatisticsComponent } from './merchant-statistics/merchant-statistics.component';
import { InviteMerchantComponent } from '../admin/invite-merchant/invite-merchant.component';
import { InvitesComponent } from './invites/invites.component';
import { AddProductComponent } from './merchant-product/add-product/add-product.component';
import { UpdateProductComponent } from './merchant-product/update-product/update-product.component';
import { ListCouponComponent } from './list-coupon/list-coupon.component';
import { AddCouponComponent } from './add-coupon/add-coupon.component';


const routes: Routes = [
  {path:'',component:DashboardComponent,children:[
    /*
    Write the same routing required here inside.
    For Example: 
    { path :'addCustomer' , component: AddCustomerComponent }
   
   */
    {path:'inventory', component:InventoryComponent},
    {path:'orders', component:OrdersComponent},
    {path:'statistics', component:MerchantStatisticsComponent},
    {path:'invites',component:InvitesComponent},
    
    { path: 'addProduct', component: AddProductComponent },
    { path: 'inventory/updateStock/:id', component: UpdateProductComponent },
    {path:'listcoupon',component:ListCouponComponent},
    {path:'addcoupon',component:AddCouponComponent},
    {path:'**', component:MerchantHomeComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule { }
