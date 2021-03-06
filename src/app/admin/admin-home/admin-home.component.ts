import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Merchant } from '../../models/merchant.model';
import { Orders } from '../../models/order.model';
import { DatePipe } from '@angular/common';
import { Product } from 'src/app/models/product.model';
import { LoaderService } from '../services/loader.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit,OnDestroy {

  customerCount;
  merchantCount;
  trendingProducts:Product[];
  topRatedMerchants:Merchant[];
  recentOrders:Orders[];
  todayProductSales;
  todayRevenue;
  prod:Product=new Product();
  merchant:Merchant=new Merchant();
  errorMssg:string;

  constructor(private adminService:AdminService,private datepipe:DatePipe,
    private loaderService:LoaderService) { }

  ngOnInit() {

    // this.loaderService.show();
    this.adminService.todayRevenue().pipe().subscribe(data=>{
      this.todayRevenue=data;
    })

    this.adminService.todayProductSales().subscribe(data=>{
      this.todayProductSales=data;
    })

    this.adminService.getCountOfCustomers().subscribe(data=>{
      this.customerCount=data;
    })

    this.adminService.getCountOfMerchants().subscribe(data=>{
      this.merchantCount=data;
    })

    this.adminService.getTrendingProducts().subscribe(data=>{
      this.trendingProducts=data;
    })
    
    this.adminService.getTopRatedMerchants().subscribe(data=>{
      this.topRatedMerchants=data;
    })

    this.adminService.getRecentOrders().subscribe(data=>{
      this.recentOrders=data;
      this.loaderService.hide();
    },(err:HttpErrorResponse)=>{
      this.loaderService.hide();
    })
  }

  getProductById(prodId:number){
    this.adminService.getProductById(prodId).subscribe(data=>{
      this.prod=data;
    });
  }

  getMerchantByUsername(username:string){
    this.adminService.getMerchantByUsername(username).subscribe(data=>{
      this.merchant=data;
    })
  }

  counter(i:number){
    return new Array(i);
  }

  ngOnDestroy(){
    this.loaderService.show();
  }

}
