import { Component, OnInit } from '@angular/core';
import { MerchantFeedService } from '../services/merchant-feed.service';
import { CommonFeedback } from '../../models/common-feedback.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Merchant } from 'src/app/models/merchant.model';
import { Customer } from 'src/app/models/customer.model';
import { LoaderService } from '../services/loader.service';
declare var $: any;

@Component({
  selector: 'app-all-feedbacks',
  templateUrl: './all-feedbacks.component.html',
  styleUrls: ['./all-feedbacks.component.css']
})
export class AllFeedbacksComponent implements OnInit {

  constructor(private feedbackService:MerchantFeedService,private router:Router,private loaderService:LoaderService) { }
  readFeedbacks:number = 0;
  totalFeedbacks :number = 0;
  unreadFeedbacks: number = 0;
  feedbacks:CommonFeedback[] = [];
  merchant:Merchant;
  customer:Customer;
  ngOnInit() {
    this.loaderService.show();
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
    this.feedbackService.redirectFeedback(id).subscribe(data=>{
      console.log(data);
    }, (err:HttpErrorResponse)=>{
      if(err.status == 0){
        this.router.navigate(['error'])
      }
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

}
