import { Transactions } from './transaction.model';
import { Customer } from './customer.model';
import { Address } from './address.model';
import { Product } from './product.model';

export class Order{
     orderId:number;
     orderAmount:number;
     orderStatus:string;
     orderDate:string;
     statusDate:Date;
     transaction:Transactions;
     address:Address;
     customer:Customer;
     product:Product;
     quantity:number;

}