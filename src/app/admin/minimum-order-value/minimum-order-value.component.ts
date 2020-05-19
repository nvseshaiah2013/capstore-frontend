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
  {this.submitted=true;
    if(this.minOrderAmountForm.invalid)
    return
    this.loaderService.show();
    this.adminService.setMinOrderValue(this.minOrderAmountForm.controls.amount.value).subscribe(data=>
      {
        this.money=data
        this.loaderService.hide();
      },(err:HttpErrorResponse)=>{
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
