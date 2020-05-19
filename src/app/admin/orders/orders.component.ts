import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router ,NavigationEnd} from '@angular/router';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Orders } from '../../models/order.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';
declare var $:any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit,OnDestroy {

  editForm:FormGroup;
  submitted:boolean=false;
  orders:Orders[];
  index:number;
  message:string="";
  checkCoupon:boolean=true;
  error:string="";
  checkError:boolean=false;
  private routeSubscription:Subscription;
  constructor(private formBuilder:FormBuilder,private router:Router,private service:AdminService,private loaderService:LoaderService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    // this.loaderService.show();
    this.editForm=this.formBuilder.group({
      status:['',Validators.required]
    });

    this.service.getAllOrders().subscribe(data=>{
      this.orders=data;
      this.loaderService.hide();
    },err=>{
      this.loaderService.hide();
    });
  }

  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
    this.loaderService.show();
  }
  getIndex(index:number){
    this.index=index;
  }

  updateStatus(){
    this.submitted=true;

    if(this.editForm.invalid){
      return;
    }

    let status=this.editForm.controls.status.value;
    let orderId=this.orders[this.index].orderId;

    this.service.updateOrderStatus(orderId,status).subscribe(data=>{
      this.checkError=false;
      this.message=data.message;
        $('#exampleModalCenter').modal('hide');
        this.router.navigate(['admin', 'orders']);      
    },(err:HttpErrorResponse)=>{
      this.error=err.error.message;
        setTimeout(() => { $('#exampleModalCenter').modal('hide'); }, 2000);
        this.checkError=true;
    });
    
   
  }
 
}