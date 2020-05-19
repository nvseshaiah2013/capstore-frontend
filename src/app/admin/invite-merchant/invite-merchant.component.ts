import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Merchant } from 'src/app/models/merchant.model';
import { InviteService } from '../services/invite.service';
import { MerchantFeedService } from '../services/merchant-feed.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Invitation } from 'src/app/models/invitation.model';
import { LoaderService } from '../services/loader.service';

declare var $:any;

@Component({
  selector: 'app-invite-merchant',
  templateUrl: './invite-merchant.component.html',
  styleUrls: ['./invite-merchant.component.css']
})
export class InviteMerchantComponent implements OnInit,OnDestroy {

  invitation:FormGroup;
  messageLength:number = 0;
  merchant:Merchant;
  totalProducts :number = 0;
  totalOrders: number = 0;
  constructor(private builder:FormBuilder,private inviteService:InviteService,
    private merchantService:MerchantFeedService,
    private router:Router,private location:Location
    ,private loaderService:LoaderService) { }

  ngOnInit() {
    this.invitation = this.builder.group({
      header:['',[Validators.required,Validators.maxLength(255)]],
      message:['',[Validators.required,Validators.maxLength(255)]]
    });
    this.merchant = this.inviteService.getMerchant();
    if (!this.merchant) {
      this.location.back();
      return;
    }
    this.merchantService.getOrderCount(this.merchant).subscribe(orderCount=>{
      this.totalOrders = orderCount;
    },(err:HttpErrorResponse)=>{
      if(err.status == 0)
      {
        this.router.navigate(['error']);
      }

    });

    this.merchantService.getProductCount(this.merchant).subscribe(productCount=>{
        this.totalProducts = productCount;
      this.loaderService.hide();
    },(err:HttpErrorResponse)=>{
        this.loaderService.hide();
      if(err.status == 0){
        this.router.navigate(['error']);
      }
    });
  }
  sendInvite(){
    // console.log(this.invitation.controls['message'].value.length);
    let invite = new Invitation();
    invite.header = this.invitation.controls['header'].value;
    invite.message = this.invitation.controls['message'].value;
    invite.merchant = this.merchant;
    // console.log(invite);
    this.inviteService.sendInvite(invite).subscribe(data=>{
      this.router.navigate(['admin','invites']);
    },(err:HttpErrorResponse)=>{
      if(err.status == 0){
        this.router.navigate(['error']);
      }
      console.log(err);
    });
  }
  messageEvent(){
    this.messageLength = this.invitation.controls['message'].value.length;
  }

  viewMerchant(){
      $(document).ready(function(){
        $('#merchantModal').modal('show');
      });
  }

  counter(i:number){
    return new Array(i);
  }

  ngOnDestroy(){
    this.loaderService.show();
  }
}
