import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonFeedback } from 'src/app/models/common-feedback.model';
import { Merchant } from 'src/app/models/merchant.model';

@Injectable({
  providedIn: 'root'
})
export class MerchantFeedService {

  private baseUrl = 'http://localhost:8083/admin/';
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
}
