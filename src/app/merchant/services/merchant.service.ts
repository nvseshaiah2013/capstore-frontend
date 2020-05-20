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

}
