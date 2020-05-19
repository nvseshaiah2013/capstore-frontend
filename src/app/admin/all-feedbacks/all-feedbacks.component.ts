import { Component, OnInit, OnDestroy } from '@angular/core';
import { MerchantFeedService } from '../services/merchant-feed.service';
import { CommonFeedback } from '../../models/common-feedback.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { Merchant } from 'src/app/models/merchant.model';
import { Customer } from 'src/app/models/customer.model';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-all-feedbacks',
  templateUrl: './all-feedbacks.component.html',
  styleUrls: ['./all-feedbacks.component.css']
})
export class AllFeedbacksComponent implements OnInit,OnDestroy {

  constructor(private feedbackService:MerchantFeedService,private router:Router,private loaderService:LoaderService,private toastService:ToastService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  readFeedbacks:number = 0;
  totalFeedbacks :number = 0;
  unreadFeedbacks: number = 0;
  feedbacks:CommonFeedback[] = [];
  merchant:Merchant;
  customer:Customer;
  private routeSubscription:Subscription;
  ngOnInit() {
    // this.loaderService.show();
    this.feedbackService.getCommonFeedbacks().subscribe(feedbacks=>{
      this.feedbacks = feedbacks;
      this.totalFeedbacks = this.feedbacks.length;
      this.countReadFeedbacks();
      this.loaderService.hide();
    },(err:HttpErrorResponse)=>{
      if(err.status == 0)
      {
        this.router.navigate(['error']);
      }
      this.loaderService.hide();
    })
  }

  countReadFeedbacks(){
    for(var i=0;i<this.feedbacks.length ; ++i){
      if(this.feedbacks[i].enableRead){
        this.readFeedbacks += 1;
      }
    }
    this.unreadFeedbacks = this.totalFeedbacks - this.readFeedbacks;
  }

  sendFeedbackToMerchant(id:number){
    this.loaderService.show();
    this.feedbackService.redirectFeedback(id).subscribe(data=>{
        this.loaderService.hide();
        this.toastService.setSuccess(data);
        this.toastService.showSuccess();
        this.router.navigate(['admin','all-feedbacks']);
    }, (err:HttpErrorResponse)=>{
      if(err.status == 0){
        this.router.navigate(['error'])
      }
      this.loaderService.hide();
      this.toastService.setError(err.error);
      this.toastService.showFail();
      
    }
    );
  }
  setMerchant(feedback:CommonFeedback){
    this.merchant = feedback.merchant;
    $(document).ready(function(){
      $('#merchantModal').modal('show');
    })
  }
  setCustomer(feedback:CommonFeedback){
    this.customer = feedback.customer;
    $(document).ready(function(){
      $('#customerModal').modal('show');
    })
  }

  counter(i: number) {
    return new Array(i);
  }

  ngOnDestroy(){
    this.loaderService.show();
    this.routeSubscription.unsubscribe();
  }

}
