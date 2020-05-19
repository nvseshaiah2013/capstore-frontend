import { Component, OnInit, OnDestroy } from '@angular/core';
import { InviteService } from '../services/invite.service';
import { MerchantFeedService } from '../services/merchant-feed.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Merchant } from 'src/app/models/merchant.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Orders } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { Address } from 'src/app/models/address.model';
import { Coupon } from 'src/app/models/coupon.model';
import { Customer } from 'src/app/models/customer.model';
import { LoaderService } from '../services/loader.service';
declare var $: any;

@Component({
  selector: 'app-merchant-orders',
  templateUrl: './merchant-orders.component.html',
  styleUrls: ['./merchant-orders.component.css']
})
export class MerchantOrdersComponent implements OnInit,OnDestroy {

  merchant:Merchant;
  totalOrders:number = 0;
  totalProducts:number = 0;
  orders:Orders[] = [];
  product:Product;
  address:Address;
  coupon:Coupon;
  customer:Customer;
  constructor(private inviteService: InviteService,
    private merchantService: MerchantFeedService,
    private router: Router, private location: Location,
    private loaderService:LoaderService) { }

  ngOnInit() {
    this.merchant = this.inviteService.getMerchant();
    if (!this.merchant) {
      this.location.back();
      return;
    }
    // this.loaderService.show();
    this.merchantService.getOrderCount(this.merchant).subscribe(orderCount => {
      this.totalOrders = orderCount;
      this.loaderService.hide();
    }, (err: HttpErrorResponse) => {
      if (err.status == 0) {
        this.router.navigate(['error']);
      }
      this.loaderService.hide();

    });

    this.merchantService.getProductCount(this.merchant).subscribe(productCount => {
      this.totalProducts = productCount;
    }, (err: HttpErrorResponse) => {
      if (err.status == 0) {
        this.router.navigate(['error']);
      }
    });
    this.merchantService.getMerchantOrders(this.merchant.username).subscribe(orders=>{
        this.orders = orders;
    },(err:HttpErrorResponse)=>{

    })
  }

  viewMerchant() {
    $(document).ready(function () {
      $('#merchantModal').modal('show');
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  viewCoupon(coupon:Coupon){
    this.coupon = coupon;
    $('#couponModal').modal('show');
  }

  viewAddress(address: Address) {
    this.address = address;
    $('#addressModal').modal('show');
  }

  viewCustomer(customer:Customer){
    this.customer = customer;
    $('#customerModal').modal('show');

  }
  viewProduct(product:Product){
    this.product = product;
    $('#productModal').modal('show');
  }
  ngOnDestroy(){
    this.loaderService.show();
  }
}
