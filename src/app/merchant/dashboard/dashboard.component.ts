import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { Merchant } from 'src/app/models/merchant.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  todaysDate = new Date();
  merchant : Merchant;

  constructor(private merchantService : MerchantService) {
    setInterval(() => {
      this.todaysDate = new Date();
    }, 1000);
  }

 

  ngOnInit() {
    this.merchantService.getMerchantInfo().subscribe(data => {
      this.merchant = data;
    });
  }

  logOut(){
    localStorage.removeItem('token');
    window.location.href="home";
  }

}
