import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  editForm:FormGroup;
  submitted:boolean=false;

  constructor(private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.editForm=this.formBuilder.group({
      status:['',Validators.required]
    });
  }

  updateStatus(){
    this.submitted=true;

    if(this.editForm.invalid){
      return;
    }

    alert("updated..!!");
    this.router.navigate(['admin/orders']);
  }
}