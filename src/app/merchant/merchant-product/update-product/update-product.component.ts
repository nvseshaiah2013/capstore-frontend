import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MerchantService } from '../../services/merchant.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  currentId:number;
  addProductForm:FormGroup;
  product:any;
  image: string;
  submitted:boolean=false;
  constructor(private formBuilder: FormBuilder,private router: Router, private service: MerchantService,
  private route:ActivatedRoute, private loaderService:LoadingSpinnerService) {
    this.route.params.subscribe(params=>{
      this.currentId = params['id'];
    })
   this.service.getProductbyId(this.currentId).subscribe((data)=>{
      this.product = data;
      console.log(data);
      this.addProductForm.controls.productName.setValue(this.product.productName);
      this.addProductForm.controls.productPrice.setValue(this.product.productPrice);
      this.addProductForm.controls.productBrand.setValue(this.product.productBrand);
      this.addProductForm.controls.subCategory.setValue(this.product.subCategory.name);
      this.addProductForm.controls.noOfProducts.setValue(this.product.noOfProducts);
      this.addProductForm.controls.productInfo.setValue(this.product.productInfo);
      this.addProductForm.controls.productImage.setValue(this.product.productImage);
      this.image = this.product.productImage;
   },
   (err)=>{
      alert(err.error);
   })
   }
  ngOnInit() {
    this.addProductForm = this.formBuilder.group({
      productName:[''],
      productPrice:['',[Validators.required, Validators.min(1)]],
      productBrand:[''],
      subCategory:[''],
      noOfProducts:['', [Validators.required, Validators.min(1)]],
      productInfo:['', [Validators.required]],
      productImage:['']
    })
    this.loaderService.hide();
  }
  updateproduct(){
    this.submitted = true;
    if(this.addProductForm.invalid){
      return;
    }
    if(confirm("do you want to update product details.")){
    this.service.getProductUpdate(this.currentId, this.addProductForm.controls.noOfProducts.value, this.addProductForm.controls.productPrice.value, this.addProductForm.controls.productInfo.value).subscribe((data)=>{
        alert(data);
        window.location.reload();
    },
    (err)=>{
      console.log(err);
      window.location.reload();
    })
  }
}
ngOnDestroy(){
  this.loaderService.show();
}

}
