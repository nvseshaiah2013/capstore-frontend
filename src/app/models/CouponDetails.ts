import { User } from './user.model';

export class CouponDetails{
    couponCode:string;
    couponEndDate:any;
    couponStartDate:any;
    couponAmount:number;
    minOrderAmount:number;
    couponDesc:string;
    active:string;
    issuedBy:string;
    users:User;
}