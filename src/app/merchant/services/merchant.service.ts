import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Orders } from 'src/app/models/order.model';
import { Merchant } from 'src/app/models/merchant.model';
import { Product } from 'src/app/models/product.model';
import { Invitation } from 'src/app/models/invitation.model';
import { CouponDetails } from 'src/app/models/CouponDetails';
import { CommonFeedback } from 'src/app/models/common-feedback.model';
import { Response } from 'src/app/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  url: string = "http://localhost:8083/merchant/";
  constructor(private http: HttpClient) { }

  getMerchantOrders(){
    return this.http.get<Orders[]>(this.url + "merchantOrders/");
  }

  acceptMerchantOrder(orderId : string, status : string){
    return this.http.get<Orders>(this.url + "acceptMerchantOrder/" + orderId + "/" + status);
  }

  getMerchantInfo(){
    return this.http.get<Merchant>(this.url + "merchantInfo/");
  }

  getMerchantProducts(){
    return this.http.get<Product[]>(this.url + "getMerchantProducts/");
  }

  getMerchantInvites() {
    return this.http.get<Invitation[]>(this.url + 'invites');
  }
  activateProduct(id:number){
    return this.http.post(this.url + `activateProduct/${id}`,{});

  }
  deActivateProduct(id:number ){
    return this.http.post(this.url + 'inActivateProduct/'+id,{});
  }

  addProduct(product) {
    return this.http.post(this.url + "product/addProduct", product, { responseType: 'text' as 'json' });
  }

  getAllCategory() {
    return this.http.get<any[]>(this.url + "product/getCategory");
  }

  getProductbyId(id) {
    return this.http.get<any>(this.url + "product/getProduct?prodId=" + id);
  }

  getProductUpdate(proId, prodCount, prodPrice, prodinfo) {
    return this.http.post(this.url + "product/updateproduct?" + "prodId=" + proId + "&prodCount=" + prodCount + "&ProdPrice=" + prodPrice + "&Prodinfo=" + prodinfo, { responseType: 'text' as 'json' });
  }

  checkCouponCode(code: any) {
    return this.http.get(this.url + "checkCouponCode?couponCode=" + code);
  }

  checkStartDate(startDate: any) {
    return this.http.get(this.url + "checkstartdate?start=" + startDate);
  }

  checkEndDate(startDate: any, endDate: any) {
    return this.http.get(this.url + "checkenddate?start=" + startDate + "&end=" + endDate);
  }

  createCoupon(Coupon: any) {
    return this.http.post(this.url + "addCoupon", Coupon, { responseType: 'text' as 'json' });
  }

  getCouponList() {
    return this.http.get<CouponDetails[]>(this.url + "listOfCoupons");
  }

  updateCoupon(couponCode: any, start: any, end: any) {
    return this.http.post(this.url + "updateCoupon?coupon=" + couponCode + "&start=" + start + "&end=" + end, { responseType: 'text' as 'json' });
  }

  deleteCoupon(coupon: any) {
    return this.http.post(this.url + "deleteCoupon?couponName=" + coupon, { responseType: 'text' as 'json' });
  }

  acceptInvite(id:number){
    let params = new HttpParams().set('id',id.toString())
    return this.http.post(this.url + 'acceptInvite',{},{params:params});
  }

  rejectInvite(id:number){
    let params = new HttpParams().set('id',id.toString())
    return this.http.post(this.url + 'rejectInvite',{},{params:params});
  }

  merchantFeedbackHandler(){
    return this.http.get<CommonFeedback[]>(this.url + 'getFeedbacksMerchant');
  }

  merchantResponseHandler(response : Response){
    return this.http.post(this.url + 'getMerchantResponse', response);
  }
}
