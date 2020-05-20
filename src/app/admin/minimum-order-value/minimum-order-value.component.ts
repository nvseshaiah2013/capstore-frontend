import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { LoaderService } from '../services/loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-minimum-order-value',
  templateUrl: './minimum-order-value.component.html',
  styleUrls: ['./minimum-order-value.component.css']
})
export class MinimumOrderValueComponent implements OnInit,OnDestroy {

  money
  submitted:boolean=false
  amount:number;
  
  amountFlag:boolean=false;
  amountErrorMessage:string;
  minOrderAmountForm:FormGroup
  constructor(private formBuilder:FormBuilder,private adminService:AdminService
    ,private loaderService:LoaderService,private router:Router) { }
  
  ngOnInit() {
    this.minOrderAmountForm=this.formBuilder.group({
      amount:['',Validators.required]
    })
    this.adminService.gitMinOrderValueAmount().subscribe(data=>
      {
        this.money=data
        
        this.loaderService.hide();
      })
  }
  updateAmount()
  {
    this.submitted=true;
    if(this.minOrderAmountForm.invalid)
    return
    
    this.amount=this.minOrderAmountForm.controls.amount.value
    this.adminService.setMinOrderValue(this.amount).subscribe(data=>
      {
        this.money=data
        
    this.loaderService.show();    
    this.loaderService.hide();
    this.amountFlag=false;
      },(err:HttpErrorResponse)=>{
        this.amountFlag=true
        this.amountErrorMessage=err.error.message
        if(err.status == 0){
          this.router.navigate(['error']);
          this.loaderService.hide();
        }
      })
      
      
  }

  ngOnDestroy(){
    this.loaderService.show();
  }


}
