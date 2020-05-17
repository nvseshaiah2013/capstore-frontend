import { Customer } from './customer.model';
import { Merchant } from './merchant.model';

export class CommonFeedback{
    feedbackId:number;
    feedbackSubject:string;
    feedbackMessage:string;
    customer:Customer;
    merchant:Merchant;
    enableRead:boolean;
    response:string;
}