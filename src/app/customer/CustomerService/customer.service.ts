import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/models/orders.model';
import { Address } from 'src/app/models/address.model';
import { Customer } from 'src/app/models/customer.model';
import { Merchant } from 'src/app/models/merchant.model';
import { CommonFeedback } from 'src/app/models/common-feedback.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  ShareOrder:Order={
    address:null,
    customer: null,
    orderAmount: null,
    orderDate: null,
    orderId: 0,
    orderStatus: null,
    product: null,
    quantity: 0,
    statusDate: null,
    transaction:null
  }

  public saveOrder(order:Order){ //sumit
    this.ShareOrder= order;
  }
  public getOrder(){  //sumit
    return this.ShareOrder;
  }
  public getMyOrders(token){  //sumit
    return this.http.get<Order[]>("http://localhost:8083/customer/myorders");
  }
  public getStatus(token,orderId:number){ //sumit
    let tokenStr = 'Bearer ' + token;
    return this.http.get<String>(`http://localhost:8083/customer/getStatus/${orderId}`,{responseType:'text' as 'json'});
  }
  public updateStatus(token,orderId:number,status:String){ //sumit
    let tokenStr = 'Bearer ' + token;
    return this.http.get<Boolean>(`http://localhost:8083/customer/updateStatus/${orderId}/${status}`);
  }
  addAddress(add:Address,token) //sagar
  {
    let tokenStr = 'Bearer ' + token;
    return this.http.post(`http://localhost:8083/customer/addAddress`,add);
  }
  viewAddress(token){ //sagar
    let tokenStr = 'Bearer ' + token;
    return this.http.get<Address[]>(`http://localhost:8083/customer/viewAddress`);
  }
  deleteAddress(addressId:number){  //sagar
    let tokenStr = 'Bearer ' + localStorage.token;
    return this.http.get(`http://localhost:8083/customer/deleteAddress/${addressId}`);
  }

  public getcustomerdetails(token) //prajakta
  {
    return this.http.get<Customer>(`http://localhost:8083/customer/getUserDetails`);
  }

  public editUser(cust:Customer)//prajakta
  {
   return this.http.put("http://localhost:8083/customer/editUser",cust,{responseType:'text'})
  }

  getMerchantList(){
    return this.http.get<string[]>("http://localhost:8083/customer/getMerchantNameList");
  }

  userFeedbackView(){
    return this.http.get<CommonFeedback[]>("http://localhost:8083/customer/responseToUser");
  }

  userFeedback(feedback:CommonFeedback) {
    return this.http.post("http://localhost:8083/customer/addfeedback",feedback);
  }
}
