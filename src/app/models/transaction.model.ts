import { Orders } from '../models/order.model';
import { Coupon } from '../models/coupon.model';

export class Transactions{
    transactionId:number;
    transactionDate:Date;
    transactionMoney:number;
    transactionMethod:string;
    transactionStatus:string;
    orders:Orders[];
    coupon:Coupon;
}