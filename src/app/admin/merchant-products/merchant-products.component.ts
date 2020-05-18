import { Component, OnInit } from '@angular/core';
import { InviteService } from '../services/invite.service';
import { MerchantFeedService } from '../services/merchant-feed.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Merchant } from 'src/app/models/merchant.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/models/product.model';
declare var $: any;

@Component({
  selector: 'app-merchant-products',
  templateUrl: './merchant-products.component.html',
  styleUrls: ['./merchant-products.component.css']
})
export class MerchantProductsComponent implements OnInit {

  merchant:Merchant;
  totalOrders:number = 0;
  totalProducts:number = 0;
  products:Product[] = [];
  product:Product;
  constructor(private inviteService: InviteService,
    private merchantService: MerchantFeedService,
    private router: Router, private location: Location) { }

  ngOnInit() {
    this.merchant = this.inviteService.getMerchant();
    if (!this.merchant) {
      this.location.back();
    }
    this.merchantService.getOrderCount(this.merchant).subscribe(orderCount => {
      this.totalOrders = orderCount;
    }, (err: HttpErrorResponse) => {
      if (err.status == 0) {
        this.router.navigate(['error']);
      }

    });

    this.merchantService.getProductCount(this.merchant).subscribe(productCount => {
      this.totalProducts = productCount;
    }, (err: HttpErrorResponse) => {
      if (err.status == 0) {
        this.router.navigate(['error']);
      }
    });

    this.merchantService.getMerchantProducts(this.merchant.username).subscribe(products=>{
      this.products = products;
    },(err:HttpErrorResponse)=>{
      
    })
  }

  viewMerchant() {
    $(document).ready(function () {
      $('#merchantModal').modal('show');
    });
  }

  counter(i:number){
    return new Array(i);
  }

  viewProduct(product:Product){
    this.product = product;
    $('#productModal').modal('show');
  }
  activateProduct(product:Product){
    let username = product.merchant.username;
    let id = product.productId;
    this.merchantService.activateProduct(username,id).subscribe(data=>{
      console.log(data);
    },(err:HttpErrorResponse)=>{
      if(err.status == 0){
        this.router.navigate(['error']);
      }
      console.log(err);
    })
  }

  deActivateProduct(product: Product) {
    let username = product.merchant.username;
    let id = product.productId;
    this.merchantService.deActivateProduct(username, id).subscribe(data => {
      console.log(data);
    }, (err: HttpErrorResponse) => {
      if (err.status == 0) {
        this.router.navigate(['error']);
      }
      console.log(err);
    })
  }

}
