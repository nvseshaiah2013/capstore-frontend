import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Merchant } from '../../models/merchant.model';
import { Orders } from '../../models/order.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  customerCount;
  merchantCount;
  topRatedMerchants:Merchant[];
  recentOrders:Orders[];
  totalOrders:Orders[];
  todayProductSales:number=0;
  todayRevenue:number=0;

  constructor(private adminService:AdminService,private datepipe:DatePipe) { }

  ngOnInit() {

    this.adminService.getCountOfCustomers().subscribe(data=>{
      this.customerCount=data;
    })

    this.adminService.getCountOfMerchants().subscribe(data=>{
      this.merchantCount=data;
    })
    
    this.adminService.getTopRatedMerchants().subscribe(data=>{
      this.topRatedMerchants=data;
    })

    this.adminService.getAllOrders().subscribe(data=>{
      this.totalOrders=data;
      this.recentOrders=data; //use slice here to show 3 recent orders
      for(let i=0;i<this.totalOrders.length;i++){
        if(this.datepipe.transform(this.totalOrders[i].orderDate, 'dd-MM-yyyy')==this.datepipe.transform(new Date(), 'dd-MM-yyyy')){
          this.todayProductSales+=1;
          this.todayRevenue+=this.totalOrders[i].orderAmount;
        }
      }
    })

    // this.adminService.getTodayProductSales().subscribe(data=>{
    //   console.log(data);
    // });

  }

}
