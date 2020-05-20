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

import { AddMerchantComponent } from './add-merchant/add-merchant.component';
import { AllMerchantComponent } from './all-merchant/all-merchant.component';
import { InviteMerchantComponent } from './invite-merchant/invite-merchant.component';
import { MerchantOrdersComponent } from './merchant-orders/merchant-orders.component';
import { MerchantFeedbacksComponent } from './merchant-feedbacks/merchant-feedbacks.component';
import { MerchantProductsComponent } from './merchant-products/merchant-products.component';
import { AllFeedbacksComponent } from './all-feedbacks/all-feedbacks.component';

import { HttpClientModule} from '@angular/common/http';
import { InvitesComponent } from './invites/invites.component';
import { SearchPipe } from './pipe/search.pipe';
import { LoadingComponent } from './loading/loading.component';
import { LoaderService } from './services/loader.service';
import { ToastService } from './services/toast.service';
import { AddCouponsComponent } from './coupons/add-coupons/add-coupons.component';
import { FilterCouponPipe } from './pipe/filter-coupon.pipe';
import { ListCouponComponent } from './coupons/list-coupon/list-coupon.component';
import { SearchMerchantPipe } from './pipe/search-merchant.pipe';
import { SearchProductPipe } from './pipe/search-product.pipe';
import { SearchOrderPipe } from './pipe/search-order.pipe';


@NgModule({
  declarations: [
    DashboardComponent, 
    AdminHomeComponent, 
    StatisticsComponent, 
    OrdersComponent,
    ViewCustomersComponent, 
    CategoryComponent, 
    MinimumOrderValueComponent, 
    AllMerchantComponent, 
    InviteMerchantComponent, 
    MerchantOrdersComponent, 
    MerchantFeedbacksComponent, 
    MerchantProductsComponent, 
    AllFeedbacksComponent,
    AddMerchantComponent,
    InvitesComponent,
    SearchPipe,
    LoadingComponent,
    AddCouponsComponent,
    FilterCouponPipe,
    ListCouponComponent,
    SearchMerchantPipe,
    SearchProductPipe,
    SearchOrderPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ]
  ,
  providers:[
    LoaderService
  ]
})
export class AdminModule { }
