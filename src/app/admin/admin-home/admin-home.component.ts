import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Merchant } from '../models/merchant.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  customerCount;
  merchantCount;
  topRatedMerchants:Merchant[];
  constructor(private adminService:AdminService) { }

  ngOnInit() {

    this.adminService.getCountOfCustomers().subscribe(data=>{
      this.customerCount=data;
    })

    this.adminService.getCountOfMerchants().subscribe(data=>{
      this.merchantCount=data;
    })
    
    this.adminService.getTopRatedMerchants().subscribe(data=>{
      this.topRatedMerchants=data;
      console.log(this.topRatedMerchants)
    })

  }

}
