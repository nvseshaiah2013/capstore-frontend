import {Address} from './address.model';
import { Transactions} from './transaction.model';
import { Product} from './product.model';
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