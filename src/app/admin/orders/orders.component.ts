import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router ,NavigationEnd} from '@angular/router';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Orders } from '../../models/order.model';
declare var $:any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  editForm:FormGroup;
  submitted:boolean=false;
  orders:Orders[];
  index:number;
  message:string;
  checkCoupon:boolean=true;
  error:string="";
  checkError:boolean=false;

  constructor(private formBuilder:FormBuilder,private router:Router,private service:AdminService) { 
  }

  ngOnInit() {
    this.editForm=this.formBuilder.group({
      status:['',Validators.required]
    });

    this.service.getAllOrders().subscribe(data=>{
      this.orders=data;
    },err=>{
      console.log(err.stack);
    });
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
      this.message=data;
    },err=>{
      this.error=err.error;
      this.checkError=true;
    });
    window.location.reload();
  }
}