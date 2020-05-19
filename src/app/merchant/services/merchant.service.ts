import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Orders } from 'src/app/models/order.model';
import { Merchant } from 'src/app/models/merchant.model';
import { Product } from 'src/app/models/product.model';
import { Invitation } from 'src/app/models/invitation.model';
import { CouponDetails } from 'src/app/models/CouponDetails';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  url: string = "http://localhost:8083/merchant/";
  url1: string = "http://localhost:8083/admin";
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
    return this.http.get<Invitation[]>(this.url + 'invites',{params:params});
  }
  activateProduct(username:string ,id:number){
    let params = new HttpParams().set('username',username).set('id',id.toString());
    return this.http.post(this.url + 'activateProduct',{},{params:params});

  }
  deActivateProduct(username:string,id:number ){
    let params = new HttpParams().set('username',username).set('id',id.toString());
    return this.http.post(this.url + 'inActivateProduct',{},{params:params});
  }

  addProduct(product) {
    return this.http.post(this.url + "/product/addProduct", product, { responseType: 'text' as 'json' });
  }

  getAllCategory() {
    return this.http.get<any[]>(this.url + "/product/getCategory");
  }

  getProductbyId(id) {
    return this.http.get<any>(this.url + "/product/getProduct?prodId=" + id);
  }

  getProductUpdate(proId, prodCount, prodPrice, prodinfo) {
    return this.http.post(this.url + "/product/updateproduct?" + "prodId=" + proId + "&prodCount=" + prodCount + "&ProdPrice=" + prodPrice + "&Prodinfo=" + prodinfo, { responseType: 'text' as 'json' });
  }

  checkCouponCode(code: any) {
    return this.http.get(this.url1 + "/checkCouponCode?couponCode=" + code);
  }

  checkStartDate(startDate: any) {
    return this.http.get(this.url1 + "/checkstartdate?start=" + startDate);
  }

  checkEndDate(startDate: any, endDate: any) {
    return this.http.get(this.url1 + "/checkenddate?start=" + startDate + "&end=" + endDate);
  }

  createCoupon(Coupon: any) {
    return this.http.post(this.url1 + "/addCoupon", Coupon, { responseType: 'text' as 'json' });
  }

  getCouponList() {
    return this.http.get<CouponDetails[]>(this.url1 + "/listOfCoupons");
  }

  updateCoupon(couponCode: any, start: any, end: any) {
    return this.http.post(this.url1 + "/updateCoupon?coupon=" + couponCode + "&start=" + start + "&end=" + end, { responseType: 'text' as 'json' });
  }

  deleteCoupon(coupon: any) {
    return this.http.post(this.url1 + "/deleteCoupon?couponName=" + coupon, { responseType: 'text' as 'json' });
  }
}
