<<<<<<< HEAD:src/app/models/Transactions.ts
import { Orders } from '../models/order.model';
import { Coupon } from '../admin/models/Coupon';
=======
import { Orders } from './order.model';
import { Coupon } from './coupon.model';
>>>>>>> 79c935aaa1b191ca88a8ec3db3de50d00b4b4aba:src/app/models/transaction.model.ts

export class Transactions{
    transactionId:number;
    transactionDate:Date;
    transactionMoney:number;
    transactionMethod:string;
    transactionStatus:string;
    orders:Orders[];
    coupon:Coupon;
}