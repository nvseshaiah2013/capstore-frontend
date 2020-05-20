import { Component, OnInit, OnDestroy } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';
import { LoadingSpinnerService } from '../services/loading-spinner.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {

  products:Product[];
  product:Product;
  
  constructor(private merchantService:MerchantService, private route : Router,private loaderService:LoadingSpinnerService) { }

  ngOnInit() {

    this.merchantService.getMerchantProducts().subscribe(data=>
      {
        this.products=data;
        this.loaderService.hide();
      }, err=>{
        this.loaderService.hide();
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

  ngOnDestroy(){
    this.loaderService.show();
  }

}
