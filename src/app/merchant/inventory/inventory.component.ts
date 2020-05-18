import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  products:Product[];
  product:Product;
  
  constructor(private merchantService:MerchantService) { }

  ngOnInit() {

    this.merchantService.getMerchantProducts('harsha98').subscribe(data=>
      {
        this.products=data;
      }, err=>{
        console.log(err);
      })
    
  }

  counter(i:number){
    return new Array(i);
  }

  activateProduct(product:Product)
  {
    let username = product.merchant.username;
    let id = product.productId;
    this.merchantService.activateProduct(username,id).subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  inActivateProduct(product:Product){
    let username = product.merchant.username;
    let id = product.productId;
    this.merchantService.deActivateProduct(username, id).subscribe(data => {
      console.log(data);
    }, err=>{
      console.log(err);
    })
  }
  viewDetails(p:Product)
  {
    this.product=p;
  }

  

}
