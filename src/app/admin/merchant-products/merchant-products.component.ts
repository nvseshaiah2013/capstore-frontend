import { Component, OnInit, OnDestroy } from '@angular/core';
import { InviteService } from '../services/invite.service';
import { MerchantFeedService } from '../services/merchant-feed.service';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Merchant } from 'src/app/models/merchant.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/models/product.model';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-merchant-products',
  templateUrl: './merchant-products.component.html',
  styleUrls: ['./merchant-products.component.css']
})
export class MerchantProductsComponent implements OnInit,OnDestroy {

  searchText:string;
  merchant:Merchant;
  totalOrders:number = 0;
  totalProducts:number = 0;
  products:Product[] = [];
  product:Product;
  private routeSubscription:Subscription;
  constructor(private inviteService: InviteService,
    private merchantService: MerchantFeedService,
    private router: Router, private location: Location,
    private loaderService:LoaderService,
    private toastService:ToastService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
    }

  ngOnInit() {
    this.merchant = this.inviteService.getMerchant();
    if (!this.merchant) {
      this.location.back();
      return;
    }
    this.loaderService.show();
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
      this.loaderService.hide();
    },(err:HttpErrorResponse)=>{
        this.loaderService.hide();
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
    this.loaderService.show();
    this.merchantService.activateProduct(username,id).subscribe(data=>{
      this.loaderService.hide();
      this.toastService.setSuccess(data);
      this.toastService.showSuccess();
      this.router.navigate(['admin','merchant-products']);
    },(err:HttpErrorResponse)=>{
      if(err.status == 0){
        this.router.navigate(['error']);
      }
      this.loaderService.hide();
        this.toastService.setError(err);
        this.toastService.showFail();
    })
  }

  deActivateProduct(product: Product) {
    let username = product.merchant.username;
    let id = product.productId;
    this.loaderService.show();
    this.merchantService.deActivateProduct(username, id).subscribe(data => {
      this.loaderService.hide();
        this.toastService.setSuccess(data);
        this.toastService.showSuccess();
        this.router.navigate(['admin','merchant-products']);
    }, (err: HttpErrorResponse) => {
      if (err.status == 0) {
        this.router.navigate(['error']);
      }
      this.loaderService.hide();
      this.toastService.setError(err.error);
      this.toastService.showFail();
    })
  }

  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
    this.loaderService.show();
  }

}
