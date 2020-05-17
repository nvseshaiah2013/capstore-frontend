import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  view:boolean=true;
  pp=[];
  cc=[];
  customers:any;
  constructor() { }

  ngOnInit() {
    this.cc.push(1);
    this.pp.push(1);
    this.pp.push(1);
    this.pp.push(2);
    this.pp.push(3);
    this.pp.push(4);
    this.pp.push(2);
    this.pp.push(3);
    this.pp.push(4);
  }

  deleteProduct()
  {
    console.log("Product Name");
  }
  viewDetails()
  {
    console.log("Product");
  }

  

}
