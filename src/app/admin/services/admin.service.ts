import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/models/customer.model';
import { Category } from 'src/app/models/category.model';
import { Address } from 'src/app/models/address.model';
import { Merchant } from 'src/app/models/merchant.model';
import { Orders } from 'src/app/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url: string = "http://localhost:8080/admin";

  constructor(private http: HttpClient) { }

  getListOfCustomers() {
    return this.http.get<Customer[]>(this.url + "/customer");
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

  getTopRatedMerchants() {
    return this.http.get<Merchant[]>(this.url + "/topRatedMerchants");
  }

  getAllOrders() {
    return this.http.get<Orders[]>(this.url + "/orders");
  }

  updateOrderStatus(orderId: number, status: string) {
    return this.http.get(this.url + "/orders/" + orderId + "/" + status);
  }
}


