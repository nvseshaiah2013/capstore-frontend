import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orders } from 'src/app/models/order.model';
import { Merchant } from 'src/app/models/merchant.model';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  url: string = "http://localhost:8083/";
  constructor(private http: HttpClient) { }

  getMerchantOrders(username : string){
    return this.http.get<Orders[]>(this.url + "merchantOrders/" + username);
  }

  acceptMerchantOrder(orderId : string, status : string){
    return this.http.get<Orders>(this.url + "acceptMerchantOrder/" + orderId + "/" + status);
  }

  getMerchantInfo(username : String){
    return this.http.get<Merchant>(this.url + "merchantInfo/" + username);
  }

}
