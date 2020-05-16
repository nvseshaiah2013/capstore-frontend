import {Address} from './address.model';
import {Transactions} from './Transactions';
import {Product} from './Product';
import { Customer } from 'src/app/models/customer.model';

export class Orders{
    orderId:number;
    orderAmount:number;
    orderStatus:string;
    orderDate:Date;
    statusDate:Date;
    transaction:Transactions;
    address:Address;
    customer:Customer;
    product:Product;
    quantity:number;
}