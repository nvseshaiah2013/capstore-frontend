import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { InviteService } from '../services/invite.service';
import { Merchant } from '../../models/merchant.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MerchantFeedService } from '../services/merchant-feed.service';
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../services/toast.service';
declare var $:any;

@Component({
  selector: 'app-all-merchant',
  templateUrl: './all-merchant.component.html',
  styleUrls: ['./all-merchant.component.css']
})
export class AllMerchantComponent implements OnInit,OnDestroy {

  merchants:Merchant[] = [];
  merchant:Merchant;
  directMerchants:number = 0;
  indirectMerchants:number = 0;
  totalMerchants : number = 0;
  private routeSubscription:Subscription;
  constructor(private router:Router,private inviteService:InviteService,private merchantService:MerchantFeedService,
    private loaderService:LoaderService,private toastService:ToastService) { 
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
    // this.loaderService.show();
    this.inviteService.getMerchants().subscribe(merchants=>{
      this.merchants = merchants;
      this.countMerchants();
      this.loaderService.hide();
    },(err:HttpErrorResponse)=>{
      if(err.status == 0){
        this.router.navigate(['error']);
      }
      this.loaderService.hide();
    })
  }

  countMerchants(){
    this.merchants.forEach((merchant)=>{
      if(merchant.thirdParty)
      {
        this.indirectMerchants += 1;
      }
      else 
        {
          this.directMerchants +=1;
        }
    });
    this.totalMerchants = this.merchants.length;
  }
  setContact(merchant:Merchant) {
    this.merchant = merchant;
    $(document).ready(function(){
      $('#contactModal').modal('show');
    })
  }

  counter(i:number){
    return new Array(i);
  }

  sortByRating(){    
      this.merchants.sort((a:Merchant,b:Merchant)=>{
        if(a.rating >= b.rating )
          return -1;
        else return 1;
      });    
  }
  deleteMerchant(merchant:Merchant){
    this.merchant = merchant;
    $(document).ready(function () {
      $('#deleteModal').modal('show');
    })
  }

  activateMerchant(merchant:Merchant){
    this.merchant = merchant;
    $(document).ready(function () {
      $('#activateModal').modal('show');
    })
  }

  chooseAction(event:any,merchant:Merchant){
    let value = event.target.value;
    this.inviteService.setMerchant(merchant);
    if(value == 'invite'){
      this.router.navigate(['admin','send-invite'])
    }
    if(value == 'products'){
      this.router.navigate(['admin','merchant-products'])
    }
    if (value == 'orders') {
      this.router.navigate(['admin','merchant-orders'])
    }
    if (value == 'feedbacks') {
      this.router.navigate(['admin', 'merchant-feedbacks'])
    }
  }

  confirmMerchantActivate(){
    $('#activateModal').modal('hide');
    this.loaderService.show();
    this.merchantService.activateMerchant(this.merchant.username).subscribe(response=>{
      this.loaderService.hide();
      this.toastService.setSuccess(response);
      this.toastService.showSuccess();
      this.router.navigate(['admin', 'all-merchant']);
    },(err:HttpErrorResponse)=>{
      if(err.status == 0){
        this.router.navigate(['error'])
      }
      
        this.loaderService.hide();
        this.toastService.setError(err.error);
        this.toastService.showFail();
    })
  }
  confirmMerchantDeactivate() {
    $('#deleteModal').modal('hide');
    this.loaderService.show();
    this.merchantService.deActivateMerchant(this.merchant.username).subscribe(response=>{
      this.loaderService.hide();
      this.toastService.setSuccess(response);
      this.toastService.showSuccess();
      this.router.navigate(['admin','all-merchant']);
    },(err:HttpErrorResponse)=>{
        if (err.status == 0) {
          this.router.navigate(['error'])
        }
       this.loaderService.hide();
       this.toastService.setError(err.error);
       this.toastService.showFail();
    })

  }

  ngOnDestroy(){
    this.loaderService.show();
    this.routeSubscription.unsubscribe();
  }
}
