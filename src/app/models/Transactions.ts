import { Orders } from './order.model';
import { Coupon } from './Coupon';

export class Transactions{
    transactionId:number;
    transactionDate:Date;
    transactionMoney:number;
    transactionMethod:string;
    transactionStatus:string;
    orders:Orders[];
    coupon:Coupon;
}