import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../services/merchant.service';

@Component({
  selector: 'app-merchant-home',
  templateUrl: './merchant-home.component.html',
  styleUrls: ['./merchant-home.component.css']
})
export class MerchantHomeComponent implements OnInit {

  todaySoldProducts : number;
  activeCustomers : number;
  cancelledOrders : number = 0;
  usernameList = new Set<string>();
  todayRevenue : number = 0;

  constructor(private merchantService : MerchantService) { }
  ngOnInit() {
    this.merchantService.getMerchantOrders('harsha98').subscribe(data => {
      this.todaySoldProducts = data.length;
      data.forEach(element => {
        this.usernameList.add(element.customer.username);
        if(element.orderStatus == "Cancelled"){
          this.cancelledOrders += 1;
        }
        
        //console.log(new Date(element.transaction.transactionDate).toLocaleDateString() ==  new Date().toLocaleDateString());
        if(new Date(element.transaction.transactionDate).toLocaleDateString() ==  new Date().toLocaleDateString()){
          this.todayRevenue += element.transaction.transactionMoney;
        }
      });
      this.activeCustomers = this.usernameList.size;
      console.log(this.usernameList);
    });
  }

}
