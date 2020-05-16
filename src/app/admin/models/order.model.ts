import {Address} from '../models/Address';
import {Transactions} from '../models/Transactions';
import {Product} from '../models/Product';
import {CustomerDetails} from '../models/CustomerDetails';

export class Orders{
    orderId:number;
    orderAmount:number;
    orderStatus:string;
    orderDate:Date;
    statusDate:Date;
    transaction:Transactions;
    address:Address;
    customerDetails:CustomerDetails;
    product:Product;
    quantity:number;
}