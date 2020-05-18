import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { ResourceLoader } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  submitted:boolean=false;
  submitted2:boolean=false;
  submitted3:boolean=false
  addCategoryForm:FormGroup
  addSubCategoryForm:FormGroup
  updateCategoryForm:FormGroup
  updatedCategoryName:string
  categoryName:string
  categories:any
  categoryId:number
  subCategories:any
  constructor(private formBuilder:FormBuilder,private adminService:AdminService,private route:Router) {
   
    this.adminService.getCategories().subscribe(data=>
      {
        this.categories=data
      })
   }

  ngOnInit() {
    this.addCategoryForm=this.formBuilder.group({
      name:['',Validators.required]
    })
    this.addSubCategoryForm=this.formBuilder.group({
      name:['',Validators.required]
    })

    this.updateCategoryForm=this.formBuilder.group({
      name:['',Validators.required],
      id:['']
    })
  }
  addCategory()
  {
    this.submitted=true;
    if(this.addCategoryForm.invalid)
    return;
    this.adminService.addCategory(this.addCategoryForm.value).subscribe(data=>
      {
        this.categories=data
      })
  }
  editButton(category:any,categoryId:number)
  {
    this.categoryId=categoryId
    this.updatedCategoryName=category
    this.updateCategoryForm.setValue({"name":category,"id":categoryId})
  }
  updateCategory()
  {
    this.submitted2=true;
    if(this.updateCategoryForm.invalid  || this.updateCategoryForm.controls.name.value==this.updatedCategoryName)
    return;
    this.adminService.updateCategoryName(this.updateCategoryForm.value).subscribe(data=>
      {
      
      })
      
  }
  changeCategoryName(categoryName:string)
  {
    this.categoryName=categoryName
  }
  getSubCategory(id:number)
  {
    this.categoryId=id
    this.adminService.getSubCategories(id).subscribe(data=>
      {
        this.subCategories=data
      })
  }
  addSubCategory()
  {
    this.submitted3=true;
    if(this.addSubCategoryForm.invalid)
    return;
    this.adminService.addSubCategory(this.addSubCategoryForm.value,this.categoryId).subscribe(data=>
      {
        this.subCategories=data;
      })
      this.submitted3=false;
      this.addSubCategoryForm.reset()
      
  }
  
}
