import { Orders } from './order.model';

export class CustomerDetails{
    username:string;
    name:string;
    phoneNo:string;
    alternatePhoneNo:string;
    alternateEmail:string;
    gender:string;
    balance:number;
    orders:Orders[];
}