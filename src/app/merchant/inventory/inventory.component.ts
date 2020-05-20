import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  products:Product[];
  product:Product;
  
  constructor(private merchantService:MerchantService, private route : Router) { }

  ngOnInit() {

    this.merchantService.getMerchantProducts().subscribe(data=>
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
    let id = product.productId;
    this.merchantService.activateProduct(id).subscribe(data=>{
      console.log(data);
      window.location.reload();
    },err=>{

      console.log(err);
      window.location.reload();
    })
    
  }
  inActivateProduct(product:Product){
    let id = product.productId;
    this.merchantService.deActivateProduct( id).subscribe(data => {
      console.log(data);
      window.location.reload();
    }, err=>{
      console.log(err);
      window.location.reload();
    })
  }
  viewDetails(p:Product)
  {
    this.product=p;
  }

  updateProduct(id:number){
   this.route.navigate(['merchant/inventory/updateStock',id]);
  }

  

}
