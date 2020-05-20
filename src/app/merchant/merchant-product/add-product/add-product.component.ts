import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantService } from '../../services/merchant.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  dropcheck: boolean = false;
  addProductForm:FormGroup;
  submitted:boolean = false;
  image:string;
  AllImage:string[];
  productCategory: any[];
  constructor(private formBuilder:FormBuilder, private service:MerchantService) {
   this.AllImage=["1001.jpg","1002.jpg","1003.jpg","1004.jpg","1005.jpg","1006.jpg","1007.jpg","1008.jpg",
   "1009.jpg","1010.jpg","1011.jpg","1012.jpg", "1013.jpg","1014.jpg","1015.jpg","1016.jpg",
   "1017.jpg","1018.jpg","1019.jpg","1020.jpg"]; 

    this.service.getAllCategory().subscribe((data)=>{
      this.productCategory = data;
      console.log(data);
    },
    (err)=>{
      alert(err.error);
    })
   }

  ngOnInit() {
    this.addProductForm = this.formBuilder.group({
      productName:['',[Validators.required, Validators.minLength(3), Validators.pattern("[A-Za-z][A-Za-z0-9 _]*")]],
      productPrice:['',[Validators.required, Validators.min(1)]],
      productBrand:['',[Validators.required, Validators.pattern("[A-Za-z][A-Za-z0-9 _]*")]],
      categoryName:['', Validators.required],
      subCategory:['', [Validators.required, Validators.min(3), Validators.pattern("[A-Za-z][A-Za-z0-9 _]*")]],
      noOfProducts:['', [Validators.required, Validators.min(1)]],
      productInfo:['', [Validators.required]],
      productImage:['', Validators.required],
      // username:['']
    })

  }
  proceed4(){
    this.image=this.addProductForm.controls.productImage.value;
    this.dropcheck = true;
  }
  addCoupon(){
    this.submitted = true;
    if(this.addProductForm.invalid){
      return;
    }
    // console.log
    // this.addProductForm.controls.username.setValue("Amarjeet.soni@gmail.com");
    if(confirm('Do you want to add Product?')){
    this.service.addProduct(this.addProductForm.value).subscribe((data)=>{
         alert(data);
         window.location.reload();
    },
    (err)=>{
      console.log(err);
      alert(err.error);
    })
  }
}

}
