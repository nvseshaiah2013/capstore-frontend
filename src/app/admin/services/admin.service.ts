import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/models/customer.model';
import { Category } from 'src/app/models/category.model';
import { Address } from 'src/app/models/address.model';
import { Merchant } from 'src/app/models/merchant.model';
import { Orders } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url: string = "http://localhost:8083/admin";

  constructor(private http: HttpClient) { }

  getListOfCustomers() {
    return this.http.get<Customer[]>(this.url + "/customer");
  }
  gitMinOrderValueAmount()
 {
   return this.http.get(this.url+"/minOrderValue")
 } 
 setMinOrderValue(amount:number)
 {
  return this.http.get(this.url+"/minOrderValue/"+amount)
 }
  getCategories()
  {
    return this.http.get<Category[]>(this.url+ "/category");
  }
  getSubCategories(categoryId:number)
  {
    return this.http.get<Category[]>(this.url+ "/subCategory/"+categoryId);
  }
  addCategory(category:any)
  {
    return this.http.post(this.url+"/category",category, { responseType: 'text' as 'json' })
  }
  addSubCategory(category:any,categoryId:number)
  {
    return this.http.post(this.url+"/subCategory/"+categoryId,category, { responseType: 'text' as 'json' })
  }
  updateCategoryName(category:any)
  {
    return this.http.put(this.url+"/category",category, { responseType: 'text' as 'json' })
  }
  getAddressByUsername(username:string)
  {
    return this.http.get<Address[]>(this.url+"/address/"+username);
  }

  getCountOfCustomers() {
    return this.http.get(this.url + "/countOfCustomers");
  }

  getCountOfMerchants() {
    return this.http.get(this.url + "/countOfMerchants");
  }
  addMerchant(merchantDetails)
  {
    return this.http.post(this.url+"/addMerchant",merchantDetails, { responseType: 'text' as 'json' })
  }
  getTopRatedMerchants() {
    return this.http.get<Merchant[]>(this.url + "/topRatedMerchants");
  }

  getAllOrders() {
    return this.http.get<Orders[]>(this.url + "/orders");
  }

  updateOrderStatus(orderId: number, status: string) {
    return this.http.get(this.url + "/orders/" + orderId + "/" + status);
  }
  checkValidEmail(email:string)
  {
    return this.http.get(this.url+"/checkEmail/"+email);
  }
  checkPhoneNo(phoneNo:string)
  {
    return this.http.get(this.url+"/checkPhoneNo/"+phoneNo);
  }

  getTrendingProducts(){
    return this.http.get<Product[]>(this.url+"/trendingProducts");
  }

  todayRevenue() {
    return this.http.get(this.url+"/todayRevenue");
  }

  todayProductSales() {
    return this.http.get(this.url+"/todayProductSales");
  }

  getRecentOrders() {
    return this.http.get<Orders[]>(this.url + "/recentOrders");
  }

  getRecentRevenues(){
    return this.http.get(this.url+"/recentRevenues");
  }

  getRecentOrdersCount(){
    return this.http.get(this.url+"/recentOrdersCount");
  }

  getProductById(prodId:number){
    return this.http.get<Product>(this.url+"/getProduct/"+prodId);
  }

  getMerchantByUsername(username:string){
    return this.http.get<Merchant>(this.url+"/getMerchant/"+username);
  }

}


