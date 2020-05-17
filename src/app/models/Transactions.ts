import { Orders } from '../models/order.model';
import { Coupon } from '../admin/models/Coupon';

export class Transactions{
    transactionId:number;
    transactionDate:Date;
    transactionMoney:number;
    transactionMethod:string;
    transactionStatus:string;
    orders:Orders[];
    coupon:Coupon;
}