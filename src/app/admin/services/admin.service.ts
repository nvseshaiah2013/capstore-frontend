import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { customer } from 'src/app/models/customer.model';
import { Observable } from 'rxjs';
import { Orders } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url:string="http://localhost:8080/admin";

  constructor(private http:HttpClient) { }

  getListOfCustomers(){
    return this.http.get<customer[]>(this.url+"/customer");
  }

  getAllOrders(){
    return this.http.get<Orders[]>(this.url+"/orders");
  }

  updateOrderStatus(orderId:number,status:string){
    return this.http.get<string>(this.url+"/orders/"+orderId+"/"+status);
  }
}