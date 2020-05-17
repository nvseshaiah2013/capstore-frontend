import { User } from './user.model';

export class Coupon{
    couponCode:string;
    couponEndDate:Date;
    couponStartDate:Date;
    couponAmount:number;
    minOrderAmount:number;
    active:boolean;
    couponDesc:string;
    issuedBy:string;
    user:User;
}