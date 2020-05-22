import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Order } from 'src/app/models/orders.model';
import { Address } from 'src/app/models/address.model';
import { Customer } from 'src/app/models/customer.model';




@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  private baseUrl:string = 'http://localhost:8083/customer/'
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

  registerNewUser(user: User) {
    return this.http.post(this.baseUrl + 'addUser', user,  { responseType: 'text' as 'json' });
  }

  forgotPassword(uname,securityQue,securityAns) {
   let forgotPassRequest={
      "username":uname,
      "securityQuestion":securityQue,
      "securityAnswer":securityAns
    }
    return this.http.post<String>(this.baseUrl + 'forgotPassword',forgotPassRequest, { responseType: 'text' as 'json' });
  }


  changePassword(token, oldPassword, newPassword){
    return this.http.get(this.baseUrl + 'changePassword/' +oldPassword+ '/' +newPassword,{ responseType: 'text' as 'json'} );
  }

  public saveOrder(order:Order){ //sumit
    this.ShareOrder= order;
  }
  public getOrder(){  //sumit
    return this.ShareOrder;
  }
  public getMyOrders(token){  //sumit
    return this.http.get<Order[]>( this.baseUrl + "myorders");
  }
  public getStatus(token,orderId:number){ //sumit
    return this.http.get<String>(`${this.baseUrl}${orderId}`,{responseType:'text' as 'json'});
  }
  public updateStatus(token,orderId:number,status:String){  //sumit
    return this.http.get<Boolean>(`${this.baseUrl}updateStatus/${orderId}/${status}`);
  }
  addAddress(add:Address,token) //sagar
  {
    return this.http.post(`${this.baseUrl}addAddress`,add);
  }
  viewAddress(token){ //sagar
   
    return this.http.get<Address[]>(`${this.baseUrl}viewAddress`);
  }
  deleteAddress(addressId:number){  //sagar
   
    return this.http.get(`${this.baseUrl}deleteAddress/${addressId}`);
  }

  public getcustomerdetails(token) //prajakta
  {
    return this.http.get<Customer>(`${this.baseUrl}getUserDetails`);
  }

  public editUser(cust:Customer)//prajakta
  {
   return this.http.put(`${this.baseUrl}editUser`,cust,{responseType:'text'})
  }
}
