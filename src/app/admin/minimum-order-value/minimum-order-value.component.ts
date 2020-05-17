import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-minimum-order-value',
  templateUrl: './minimum-order-value.component.html',
  styleUrls: ['./minimum-order-value.component.css']
})
export class MinimumOrderValueComponent implements OnInit {

  money
  submitted:boolean=false
  minOrderAmountForm:FormGroup
  constructor(private formBuilder:FormBuilder,private adminService:AdminService) { }
  
  ngOnInit() {
    this.minOrderAmountForm=this.formBuilder.group({
      amount:['',Validators.required]
    })
    this.adminService.gitMinOrderValueAmount().subscribe(data=>
      {
        this.money=data
      })
  }
  updateAmount()
  {this.submitted=true;
    if(this.minOrderAmountForm.invalid)
    return
    this.adminService.setMinOrderValue(this.minOrderAmountForm.controls.amount.value).subscribe(data=>
      {
        this.money=data
      })
  }


}
