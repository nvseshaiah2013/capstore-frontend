import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

   todaysDate = new Date();
   loadSubscription:Subscription;
   successToast:Subscription;
   failToast:Subscription;
   showToastFail:boolean = false;
   showToastSuccess:boolean = false;
   showLoad:boolean = true;
   error:any;
   success:any;
  constructor(private loaderService:LoaderService,private toastService:ToastService) {
    setInterval(() => {
      this.todaysDate = new Date();
    }, 1000);
  }
  ngOnInit() {
    this.loadSubscription = this.loaderService.getState().subscribe(status=>{
      this.showLoad = status;
    });
    this.successToast = this.toastService.getSuccessState().subscribe(status=>{
      this.showToastSuccess = status;
      if(this.showToastSuccess){
        this.success = this.toastService.getSuccess();
      }
    })
    this.failToast = this.toastService.getFailState().subscribe(status=>{
      this.showToastFail = status;
      if (this.showToastFail) {
        this.error = this.toastService.getError();
      }
    })
  }

  ngOnDestroy(){
    this.loadSubscription.unsubscribe();
    this.successToast.unsubscribe();
    this.failToast.unsubscribe();
  }

  successToggle(){
    this.toastService.hideSuccess();
  }

  failToggle(){
    this.toastService.hideFail();
  }

}
