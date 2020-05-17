import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orders } from 'src/app/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  url: string = "http://localhost:8083/";
  constructor(private http: HttpClient) { }
  getMerchantOrders(username : string){
    return this.http.get<Orders[]>(this.url + "merchantOrders/" + username);
  }
}
