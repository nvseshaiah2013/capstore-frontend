import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Orders } from 'src/app/models/order.model';
import { Merchant } from 'src/app/models/merchant.model';
import { Product } from 'src/app/models/product.model';
import { Invitation } from 'src/app/models/invitation.model';

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

  getMerchantProducts(username : string){
    return this.http.get<Product[]>(this.url + "getMerchantProducts/" + username);
  }

  getMerchantInvites(username : string ) {
    let params = new HttpParams().set('username',username);
    return this.http.get<Invitation[]>(this.url + 'merchant/invites',{params:params});
  }
  activateProduct(username:string ,id:number){
    let params = new HttpParams().set('username',username).set('id',id.toString());
    return this.http.post(this.url + 'activateProduct',{},{params:params});

  }
  deActivateProduct(username:string,id:number ){
    let params = new HttpParams().set('username',username).set('id',id.toString());
    return this.http.post(this.url + 'inActivateProduct',{},{params:params});
  }
}
