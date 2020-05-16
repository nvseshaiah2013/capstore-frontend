import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/models/customer.model';
import { Observable } from 'rxjs';
import { Merchant } from '../../models/merchant.model';
import { Orders } from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url: string = "http://localhost:8083/admin";

  constructor(private http: HttpClient) { }

  getListOfCustomers() {
    return this.http.get<Customer[]>(this.url + "/customer");
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

  getTodayProductSales(){
    return this.http.get<Orders[]>(this.url+"/todayProductSales")
  }
}


