import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { Orders } from 'src/app/models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private merchantService : MerchantService) { }

  orders : Orders[];

  ngOnInit() {
    this.merchantService.getMerchantOrders().subscribe(data => {
      this.orders = data;
      console.log(this.orders[0])
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
}
