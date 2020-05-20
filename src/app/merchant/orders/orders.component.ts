import { Component, OnInit, OnDestroy } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { Orders } from 'src/app/models/order.model';
import { LoadingSpinnerService } from '../services/loading-spinner.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  constructor(private merchantService : MerchantService,private loaderService:LoadingSpinnerService) { }

  orders : Orders[];

  ngOnInit() {
    this.merchantService.getMerchantOrders().subscribe(data => {
      this.orders = data;
      console.log(this.orders[0])
      this.loaderService.hide();
    }, (err: HttpErrorResponse)=>{
      this.loaderService.hide();
    }); 
  }

  acceptOrder(orderId : string){
    console.log(orderId);
    this.merchantService.acceptMerchantOrder(orderId, 'Accepted').subscribe();
    window.location.href = '/merchant/orders';
  }

  rejectOrder(orderId : string){
    console.log(orderId);
    this.merchantService.acceptMerchantOrder(orderId, 'Cancelled').subscribe();
    window.location.href = '/merchant/orders';
  }
  ngOnDestroy(){
    this.loaderService.show();
  }
}
