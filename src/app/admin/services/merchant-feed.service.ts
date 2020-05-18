import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonFeedback } from 'src/app/models/common-feedback.model';
import { Merchant } from 'src/app/models/merchant.model';
import { Product } from 'src/app/models/product.model';
import { Orders } from 'src/app/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class MerchantFeedService {

  private baseUrl = 'http://localhost:8083/admin/';
  private baseUrl2 = 'http://localhost:8083/merchant/';
  constructor(private http:HttpClient) { }


  getCommonFeedbacks(){
    return this.http.get<CommonFeedback[]>(this.baseUrl + 'commonFeedbacks');
  }
  redirectFeedback(id:number){
    return this.http.post(this.baseUrl + 'redirectFeedback/' + id,{});
  }
  getProductCount(merchant:Merchant){
    let params = new HttpParams().set('username',merchant.username);
    return this.http.get<number>(this.baseUrl + 'productCount',{params:params});
  }
  getOrderCount(merchant:Merchant) {
    let params = new HttpParams().set('username',merchant.username);
    return this.http.get<number>(this.baseUrl + 'orderCount',{params:params});
  }

  activateMerchant(username:string){
    let params = new HttpParams().set('username',username);
    return this.http.post(this.baseUrl2 + 'activate',{},{params:params});
  }
  
  deActivateMerchant(username:string) {
    let params = new HttpParams().set('username',username);
    return this.http.post(this.baseUrl2 + 'deactivate',{},{params:params});
  }

  getMerchantOrders(username:string){
    let params = new HttpParams().set('username', username);
    return this.http.get<Orders[]>(this.baseUrl + 'orders/all', { params: params });
  }
  getMerchantProducts(username:string){
    let params = new HttpParams().set('username', username);
    return this.http.get<Product[]>(this.baseUrl + 'products/all', { params: params });
  }
  getMerchantFeedbacks(username:string){
    let params = new HttpParams().set('username', username);
    return this.http.get<CommonFeedback[]>(this.baseUrl + 'feedbacks/all', { params: params });
  }

  activateProduct(username:string ,id:number){
    let params = new HttpParams().set('username',username).set('id',id.toString());
    return this.http.post(this.baseUrl + 'activateProduct',{},{params:params});

  }
  deActivateProduct(username:string,id:number ){
    let params = new HttpParams().set('username',username).set('id',id.toString());
    return this.http.post(this.baseUrl + 'inActivateProduct',{},{params:params});
  }
}
