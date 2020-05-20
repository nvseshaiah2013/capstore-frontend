import { Component, OnInit, OnDestroy } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { Merchant } from 'src/app/models/merchant.model';
import { LoadingSpinnerService } from '../services/loading-spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  todaysDate = new Date();
  merchant : Merchant;

  loadSubscription:Subscription;
  showLoad:boolean = true;
  
  constructor(private loaderService: LoadingSpinnerService,private merchantService : MerchantService) {
    setInterval(() => {
      this.todaysDate = new Date();
    }, 1000);
  }

 

  ngOnInit() {
    this.loadSubscription = this.loaderService.getState().subscribe(status=>{
      this.showLoad = status;
    });

    this.merchantService.getMerchantInfo().subscribe(data => {
      this.merchant = data;
    });
  }

  logOut(){
    localStorage.removeItem('token');
    window.location.href="home";
  }

  ngOnDestroy(){
    this.loadSubscription.unsubscribe();
  }
}
