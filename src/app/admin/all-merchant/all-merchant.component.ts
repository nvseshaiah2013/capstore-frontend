import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InviteService } from '../services/invite.service';
import { Merchant } from '../../models/merchant.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MerchantFeedService } from '../services/merchant-feed.service';
declare var $:any;

@Component({
  selector: 'app-all-merchant',
  templateUrl: './all-merchant.component.html',
  styleUrls: ['./all-merchant.component.css']
})
export class AllMerchantComponent implements OnInit {

  merchants:Merchant[] = [];
  merchant:Merchant;
  directMerchants:number = 0;
  indirectMerchants:number = 0;
  totalMerchants : number = 0;
  constructor(private router:Router,private inviteService:InviteService,private merchantService:MerchantFeedService) { }
  ngOnInit() {
    this.inviteService.getMerchants().subscribe(merchants=>{
      this.merchants = merchants;
      this.countMerchants();
    },(err:HttpErrorResponse)=>{
      if(err.status == 0){
        this.router.navigate(['error']);
      }
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

  sortBy(parameter:any){
    let value = parameter.target.value;
    if(value == 'rating')
    {
      this.merchants.sort((a:Merchant,b:Merchant)=>{
        if(a.rating >= b.rating )
          return -1;
        else return 1;
      });
    }
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
    this.merchantService.activateMerchant(this.merchant.username).subscribe(response=>{
      $('#activateModal').modal('hide');
    },err=>{
        $('#activateModal').modal('hide');
    })
  }
  confirmMerchantDeactivate() {
    this.merchantService.deActivateMerchant(this.merchant.username).subscribe(response=>{
      $('#deleteModal').modal('hide');
    },err=>{
        $('#activateModal').modal('hide');
    })

  }
}
