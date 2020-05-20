import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CouponDetails } from 'src/app/models/CouponDetails';
import { MerchantService } from '../services/merchant.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit,OnDestroy {

  submitted:boolean=false;
  value: number = 1;
  addCouponForm:FormGroup;
  coupon:CouponDetails;
  constructor(private formBuilder:FormBuilder, private service:MerchantService, public datepipe: DatePipe, private router: Router) {
      //this.loaderService.hide();
     }
  invalidStartDate:boolean = false;
  invalidCouponCode:boolean = false;
  invalidDate:boolean = false;
  invalidEndDate:boolean= false;
  Startdate:any;
  EndDate:any;
  couponName:string;
  CouponDesc:string;
  CouponAmount:number;
  MinOrderAmount:number;
  CouponStartDate:any;
  CouponEndDate:any;
  ngOnInit() {
    this.addCouponForm=this.formBuilder.group({
      couponCode:['',[Validators.required, Validators.minLength(3), Validators.pattern("[A-Za-z][A-Za-z][a-zA-Z0-9]{0,15}")]],
      couponDesc:['',Validators.required],
      couponAmount:['', [Validators.required, Validators.min(1)]],
      minOrderAmount: ['', [Validators.required, Validators.min(1)]],
      couponStartDate: ['', Validators.required],
      couponEndDate: ['', Validators.required]
    })
  }
  
  proceed2(){
    this.submitted = true;
    if(this.addCouponForm.controls.couponCode.invalid || this.addCouponForm.controls.couponDesc.invalid){
      return;
    }
    
    this.couponName = this.addCouponForm.controls.couponCode.value;
    this.CouponDesc = this.addCouponForm.controls.couponDesc.value;
    this.service.checkCouponCode(this.addCouponForm.controls.couponCode.value).subscribe((data)=>{
      this.submitted = false;
      this.value = 2;
    },
    (err)=>{
      this.invalidCouponCode = true;
      console.log(err.error);
    })
  }

  proceed3(){
    this.submitted = true;
    if(this.addCouponForm.controls.couponAmount.invalid || this.addCouponForm.controls.minOrderAmount.invalid){
      return;
    }

    if(this.addCouponForm.controls.minOrderAmount.value < this.addCouponForm.controls.couponAmount.value){
      this.invalidDate = true;
      return;
    }
    this.CouponAmount = this.addCouponForm.controls.couponAmount.value;
    this.MinOrderAmount = this.addCouponForm.controls.minOrderAmount.value;
    this.submitted = false;
    this.value = 3;
  }

  proceed4(){
    this.submitted = true;
    if(this.addCouponForm.controls.couponStartDate.invalid || this.addCouponForm.controls.couponEndDate.invalid){
      return;
    }
  
    let time = (this.addCouponForm.controls.couponStartDate.value);
    let time2 = (this.addCouponForm.controls.couponEndDate.value);
    
    this.Startdate = this.datepipe.transform(time, 'yyyy-MM-dd HH:mm:ss');
    this.EndDate = this.datepipe.transform(time2, 'yyyy-MM-dd HH:mm:ss');
    
    this.CouponStartDate = this.Startdate;
    this.CouponEndDate = this.EndDate;
    let count = 0;
    
    this.service.checkStartDate(this.Startdate).subscribe((data)=>{
      this.invalidStartDate = false;
      count++;
      if(count == 2){
        this.submitted = false;
        this.value = 4;
       }
    },
    (err)=>{
      this.invalidStartDate = true;
      alert(err.error.message);
    })

    this.service.checkEndDate(this.Startdate, this.EndDate).subscribe((data)=>{
      count++;
      this.invalidEndDate = false;
      if(count == 2){
        this.submitted = false;
        this.value = 4;
       }
    },
    (err)=>{
      this.invalidEndDate = true;
      alert(err.error.message);
    })
  }

  addCoupon(){
    this.addCouponForm.controls.couponStartDate.setValue(this.Startdate);
    this.addCouponForm.controls.couponEndDate.setValue(this.EndDate);
    this.service.createCoupon(this.addCouponForm.value).subscribe((data)=>{
         alert(data);
         window.location.reload();
    },
    (err)=>{
       console.log(err.error);
    })
  }
  ngOnDestroy(){
    
  }
}