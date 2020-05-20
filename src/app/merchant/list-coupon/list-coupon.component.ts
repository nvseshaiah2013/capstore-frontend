import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CouponDetails } from 'src/app/models/CouponDetails';
import { MerchantService } from '../services/merchant.service';
import { DatePipe } from '@angular/common';
import { LoaderService } from 'src/app/admin/services/loader.service';

@Component({
  selector: 'app-list-coupon',
  templateUrl: './list-coupon.component.html',
  styleUrls: ['./list-coupon.component.css']
})
export class ListCouponComponent implements OnInit,OnDestroy{

  addForm: FormGroup;
  submitted: boolean = false;
  invalidStartDate:boolean = false;
  invalidEndDate:boolean = false;
  couponDetail: CouponDetails[];
  constructor(private service: MerchantService, private formBuilder:FormBuilder, public datepipe: DatePipe
    ) { 
      this.service.getCouponList().subscribe((data)=>{
           this.couponDetail = data;
      },
      (err)=>{
        console.log(err.error.message);
      })
  }

  ngOnInit() {
    this.addForm=this.formBuilder.group({
      couponCode:['',[Validators.required, Validators.minLength(3), Validators.pattern("[A-Za-z][A-Za-z][a-zA-Z0-9]{0,15}")]],
      couponDesc:['',Validators.required],
      couponAmount:['', [Validators.required, Validators.min(1)]],
      minOrderAmount: ['', [Validators.required, Validators.min(1)]],
      couponStartDate: ['', Validators.required],
      couponEndDate: ['', Validators.required]
    })
  }

  updateDetails(coupon:CouponDetails){
     this.addForm.controls.couponCode.setValue(coupon.couponCode);
     this.addForm.controls.couponDesc.setValue(coupon.couponDesc);
     this.addForm.controls.couponAmount.setValue(coupon.couponAmount);
     let startdate = this.datepipe.transform(coupon.couponStartDate, 'yyyy-MM-ddTHH:mm:ss');
     let enddate = this.datepipe.transform(coupon.couponEndDate, 'yyyy-MM-ddTHH:mm:ss');
     this.addForm.controls.minOrderAmount.setValue(coupon.minOrderAmount);
     this.addForm.controls.couponStartDate.setValue(startdate);
     this.addForm.controls.couponEndDate.setValue(enddate);

  }

  updatedate(){
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    let time = (this.addForm.controls.couponStartDate.value);
    let time2 = (this.addForm.controls.couponEndDate.value);
    let Startdate = this.datepipe.transform(time, 'yyyy-MM-dd HH:mm:ss');
    let EndDate = this.datepipe.transform(time2, 'yyyy-MM-dd HH:mm:ss');
    let count = 0;
    
    this.service.checkStartDate(Startdate).subscribe((data)=>{
      count++;
       this.invalidStartDate = false;
       if(count == 2){
         if(confirm('Do you want to update coupon ?')){
        this.service.updateCoupon(this.addForm.controls.couponCode.value,Startdate,EndDate).subscribe(
          (data)=>{
              window.location.reload();
              this.submitted = false;
              this.addForm.reset;
          },
          (err)=>{
            console.log(err.error);
            window.location.reload();
          }
        )
    }
    }
    },
    (err)=>{
      this.invalidStartDate = true;
      alert("Start Date Must be greater than Present date...");
    })

    this.service.checkEndDate(Startdate, EndDate).subscribe((data)=>{
            count++;
            this.invalidEndDate = false;
            if(count == 2){
              if(confirm('Do you want to update coupon')){
              this.service.updateCoupon(this.addForm.controls.couponCode.value,Startdate,EndDate).subscribe(
                (data)=>{
                 console.log(data); 
                    window.location.reload();
                    this.submitted = false;
                    this.addForm.reset;
                },
                (err)=>{
                  console.log(err.error);
                  window.location.reload();
                }
              )
          }
        }
    },
    (err)=>{
      this.invalidEndDate = true;
      alert("End Date must be after than Start date..." );
    })
  }
  deleteCouponCode(couponCode){
    if(confirm("Are you sure you want to delete " + couponCode)){
      this.service.deleteCoupon(couponCode).subscribe((data)=>{
           window.location.reload();
      },
      (err)=>{
        console.log(err); 
        window.location.reload();
      })
    }
  }
  ngOnDestroy(){
    
  }
}