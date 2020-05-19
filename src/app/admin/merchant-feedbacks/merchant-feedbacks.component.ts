import { Component, OnInit, OnDestroy } from '@angular/core';
import { InviteService } from '../services/invite.service';
import { MerchantFeedService } from '../services/merchant-feed.service';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Merchant } from 'src/app/models/merchant.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonFeedback } from 'src/app/models/common-feedback.model';
import { Customer } from 'src/app/models/customer.model';
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../services/toast.service';
declare var $: any;

@Component({
  selector: 'app-merchant-feedbacks',
  templateUrl: './merchant-feedbacks.component.html',
  styleUrls: ['./merchant-feedbacks.component.css']
})
export class MerchantFeedbacksComponent implements OnInit,OnDestroy {

  merchant:Merchant;
  totalOrders:number = 0;
  totalProducts:number = 0;
  feedbacks:CommonFeedback[] = [];
  customer:Customer;
  private routeSubscription:Subscription;
  constructor(private inviteService: InviteService,
    private merchantService: MerchantFeedService,
    private router: Router, private location: Location,private loaderService:LoaderService,
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
    // this.loaderService.show();
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

    this.merchantService.getMerchantFeedbacks(this.merchant.username).subscribe(feedbacks=>{
      this.feedbacks = feedbacks;
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

  counter(i: number) {
    return new Array(i);
  }

  sendFeedbackToMerchant(id: number) {
    this.loaderService.show();
    this.merchantService.redirectFeedback(id).subscribe(data => {
        this.loaderService.hide();
        this.toastService.setSuccess(data);
        this.toastService.showSuccess();
        this.router.navigate(['admin','merchant-feedbacks'])
    }, (err: HttpErrorResponse) => {
      if (err.status == 0) {
        this.router.navigate(['error'])
      }
      this.loaderService.hide();
      this.toastService.setError(err.error);
      this.toastService.showFail();
    }
    );
  }

  setCustomer(feedback: CommonFeedback) {
    this.customer = feedback.customer;
    $(document).ready(function () {
      $('#customerModal').modal('show');
    })
  }

  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
    this.loaderService.show();
  }
}
